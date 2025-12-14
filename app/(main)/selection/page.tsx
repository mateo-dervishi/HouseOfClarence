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
  ChevronUp,
  Edit2,
  Check,
  ClipboardList,
  ArrowLeft,
  Phone,
  Send,
  FolderPlus,
  FileSpreadsheet,
  Upload,
  Sparkles,
} from "lucide-react";
import { useSelectionStore, SelectionLabel, SelectionItem } from "@/stores/selectionStore";

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
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const itemCount = getItemCount();

  // Submit selection to SharePoint
  const handleSubmitSelection = async () => {
    if (submitSuccess) return; // Already submitted
    
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/selection/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, labels }),
      });

      const data = await response.json();

      if (!response.ok) {
        setIsSubmitting(false);
        // Show error inline instead of alert
        console.error(data.error || "Failed to submit selection");
        return;
      }

      // Success - keep button in submitted state permanently
      setSubmitSuccess(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Submit error:", error);
      setIsSubmitting(false);
    }
  };

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
        <div className="max-w-2xl mx-auto px-4 text-center">
          <ClipboardList className="w-16 h-16 md:w-20 md:h-20 text-light-grey mx-auto mb-6" strokeWidth={1} />
          <h1 className="text-2xl md:text-3xl tracking-[0.15em] font-light mb-4 text-primary-black">YOUR SELECTION IS EMPTY</h1>
          <p className="text-warm-grey leading-relaxed mb-8 text-sm md:text-base">
            Browse our collections and add items you&apos;re interested in to your selection.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 md:px-8 md:py-4 bg-primary-black text-white text-sm uppercase tracking-wider hover:bg-charcoal transition-colors"
          >
            Browse Collections
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-off-white pt-24 md:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-warm-grey hover:text-primary-black transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl tracking-[0.1em] md:tracking-[0.15em] font-light uppercase text-primary-black">
                Your Selection
              </h1>
              <p className="text-warm-grey mt-1 text-sm">
                {itemCount} {itemCount === 1 ? "item" : "items"} • Pricing on request
              </p>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={clearSelection}
                className="px-3 py-2 text-[11px] md:text-[12px] tracking-[0.1em] uppercase text-warm-grey border border-light-grey hover:border-primary-black hover:text-primary-black transition-colors"
              >
                Clear
              </button>
              <button
                onClick={handleSubmitSelection}
                disabled={isSubmitting || submitSuccess}
                className={`hidden md:flex items-center gap-2 px-4 py-2 md:px-5 md:py-3 border text-[11px] md:text-[12px] tracking-[0.1em] uppercase transition-colors ${
                  submitSuccess 
                    ? "border-green-600 bg-green-600 text-white cursor-default" 
                    : "border-primary-black text-primary-black hover:bg-primary-black hover:text-white disabled:opacity-50"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : submitSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    Submitted
                  </>
                ) : (
                  <>
                    <FileSpreadsheet className="w-4 h-4" />
                    Submit Selection
                  </>
                )}
              </button>
              <button
                onClick={() => setShowEnquiryForm(true)}
                className="px-4 py-2 md:px-6 md:py-3 bg-primary-black text-white text-[11px] md:text-[12px] tracking-[0.1em] uppercase hover:bg-charcoal transition-colors"
              >
                Request Quote
              </button>
            </div>
          </div>
        </div>

        {/* Mobile: Toggle Sidebar Button */}
        <button
          onClick={() => setShowMobileSidebar(!showMobileSidebar)}
          className="lg:hidden w-full mb-4 p-4 bg-white shadow-sm flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <FolderPlus className="w-4 h-4" />
            <span className="text-sm font-medium">Organise by Room ({labels.length})</span>
          </div>
          {showMobileSidebar ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <div className="grid lg:grid-cols-[280px,1fr] gap-6 lg:gap-8">
          {/* Left Sidebar - Labels */}
          <aside className={`space-y-4 md:space-y-6 ${showMobileSidebar ? 'block' : 'hidden lg:block'}`}>
            {/* Create Label */}
            <div className="bg-white p-4 md:p-6 shadow-sm">
              <h2 className="text-[12px] md:text-[13px] tracking-[0.1em] uppercase mb-3 md:mb-4 flex items-center gap-2 text-primary-black">
                <FolderPlus className="w-4 h-4" />
                Create Room / Area
              </h2>
              <form onSubmit={handleAddLabel} className="flex gap-2">
                <input
                  type="text"
                  value={newLabelName}
                  onChange={(e) => setNewLabelName(e.target.value)}
                  placeholder="e.g. Master Bathroom"
                  className="flex-1 min-w-0 border border-light-grey px-3 py-2.5 text-sm focus:border-primary-black outline-none"
                />
                <button
                  type="submit"
                  disabled={!newLabelName.trim()}
                  className="px-3 py-2.5 bg-primary-black text-white hover:bg-charcoal transition-colors disabled:opacity-30 flex-shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Labels List */}
            {labels.length > 0 && (
              <div className="bg-white p-4 md:p-6 shadow-sm">
                <h2 className="text-[12px] md:text-[13px] tracking-[0.1em] uppercase mb-3 md:mb-4 text-primary-black">
                  Your Rooms ({labels.length})
                </h2>
                <ul className="space-y-2">
                  {labels.map((label) => {
                    const labelItemCount = items.filter((i) => i.labelId === label.id).length;

                    return (
                      <li
                        key={label.id}
                        className="flex items-center justify-between p-2.5 md:p-3 border border-light-grey hover:border-warm-grey transition-colors"
                      >
                        {editingLabelId === label.id ? (
                          <div className="flex items-center gap-2 flex-1 min-w-0">
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
                              className="flex-1 min-w-0 text-sm border-b border-primary-black outline-none bg-transparent"
                              autoFocus
                            />
                            <button
                              onClick={() => handleUpdateLabel(label.id)}
                              className="p-1 text-primary-black flex-shrink-0"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                              <span
                                className="w-3 h-3 rounded-full flex-shrink-0"
                                style={{ backgroundColor: label.color }}
                              />
                              <div className="min-w-0">
                                <p className="text-sm font-medium truncate">{label.name}</p>
                                <p className="text-[10px] md:text-[11px] text-warm-grey">
                                  {labelItemCount} {labelItemCount === 1 ? "item" : "items"}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-0.5 flex-shrink-0">
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
              </div>
            )}

            {/* Summary - Desktop only */}
            <div className="hidden lg:block bg-white p-6 shadow-sm">
              <h2 className="text-[13px] tracking-[0.1em] uppercase mb-4 text-primary-black">Summary</h2>
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
                  <p className="text-[12px] text-warm-grey text-center">
                    Pricing provided upon request
                  </p>
                </div>
              </div>
            </div>

            {/* Contact - Desktop only */}
            <div className="hidden lg:block bg-primary-black text-white p-6">
              <h2 className="text-[13px] tracking-[0.1em] uppercase mb-3">Need Help?</h2>
              <p className="text-sm text-white/70 mb-4">
                Our team is available to discuss your selection.
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
          <div className="space-y-4 md:space-y-6">
            {/* Grouped Items */}
            {groupedItems.map(({ label, items: labelItems }) => (
              labelItems.length > 0 && (
                <div key={label.id} className="bg-white shadow-sm">
                  {/* Label Header */}
                  <div
                    className="flex items-center justify-between p-3 md:p-4 border-b border-light-grey"
                    style={{ borderLeftWidth: 4, borderLeftColor: label.color }}
                  >
                    <div className="flex items-center gap-2 md:gap-3 min-w-0">
                      <span
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: label.color }}
                      />
                      <h3 className="text-[13px] md:text-[14px] tracking-[0.1em] uppercase font-medium truncate text-primary-black">
                        {label.name}
                      </h3>
                      <span className="text-xs md:text-sm text-warm-grey flex-shrink-0">
                        ({labelItems.length} {labelItems.length === 1 ? "item" : "items"})
                      </span>
                    </div>
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
                <div className="flex items-center justify-between p-3 md:p-4 border-b border-light-grey">
                  <div className="flex items-center gap-2 md:gap-3">
                    <h3 className="text-[13px] md:text-[14px] tracking-[0.1em] uppercase font-medium text-warm-grey">
                      Unassigned
                    </h3>
                    <span className="text-xs md:text-sm text-warm-grey">
                      ({unlabeledItems.length})
                    </span>
                  </div>
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

        {/* Mobile: Fixed Bottom Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-light-grey p-4 z-40">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-warm-grey">{itemCount} {itemCount === 1 ? "item" : "items"}</span>
            <span className="text-sm text-warm-grey">Pricing on request</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSubmitSelection}
              disabled={isSubmitting || submitSuccess}
              className={`flex-1 py-3 border text-[12px] tracking-[0.1em] uppercase transition-colors flex items-center justify-center gap-2 ${
                submitSuccess 
                  ? "border-green-600 bg-green-600 text-white cursor-default" 
                  : "border-primary-black text-primary-black hover:bg-primary-black hover:text-white disabled:opacity-50"
              }`}
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : submitSuccess ? (
                <Check className="w-4 h-4" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              {isSubmitting ? "..." : submitSuccess ? "Submitted" : "Submit"}
            </button>
          <button
            onClick={() => setShowEnquiryForm(true)}
              className="flex-1 py-3 bg-primary-black text-white text-[12px] tracking-[0.1em] uppercase hover:bg-charcoal transition-colors"
          >
            Request Quote
          </button>
          </div>
        </div>

        {/* Add padding at bottom for mobile fixed bar */}
        <div className="h-28 lg:hidden" />
      </div>

      {/* Enquiry Form Modal */}
      <EnquiryFormModal
        isOpen={showEnquiryForm}
        onClose={() => setShowEnquiryForm(false)}
        items={items}
        labels={labels}
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
    <li className="p-3 md:p-4">
      <div className="flex gap-3 md:gap-4">
        {/* Image */}
        <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-off-white relative overflow-hidden">
          {item.category === "Bespoke" && (!item.image || item.image === "/bespoke-placeholder.png") ? (
            // Bespoke item placeholder
            <div className="w-full h-full bg-gradient-to-br from-primary-black to-charcoal flex flex-col items-center justify-center text-white">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 opacity-80" strokeWidth={1.5} />
              <span className="text-[8px] md:text-[9px] tracking-widest mt-1 opacity-70">BESPOKE</span>
            </div>
          ) : (
            <Link href={`/product/${item.slug}`}>
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </Link>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          {/* Title Row */}
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/product/${item.slug}`}
              className="text-[13px] md:text-[14px] tracking-[0.02em] hover:opacity-70 transition-opacity line-clamp-2 flex-1 min-w-0 text-primary-black"
            >
              {item.name}
            </Link>
            <button
              onClick={() => removeItem(item.id)}
              className="p-1 text-warm-grey hover:text-red-500 transition-colors flex-shrink-0 -mr-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Details */}
          <div className="mt-1 space-y-0.5">
            {item.colour && (
              <p className="text-[11px] md:text-[12px] text-warm-grey">Colour: {item.colour}</p>
            )}
            <p className="text-[11px] md:text-[12px] text-warm-grey capitalize">{item.category}</p>
          </div>

          {/* Actions Row */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {/* Quantity */}
            <div className="flex items-center border border-light-grey">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="p-1.5 md:p-2 hover:bg-off-white transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="px-2 md:px-3 text-sm min-w-[1.5rem] text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1.5 md:p-2 hover:bg-off-white transition-colors"
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
                  className={`flex items-center gap-1 px-2 py-1.5 text-[10px] md:text-[11px] tracking-[0.05em] uppercase border transition-colors ${
                    item.labelId
                      ? "border-primary-black text-primary-black"
                      : "border-light-grey text-warm-grey hover:border-primary-black hover:text-primary-black"
                  }`}
                >
                  <Tag className="w-3 h-3" />
                  <span className="max-w-[60px] md:max-w-[80px] truncate">
                    {item.labelId
                      ? labels.find((l) => l.id === item.labelId)?.name || "Room"
                      : "Room"}
                  </span>
                  <ChevronDown className="w-3 h-3 flex-shrink-0" />
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {assigningItemId === item.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="absolute top-full left-0 mt-1 bg-white border border-light-grey shadow-lg z-20 min-w-[140px] max-w-[200px]"
                    >
                      {labels.map((label) => (
                        <button
                          key={label.id}
                          onClick={() => {
                            updateItemLabel(item.id, label.id);
                            setAssigningItemId(null);
                          }}
                          className={`flex items-center gap-2 w-full px-3 py-2 text-left text-[11px] md:text-[12px] hover:bg-off-white transition-colors ${
                            item.labelId === label.id ? "bg-off-white" : ""
                          }`}
                        >
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: label.color }}
                          />
                          <span className="truncate">{label.name}</span>
                          {item.labelId === label.id && (
                            <Check className="w-3 h-3 ml-auto flex-shrink-0" />
                          )}
                        </button>
                      ))}
                      {item.labelId && (
                        <button
                          onClick={() => {
                            updateItemLabel(item.id, undefined);
                            setAssigningItemId(null);
                          }}
                          className="flex items-center gap-2 w-full px-3 py-2 text-left text-[11px] md:text-[12px] text-warm-grey hover:bg-off-white transition-colors border-t border-light-grey"
                        >
                          <X className="w-3 h-3" />
                          Remove
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
              className={`px-2 py-1.5 text-[10px] md:text-[11px] tracking-[0.05em] uppercase border transition-colors ${
                item.notes
                  ? "border-primary-black text-primary-black"
                  : "border-light-grey text-warm-grey hover:border-primary-black hover:text-primary-black"
              }`}
            >
              {item.notes ? "Note ✓" : "+ Note"}
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
                  <textarea
                    value={notesDraft}
                    onChange={(e) => setNotesDraft(e.target.value)}
                    onBlur={() => updateItemNotes(item.id, notesDraft)}
                    placeholder="Add notes (dimensions, requirements...)"
                    rows={2}
                    className="w-full border border-light-grey px-3 py-2 text-[12px] md:text-[13px] focus:border-primary-black outline-none resize-none"
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
}: {
  isOpen: boolean;
  onClose: () => void;
  items: SelectionItem[];
  labels: SelectionLabel[];
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
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 md:inset-4 lg:inset-auto lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-full lg:max-w-2xl lg:max-h-[90vh] bg-white z-50 overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-light-grey flex-shrink-0">
              <h2 className="text-lg md:text-xl tracking-[0.1em] uppercase font-light text-primary-black">
                Request Quote
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-off-white transition-colors -mr-2">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8 md:py-12"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                    <Check className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl tracking-[0.1em] uppercase mb-3 text-primary-black">Request Submitted</h3>
                  <p className="text-warm-grey mb-6 md:mb-8 max-w-md mx-auto text-sm md:text-base">
                    Thank you for your selection. Our team will review your requirements and send you a personalised quote within 24 hours.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 md:px-8 md:py-4 bg-primary-black text-white text-sm uppercase tracking-wider hover:bg-charcoal transition-colors"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {/* Selection Summary */}
                  <div className="bg-off-white p-4 max-h-48 overflow-y-auto">
                    <h3 className="text-[11px] md:text-[12px] tracking-[0.1em] uppercase text-warm-grey mb-3">
                      Your Selection ({totalItems} {totalItems === 1 ? "item" : "items"})
                    </h3>

                    {groupedSummary.map(({ label, items: labelItems }) => (
                      labelItems.length > 0 && (
                        <div key={label.id} className="mb-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: label.color }}
                            />
                            <span className="text-[11px] md:text-[12px] tracking-[0.1em] uppercase font-medium text-primary-black">
                              {label.name}
                            </span>
                          </div>
                          <ul className="space-y-0.5 pl-4">
                            {labelItems.map((item) => (
                              <li key={item.id} className="text-[11px] md:text-[12px] text-warm-grey truncate">
                                {item.quantity}× {item.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    ))}

                    {unlabeledItems.length > 0 && (
                      <ul className="space-y-0.5">
                        {unlabeledItems.map((item) => (
                          <li key={item.id} className="text-[11px] md:text-[12px] text-warm-grey truncate">
                            {item.quantity}× {item.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      <div>
                        <label className="block text-[10px] md:text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full border border-light-grey px-3 py-2.5 text-[13px] focus:border-primary-black outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] md:text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full border border-light-grey px-3 py-2.5 text-[13px] focus:border-primary-black outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] md:text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border border-light-grey px-3 py-2.5 text-[13px] focus:border-primary-black outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] md:text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-1">
                        Phone *
                      </label>
                      <div className="flex">
                        <select
                          value={formData.countryCode}
                          onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                          className="border border-light-grey px-2 py-2.5 text-[13px] bg-off-white focus:border-primary-black outline-none flex-shrink-0"
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
                          className="flex-1 min-w-0 border border-l-0 border-light-grey px-3 py-2.5 text-[13px] focus:border-primary-black outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      <div>
                        <label className="block text-[10px] md:text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-1">
                          Project Type
                        </label>
                        <select
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          className="w-full border border-light-grey px-3 py-2.5 text-[13px] bg-white focus:border-primary-black outline-none"
                        >
                          <option value="">Select...</option>
                          <option value="new-build">New Build</option>
                          <option value="renovation">Renovation</option>
                          <option value="extension">Extension</option>
                          <option value="commercial">Commercial</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] md:text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-1">
                          Timeline
                        </label>
                        <select
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className="w-full border border-light-grey px-3 py-2.5 text-[13px] bg-white focus:border-primary-black outline-none"
                        >
                          <option value="">Select...</option>
                          <option value="asap">ASAP</option>
                          <option value="1-3-months">1-3 Months</option>
                          <option value="3-6-months">3-6 Months</option>
                          <option value="planning">Planning</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] md:text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-1">
                        Notes
                      </label>
                      <textarea
                        rows={2}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Any specific requirements..."
                        className="w-full border border-light-grey px-3 py-2.5 text-[13px] focus:border-primary-black outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 md:py-4 bg-primary-black text-white text-[12px] md:text-[13px] tracking-[0.15em] uppercase hover:bg-charcoal transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
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
                          Submit Quote Request
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
