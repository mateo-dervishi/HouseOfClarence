"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Minus,
  Trash2,
  Tag,
  X,
  ChevronDown,
  Edit2,
  Check,
  ClipboardList,
  ArrowLeft,
  Phone,
  Send,
  FolderPlus,
  GripVertical,
} from "lucide-react";
import { useSelectionStore, LABEL_COLORS, SelectionLabel, SelectionItem } from "@/stores/selectionStore";
import { formatPrice } from "@/lib/utils";

export default function SelectionPage() {
  const router = useRouter();
  const {
    items,
    labels,
    addLabel,
    removeLabel,
    updateLabel,
    updateQuantity,
    removeItem,
    updateItemLabel,
    updateItemNotes,
    clearSelection,
    getItemCount,
  } = useSelectionStore();

  const [newLabelName, setNewLabelName] = useState("");
  const [editingLabelId, setEditingLabelId] = useState<string | null>(null);
  const [editingLabelName, setEditingLabelName] = useState("");
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [assigningItemId, setAssigningItemId] = useState<string | null>(null);
  const [expandedNotes, setExpandedNotes] = useState<string | null>(null);

  const itemCount = getItemCount();
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalPriceExVat = items.reduce((sum, item) => sum + item.priceExVat * item.quantity, 0);

  // Group items by label
  const groupedItems = labels.map((label) => ({
    label,
    items: items.filter((item) => item.labelId === label.id),
  }));
  const unlabeledItems = items.filter((item) => !item.labelId);

  const handleAddLabel = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLabelName.trim()) {
      addLabel(newLabelName.trim());
      setNewLabelName("");
    }
  };

  const handleUpdateLabel = (id: string) => {
    if (editingLabelName.trim()) {
      updateLabel(id, editingLabelName.trim());
    }
    setEditingLabelId(null);
    setEditingLabelName("");
  };

  const startEditingLabel = (label: SelectionLabel) => {
    setEditingLabelId(label.id);
    setEditingLabelName(label.name);
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-off-white pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <ClipboardList className="w-20 h-20 text-light-grey mx-auto mb-6" strokeWidth={1} />
          <h1 className="text-3xl tracking-[0.15em] font-light mb-4">YOUR SELECTION IS EMPTY</h1>
          <p className="text-warm-grey leading-relaxed mb-8">
            Browse our collections and add items you&apos;re interested in to your selection.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-primary-black text-white text-sm uppercase tracking-wider hover:bg-charcoal transition-colors"
          >
            Browse Collections
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-off-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-warm-grey hover:text-primary-black transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </button>
            <h1 className="text-2xl md:text-3xl tracking-[0.15em] font-light uppercase">
              Your Selection
            </h1>
            <p className="text-warm-grey mt-2">
              {itemCount} {itemCount === 1 ? "item" : "items"} • Organise by room or area
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearSelection}
              className="px-4 py-2 text-[12px] tracking-[0.1em] uppercase text-warm-grey border border-light-grey hover:border-primary-black hover:text-primary-black transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={() => setShowEnquiryForm(true)}
              className="px-6 py-3 bg-primary-black text-white text-[12px] tracking-[0.1em] uppercase hover:bg-charcoal transition-colors"
            >
              Submit Enquiry
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[300px,1fr] gap-8">
          {/* Left Sidebar - Labels */}
          <aside className="space-y-6">
            {/* Create Label */}
            <div className="bg-white p-6 shadow-sm">
              <h2 className="text-[13px] tracking-[0.1em] uppercase mb-4 flex items-center gap-2">
                <FolderPlus className="w-4 h-4" />
                Create Room / Area
              </h2>
              <form onSubmit={handleAddLabel} className="flex gap-2">
                <input
                  type="text"
                  value={newLabelName}
                  onChange={(e) => setNewLabelName(e.target.value)}
                  placeholder="e.g. Master Bathroom"
                  className="flex-1 border border-light-grey px-4 py-3 text-sm focus:border-primary-black outline-none"
                />
                <button
                  type="submit"
                  disabled={!newLabelName.trim()}
                  className="px-4 py-3 bg-primary-black text-white hover:bg-charcoal transition-colors disabled:opacity-30"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Labels List */}
            <div className="bg-white p-6 shadow-sm">
              <h2 className="text-[13px] tracking-[0.1em] uppercase mb-4">
                Your Rooms ({labels.length})
              </h2>
              
              {labels.length === 0 ? (
                <p className="text-sm text-warm-grey">
                  Create rooms or areas to organise your selection. For example: &quot;Master Bathroom&quot;, &quot;Kitchen&quot;, &quot;Guest Bedroom&quot;.
                </p>
              ) : (
                <ul className="space-y-2">
                  {labels.map((label) => {
                    const labelItemCount = items.filter((i) => i.labelId === label.id).length;
                    const labelTotal = items
                      .filter((i) => i.labelId === label.id)
                      .reduce((sum, i) => sum + i.price * i.quantity, 0);

                    return (
                      <li
                        key={label.id}
                        className="flex items-center justify-between p-3 border border-light-grey hover:border-warm-grey transition-colors group"
                      >
                        {editingLabelId === label.id ? (
                          <div className="flex items-center gap-2 flex-1">
                            <span
                              className="w-3 h-3 rounded-full flex-shrink-0"
                              style={{ backgroundColor: label.color }}
                            />
                            <input
                              type="text"
                              value={editingLabelName}
                              onChange={(e) => setEditingLabelName(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleUpdateLabel(label.id);
                                if (e.key === "Escape") setEditingLabelId(null);
                              }}
                              className="flex-1 text-sm border-b border-primary-black outline-none bg-transparent"
                              autoFocus
                            />
                            <button
                              onClick={() => handleUpdateLabel(label.id)}
                              className="p-1 text-primary-black"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-3">
                              <span
                                className="w-3 h-3 rounded-full flex-shrink-0"
                                style={{ backgroundColor: label.color }}
                              />
                              <div>
                                <p className="text-sm font-medium">{label.name}</p>
                                <p className="text-[11px] text-warm-grey">
                                  {labelItemCount} {labelItemCount === 1 ? "item" : "items"} • {formatPrice(labelTotal)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => startEditingLabel(label)}
                                className="p-1.5 text-warm-grey hover:text-primary-black transition-colors"
                                aria-label="Edit label"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => removeLabel(label.id)}
                                className="p-1.5 text-warm-grey hover:text-red-500 transition-colors"
                                aria-label="Delete label"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Summary */}
            <div className="bg-white p-6 shadow-sm">
              <h2 className="text-[13px] tracking-[0.1em] uppercase mb-4">Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-warm-grey">Total Items</span>
                  <span>{itemCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-warm-grey">Rooms</span>
                  <span>{labels.length}</span>
                </div>
                <div className="border-t border-light-grey pt-3 mt-3">
                  <div className="flex justify-between font-medium">
                    <span>Estimated Total</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <p className="text-[11px] text-warm-grey text-right mt-1">
                    ({formatPrice(totalPriceExVat)} ex VAT)
                  </p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-primary-black text-white p-6">
              <h2 className="text-[13px] tracking-[0.1em] uppercase mb-3">Need Help?</h2>
              <p className="text-sm text-white/70 mb-4">
                Our team is available to discuss your selection and answer any questions.
              </p>
              <a
                href="tel:+442033704057"
                className="flex items-center justify-center gap-2 w-full py-3 border border-white text-sm tracking-wider hover:bg-white hover:text-primary-black transition-colors"
              >
                <Phone className="w-4 h-4" />
                020 3370 4057
              </a>
            </div>
          </aside>

          {/* Right Content - Items */}
          <div className="space-y-8">
            {/* Grouped Items */}
            {groupedItems.map(({ label, items: labelItems }) => (
              labelItems.length > 0 && (
                <div key={label.id} className="bg-white shadow-sm">
                  {/* Label Header */}
                  <div
                    className="flex items-center justify-between p-4 border-b border-light-grey"
                    style={{ borderLeftWidth: 4, borderLeftColor: label.color }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: label.color }}
                      />
                      <h3 className="text-[14px] tracking-[0.1em] uppercase font-medium">
                        {label.name}
                      </h3>
                      <span className="text-sm text-warm-grey">
                        ({labelItems.length} {labelItems.length === 1 ? "item" : "items"})
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      {formatPrice(
                        labelItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
                      )}
                    </span>
                  </div>

                  {/* Items */}
                  <ul className="divide-y divide-light-grey">
                    {labelItems.map((item) => (
                      <SelectionItemRow
                        key={item.id}
                        item={item}
                        labels={labels}
                        assigningItemId={assigningItemId}
                        setAssigningItemId={setAssigningItemId}
                        expandedNotes={expandedNotes}
                        setExpandedNotes={setExpandedNotes}
                        updateQuantity={updateQuantity}
                        removeItem={removeItem}
                        updateItemLabel={updateItemLabel}
                        updateItemNotes={updateItemNotes}
                      />
                    ))}
                  </ul>
                </div>
              )
            ))}

            {/* Unlabeled Items */}
            {unlabeledItems.length > 0 && (
              <div className="bg-white shadow-sm">
                <div className="flex items-center justify-between p-4 border-b border-light-grey">
                  <div className="flex items-center gap-3">
                    <h3 className="text-[14px] tracking-[0.1em] uppercase font-medium text-warm-grey">
                      Unassigned Items
                    </h3>
                    <span className="text-sm text-warm-grey">
                      ({unlabeledItems.length})
                    </span>
                  </div>
                  {labels.length > 0 && (
                    <p className="text-[11px] text-warm-grey">
                      Assign to a room using the tag icon
                    </p>
                  )}
                </div>

                <ul className="divide-y divide-light-grey">
                  {unlabeledItems.map((item) => (
                    <SelectionItemRow
                      key={item.id}
                      item={item}
                      labels={labels}
                      assigningItemId={assigningItemId}
                      setAssigningItemId={setAssigningItemId}
                      expandedNotes={expandedNotes}
                      setExpandedNotes={setExpandedNotes}
                      updateQuantity={updateQuantity}
                      removeItem={removeItem}
                      updateItemLabel={updateItemLabel}
                      updateItemNotes={updateItemNotes}
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enquiry Form Modal */}
      <EnquiryFormModal
        isOpen={showEnquiryForm}
        onClose={() => setShowEnquiryForm(false)}
        items={items}
        labels={labels}
        totalPrice={totalPrice}
      />
    </main>
  );
}

// Individual item row component
function SelectionItemRow({
  item,
  labels,
  assigningItemId,
  setAssigningItemId,
  expandedNotes,
  setExpandedNotes,
  updateQuantity,
  removeItem,
  updateItemLabel,
  updateItemNotes,
}: {
  item: SelectionItem;
  labels: SelectionLabel[];
  assigningItemId: string | null;
  setAssigningItemId: (id: string | null) => void;
  expandedNotes: string | null;
  setExpandedNotes: (id: string | null) => void;
  updateQuantity: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  updateItemLabel: (itemId: string, labelId: string | undefined) => void;
  updateItemNotes: (itemId: string, notes: string) => void;
}) {
  const [notesDraft, setNotesDraft] = useState(item.notes || "");

  return (
    <li className="p-4">
      <div className="flex gap-4">
        {/* Drag Handle (visual only for now) */}
        <div className="flex-shrink-0 text-light-grey cursor-grab hidden md:flex items-center">
          <GripVertical className="w-4 h-4" />
        </div>

        {/* Image */}
        <Link
          href={`/product/${item.slug}`}
          className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-off-white relative overflow-hidden"
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="96px"
          />
        </Link>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <Link
                href={`/product/${item.slug}`}
                className="text-[14px] tracking-[0.02em] hover:opacity-70 transition-opacity line-clamp-2"
              >
                {item.name}
              </Link>
              {item.colour && (
                <p className="text-[12px] text-warm-grey mt-1">Colour: {item.colour}</p>
              )}
            </div>

            {/* Price */}
            <div className="text-right flex-shrink-0">
              <p className="text-[14px] font-medium">
                {formatPrice(item.price * item.quantity)}
              </p>
              <p className="text-[11px] text-warm-grey">
                {formatPrice(item.price)} each
              </p>
            </div>
          </div>

          {/* Actions Row */}
          <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-light-grey">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-2 hover:bg-off-white transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="px-3 text-sm min-w-[2rem] text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-2 hover:bg-off-white transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              {/* Label Assignment */}
              {labels.length > 0 && (
                <div className="relative">
                  <button
                    onClick={() =>
                      setAssigningItemId(assigningItemId === item.id ? null : item.id)
                    }
                    className={`flex items-center gap-1.5 px-3 py-2 text-[11px] tracking-[0.05em] uppercase border transition-colors ${
                      item.labelId
                        ? "border-primary-black text-primary-black"
                        : "border-light-grey text-warm-grey hover:border-primary-black hover:text-primary-black"
                    }`}
                  >
                    <Tag className="w-3 h-3" />
                    {item.labelId
                      ? labels.find((l) => l.id === item.labelId)?.name || "Assign"
                      : "Assign Room"}
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {assigningItemId === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute top-full left-0 mt-1 bg-white border border-light-grey shadow-lg z-10 min-w-[160px]"
                      >
                        {labels.map((label) => (
                          <button
                            key={label.id}
                            onClick={() => {
                              updateItemLabel(item.id, label.id);
                              setAssigningItemId(null);
                            }}
                            className={`flex items-center gap-2 w-full px-3 py-2 text-left text-[12px] hover:bg-off-white transition-colors ${
                              item.labelId === label.id ? "bg-off-white" : ""
                            }`}
                          >
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: label.color }}
                            />
                            {label.name}
                            {item.labelId === label.id && (
                              <Check className="w-3 h-3 ml-auto" />
                            )}
                          </button>
                        ))}
                        {item.labelId && (
                          <button
                            onClick={() => {
                              updateItemLabel(item.id, undefined);
                              setAssigningItemId(null);
                            }}
                            className="flex items-center gap-2 w-full px-3 py-2 text-left text-[12px] text-warm-grey hover:bg-off-white transition-colors border-t border-light-grey"
                          >
                            <X className="w-3 h-3" />
                            Remove from room
                          </button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Notes Toggle */}
              <button
                onClick={() =>
                  setExpandedNotes(expandedNotes === item.id ? null : item.id)
                }
                className={`p-2 text-[11px] tracking-[0.05em] uppercase transition-colors ${
                  item.notes
                    ? "text-primary-black"
                    : "text-warm-grey hover:text-primary-black"
                }`}
              >
                {item.notes ? "Edit Note" : "+ Note"}
              </button>
            </div>

            {/* Remove */}
            <button
              onClick={() => removeItem(item.id)}
              className="p-2 text-warm-grey hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Notes Expansion */}
          <AnimatePresence>
            {expandedNotes === item.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 pt-3 border-t border-light-grey">
                  <label className="text-[11px] tracking-[0.1em] uppercase text-warm-grey block mb-2">
                    Notes for this item
                  </label>
                  <textarea
                    value={notesDraft}
                    onChange={(e) => setNotesDraft(e.target.value)}
                    onBlur={() => updateItemNotes(item.id, notesDraft)}
                    placeholder="Add any specific requirements, dimensions, or notes..."
                    rows={2}
                    className="w-full border border-light-grey px-3 py-2 text-[13px] focus:border-primary-black outline-none resize-none"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </li>
  );
}

// Enquiry Form Modal
function EnquiryFormModal({
  isOpen,
  onClose,
  items,
  labels,
  totalPrice,
}: {
  isOpen: boolean;
  onClose: () => void;
  items: SelectionItem[];
  labels: SelectionLabel[];
  totalPrice: number;
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+44",
    projectType: "",
    timeline: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Full Selection Enquiry:", { formData, items, labels });
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const groupedSummary = labels.map((label) => ({
    label,
    items: items.filter((i) => i.labelId === label.id),
  }));
  const unlabeledItems = items.filter((i) => !i.labelId);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl md:max-h-[90vh] bg-white z-50 overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-light-grey">
              <h2 className="text-xl tracking-[0.1em] uppercase font-light">
                Submit Your Selection
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-off-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl tracking-[0.1em] uppercase mb-3">Enquiry Submitted</h3>
                  <p className="text-warm-grey mb-8 max-w-md mx-auto">
                    Thank you for your selection. Our team will review your requirements and be in touch within 24 hours.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-8 py-4 bg-primary-black text-white text-sm uppercase tracking-wider hover:bg-charcoal transition-colors"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left - Selection Summary */}
                  <div className="bg-off-white p-5 max-h-96 overflow-y-auto">
                    <h3 className="text-[12px] tracking-[0.1em] uppercase text-warm-grey mb-4">
                      Selection Summary
                    </h3>

                    {groupedSummary.map(({ label, items: labelItems }) => (
                      labelItems.length > 0 && (
                        <div key={label.id} className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: label.color }}
                            />
                            <span className="text-[12px] tracking-[0.1em] uppercase font-medium">
                              {label.name}
                            </span>
                          </div>
                          <ul className="space-y-1.5 pl-4">
                            {labelItems.map((item) => (
                              <li key={item.id} className="text-[12px] flex justify-between">
                                <span className="truncate pr-2">
                                  {item.quantity}× {item.name}
                                </span>
                                <span className="text-warm-grey flex-shrink-0">
                                  {formatPrice(item.price * item.quantity)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    ))}

                    {unlabeledItems.length > 0 && (
                      <div className="mb-4">
                        {labels.length > 0 && (
                          <p className="text-[12px] tracking-[0.1em] uppercase text-warm-grey mb-2">
                            Other Items
                          </p>
                        )}
                        <ul className="space-y-1.5">
                          {unlabeledItems.map((item) => (
                            <li key={item.id} className="text-[12px] flex justify-between">
                              <span className="truncate pr-2">
                                {item.quantity}× {item.name}
                              </span>
                              <span className="text-warm-grey flex-shrink-0">
                                {formatPrice(item.price * item.quantity)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="border-t border-light-grey pt-3 mt-4">
                      <div className="flex justify-between text-[13px] font-medium">
                        <span>Estimated Total</span>
                        <span>{formatPrice(totalPrice)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right - Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-1.5">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full border border-light-grey px-4 py-3 text-[13px] focus:border-primary-black outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-1.5">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full border border-light-grey px-4 py-3 text-[13px] focus:border-primary-black outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border border-light-grey px-4 py-3 text-[13px] focus:border-primary-black outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-1.5">
                        Phone *
                      </label>
                      <div className="flex">
                        <select
                          value={formData.countryCode}
                          onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                          className="border border-light-grey px-3 py-3 text-[13px] bg-off-white focus:border-primary-black outline-none"
                        >
                          <option value="+44">+44</option>
                          <option value="+1">+1</option>
                          <option value="+971">+971</option>
                        </select>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="flex-1 border border-l-0 border-light-grey px-4 py-3 text-[13px] focus:border-primary-black outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-1.5">
                          Project Type
                        </label>
                        <select
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          className="w-full border border-light-grey px-4 py-3 text-[13px] bg-white focus:border-primary-black outline-none"
                        >
                          <option value="">Select...</option>
                          <option value="new-build">New Build</option>
                          <option value="renovation">Renovation</option>
                          <option value="extension">Extension</option>
                          <option value="interior-design">Interior Design</option>
                          <option value="commercial">Commercial</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-1.5">
                          Timeline
                        </label>
                        <select
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className="w-full border border-light-grey px-4 py-3 text-[13px] bg-white focus:border-primary-black outline-none"
                        >
                          <option value="">Select...</option>
                          <option value="asap">ASAP</option>
                          <option value="1-3-months">1-3 Months</option>
                          <option value="3-6-months">3-6 Months</option>
                          <option value="6-12-months">6-12 Months</option>
                          <option value="planning">Just Planning</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-1.5">
                        Additional Notes
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Any specific requirements, questions, or details about your project..."
                        className="w-full border border-light-grey px-4 py-3 text-[13px] focus:border-primary-black outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-primary-black text-white text-[13px] tracking-[0.15em] uppercase hover:bg-charcoal transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Submit Enquiry
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

