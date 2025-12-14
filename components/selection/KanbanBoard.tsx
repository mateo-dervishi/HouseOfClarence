"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Plus,
  Minus,
  Trash2,
  GripVertical,
  Sparkles,
  X,
  Edit2,
  Check,
} from "lucide-react";
import { SelectionItem, SelectionLabel, LABEL_COLORS } from "@/stores/selectionStore";

interface KanbanBoardProps {
  items: SelectionItem[];
  labels: SelectionLabel[];
  onUpdateItemLabel: (itemId: string, labelId: string | undefined) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onAddLabel: (name: string) => void;
  onRemoveLabel: (id: string) => void;
  onUpdateLabel: (id: string, name: string) => void;
}

// Draggable Item Component
function DraggableItem({
  item,
  onUpdateQuantity,
  onRemoveItem,
}: {
  item: SelectionItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const isBespoke = item.category === "Bespoke" && (!item.image || item.image === "/bespoke-placeholder.png");

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border border-light-grey p-3 group ${isDragging ? "shadow-lg" : "hover:shadow-sm"} transition-shadow`}
    >
      <div className="flex gap-3">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="flex-shrink-0 text-warm-grey/50 hover:text-warm-grey cursor-grab active:cursor-grabbing self-center"
        >
          <GripVertical className="w-4 h-4" />
        </button>

        {/* Image */}
        <div className="w-14 h-14 bg-off-white relative overflow-hidden flex-shrink-0">
          {isBespoke ? (
            <div className="w-full h-full bg-gradient-to-br from-primary-black to-charcoal flex flex-col items-center justify-center text-white">
              <Sparkles className="w-4 h-4 opacity-80" strokeWidth={1.5} />
              <span className="text-[7px] tracking-widest mt-0.5 opacity-70">BESPOKE</span>
            </div>
          ) : (
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              sizes="56px"
            />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-medium truncate pr-6">{item.name}</p>
          <p className="text-[10px] text-warm-grey mt-0.5">{item.colour || item.category}</p>
          
          {/* Quantity Controls */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center border border-light-grey">
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                className="p-1 hover:bg-off-white transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="px-2 text-[11px] min-w-[1.5rem] text-center">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="p-1 hover:bg-off-white transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => onRemoveItem(item.id)}
          className="opacity-0 group-hover:opacity-100 text-warm-grey hover:text-red-500 transition-all self-start"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Droppable Column Component
function DroppableColumn({
  id,
  label,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onRemoveLabel,
  onUpdateLabel,
  isUnassigned = false,
}: {
  id: string;
  label?: SelectionLabel;
  items: SelectionItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onRemoveLabel?: (id: string) => void;
  onUpdateLabel?: (id: string, name: string) => void;
  isUnassigned?: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(label?.name || "");

  const handleSaveName = () => {
    if (editName.trim() && onUpdateLabel && label) {
      onUpdateLabel(label.id, editName.trim());
    }
    setIsEditing(false);
  };

  return (
    <div className="bg-off-white/50 rounded-lg min-w-[280px] max-w-[320px] flex-shrink-0 flex flex-col max-h-[calc(100vh-280px)]">
      {/* Column Header */}
      <div
        className={`p-3 border-b-2 flex items-center justify-between ${
          isUnassigned ? "border-warm-grey/30" : ""
        }`}
        style={{ borderColor: isUnassigned ? undefined : label?.color }}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {!isUnassigned && label && (
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: label.color }}
            />
          )}
          {isEditing && !isUnassigned ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveName();
                if (e.key === "Escape") setIsEditing(false);
              }}
              onBlur={handleSaveName}
              className="flex-1 min-w-0 text-sm font-medium bg-white border border-light-grey px-2 py-0.5 outline-none"
              autoFocus
            />
          ) : (
            <span className="text-[13px] font-medium truncate">
              {isUnassigned ? "Unassigned" : label?.name}
            </span>
          )}
          <span className="text-[11px] text-warm-grey flex-shrink-0">
            ({items.length})
          </span>
        </div>
        
        {!isUnassigned && label && (
          <div className="flex items-center gap-1">
            {isEditing ? (
              <button
                onClick={handleSaveName}
                className="p-1 text-primary-black hover:bg-white rounded transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditName(label.name);
                  setIsEditing(true);
                }}
                className="p-1 text-warm-grey hover:text-primary-black hover:bg-white rounded transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            )}
            {onRemoveLabel && (
              <button
                onClick={() => onRemoveLabel(label.id)}
                className="p-1 text-warm-grey hover:text-red-500 hover:bg-white rounded transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        <SortableContext
          items={items.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => (
            <DraggableItem
              key={item.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveItem={onRemoveItem}
            />
          ))}
        </SortableContext>
        
        {items.length === 0 && (
          <div className="text-center py-8 text-warm-grey/60">
            <p className="text-[12px]">Drop items here</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Item Preview for Drag Overlay
function ItemPreview({ item }: { item: SelectionItem }) {
  const isBespoke = item.category === "Bespoke" && (!item.image || item.image === "/bespoke-placeholder.png");

  return (
    <div className="bg-white border border-primary-black shadow-xl p-3 w-[280px] rotate-2">
      <div className="flex gap-3">
        <div className="w-14 h-14 bg-off-white relative overflow-hidden flex-shrink-0">
          {isBespoke ? (
            <div className="w-full h-full bg-gradient-to-br from-primary-black to-charcoal flex flex-col items-center justify-center text-white">
              <Sparkles className="w-4 h-4 opacity-80" strokeWidth={1.5} />
            </div>
          ) : (
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              sizes="56px"
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-medium truncate">{item.name}</p>
          <p className="text-[10px] text-warm-grey mt-0.5">{item.colour || item.category}</p>
          <p className="text-[10px] text-warm-grey mt-1">Qty: {item.quantity}</p>
        </div>
      </div>
    </div>
  );
}

export function KanbanBoard({
  items,
  labels,
  onUpdateItemLabel,
  onUpdateQuantity,
  onRemoveItem,
  onAddLabel,
  onRemoveLabel,
  onUpdateLabel,
}: KanbanBoardProps) {
  const [activeItem, setActiveItem] = useState<SelectionItem | null>(null);
  const [newLabelName, setNewLabelName] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Group items by label
  const unassignedItems = items.filter((item) => !item.labelId);
  const labeledGroups = labels.map((label) => ({
    label,
    items: items.filter((item) => item.labelId === label.id),
  }));

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const item = items.find((i) => i.id === active.id);
    if (item) {
      setActiveItem(item);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    // Handle drag over for visual feedback if needed
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveItem(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find which column the item was dropped on
    // Check if dropped on "unassigned" column
    if (overId === "unassigned") {
      onUpdateItemLabel(activeId, undefined);
      return;
    }

    // Check if dropped on a label column
    const targetLabel = labels.find((l) => l.id === overId);
    if (targetLabel) {
      onUpdateItemLabel(activeId, targetLabel.id);
      return;
    }

    // Check if dropped on another item - get that item's label
    const targetItem = items.find((i) => i.id === overId);
    if (targetItem) {
      onUpdateItemLabel(activeId, targetItem.labelId);
    }
  };

  const handleAddLabel = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLabelName.trim()) {
      onAddLabel(newLabelName.trim());
      setNewLabelName("");
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-4">
        {/* Add New Room */}
        <form onSubmit={handleAddLabel} className="flex gap-2 max-w-sm">
          <input
            type="text"
            value={newLabelName}
            onChange={(e) => setNewLabelName(e.target.value)}
            placeholder="Add new room/area..."
            className="flex-1 border border-light-grey px-3 py-2 text-sm focus:border-primary-black outline-none bg-white"
          />
          <button
            type="submit"
            disabled={!newLabelName.trim()}
            className="px-4 py-2 bg-primary-black text-white text-sm hover:bg-charcoal transition-colors disabled:opacity-30"
          >
            <Plus className="w-4 h-4" />
          </button>
        </form>

        {/* Kanban Columns */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
          {/* Unassigned Column */}
          <DroppableColumn
            id="unassigned"
            items={unassignedItems}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
            isUnassigned
          />

          {/* Label Columns */}
          {labeledGroups.map(({ label, items: labelItems }) => (
            <DroppableColumn
              key={label.id}
              id={label.id}
              label={label}
              items={labelItems}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveItem={onRemoveItem}
              onRemoveLabel={onRemoveLabel}
              onUpdateLabel={onUpdateLabel}
            />
          ))}

          {/* Add Column Placeholder */}
          {labels.length < 10 && (
            <div className="min-w-[280px] max-w-[320px] flex-shrink-0 border-2 border-dashed border-light-grey rounded-lg flex items-center justify-center">
              <div className="text-center p-6">
                <Plus className="w-8 h-8 text-light-grey mx-auto mb-2" />
                <p className="text-[12px] text-warm-grey">Add a room above</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeItem && <ItemPreview item={activeItem} />}
      </DragOverlay>
    </DndContext>
  );
}

