"use client";

import { useSelectionStore, SelectionItem } from "@/stores/selectionStore";
import { X, Minus, Plus, Trash2, ClipboardList, Maximize2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SelectionDrawer() {
  const router = useRouter();
  const { isOpen, closeSelection, items, labels, updateQuantity, removeItem, clearSelection, getItemCount } = useSelectionStore();
  const [showEnquiry, setShowEnquiry] = useState(false);
  
  const itemCount = getItemCount();

  const handleViewFullPage = () => {
    closeSelection();
    router.push("/selection");
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50"
              onClick={closeSelection}
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <header className="p-6 border-b border-light-grey">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ClipboardList className="w-5 h-5" strokeWidth={1.5} />
                    <h2 className="tracking-[0.15em] text-sm uppercase font-display text-primary-black">
                      Your Selection
                    </h2>
                    <span className="text-warm-grey text-sm">({itemCount})</span>
                  </div>
                  <button
                    onClick={closeSelection}
                    className="p-2 hover:bg-off-white transition-colors rounded-full"
                    aria-label="Close selection"
                  >
                    <X className="h-5 w-5" strokeWidth={1.5} />
                  </button>
                </div>
                
                {/* View Full Page Button */}
                {items.length > 0 && (
                  <button
                    onClick={handleViewFullPage}
                    className="mt-4 w-full flex items-center justify-center gap-2 py-3 border border-light-grey text-[12px] tracking-[0.1em] uppercase text-warm-grey hover:border-primary-black hover:text-primary-black transition-colors"
                  >
                    <Maximize2 className="w-4 h-4" />
                    Expand to Full Page & Organise
                  </button>
                )}
              </header>

              {/* Content */}
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                  <ClipboardList className="w-16 h-16 text-light-grey mb-4" strokeWidth={1} />
                  <h3 className="text-lg tracking-[0.1em] uppercase mb-2 text-primary-black">No Items Selected</h3>
                  <p className="text-warm-grey text-sm mb-6 max-w-xs">
                    Browse our collections and add items you&apos;re interested in to your selection.
                  </p>
                  <button
                    onClick={closeSelection}
                    className="text-[13px] tracking-[0.1em] uppercase underline hover:opacity-60 transition-opacity"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : (
                <>
                  {/* Labels Preview */}
                  {labels.length > 0 && (
                    <div className="px-4 py-3 bg-off-white border-b border-light-grey">
                      <p className="text-[10px] tracking-[0.1em] uppercase text-warm-grey mb-2">
                        Organised by {labels.length} room{labels.length > 1 ? "s" : ""}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {labels.map((label) => (
                          <span
                            key={label.id}
                            className="inline-flex items-center gap-1.5 px-2 py-1 text-[10px] tracking-wide bg-white border border-light-grey"
                          >
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: label.color }}
                            />
                            {label.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Items List */}
                  <div className="flex-1 overflow-y-auto">
                    <ul className="divide-y divide-light-grey">
                      {items.map((item) => {
                        const itemLabel = labels.find((l) => l.id === item.labelId);
                        return (
                          <li key={item.id} className="p-4">
                            <div className="flex gap-4">
                              {/* Image */}
                              <Link
                                href={`/product/${item.slug}`}
                                onClick={closeSelection}
                                className="flex-shrink-0 w-24 h-24 bg-off-white relative overflow-hidden"
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
                                {/* Label Badge */}
                                {itemLabel && (
                                  <span
                                    className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] tracking-wide uppercase mb-1"
                                    style={{ 
                                      backgroundColor: `${itemLabel.color}15`,
                                      color: itemLabel.color,
                                    }}
                                  >
                                    <span
                                      className="w-1.5 h-1.5 rounded-full"
                                      style={{ backgroundColor: itemLabel.color }}
                                    />
                                    {itemLabel.name}
                                  </span>
                                )}
                                
                                <Link
                                  href={`/product/${item.slug}`}
                                  onClick={closeSelection}
                                  className="text-[13px] tracking-[0.02em] leading-snug hover:opacity-70 transition-opacity line-clamp-2 block text-primary-black"
                                >
                                  {item.name}
                                </Link>
                                
                                {item.colour && (
                                  <p className="text-[11px] text-warm-grey mt-1">
                                    Colour: {item.colour}
                                  </p>
                                )}
                                
                                <p className="text-[11px] text-warm-grey mt-1 capitalize">
                                  {item.category}
                                </p>

                                {/* Quantity Controls */}
                                <div className="flex items-center justify-between mt-3">
                                  <div className="flex items-center border border-light-grey">
                                    <button
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      className="p-2 hover:bg-off-white transition-colors"
                                      aria-label="Decrease quantity"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="px-4 text-sm">{item.quantity}</span>
                                    <button
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      className="p-2 hover:bg-off-white transition-colors"
                                      aria-label="Increase quantity"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </div>
                                  
                                  <button
                                    onClick={() => removeItem(item.id)}
                                    className="p-2 text-warm-grey hover:text-primary-black transition-colors"
                                    aria-label="Remove item"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Footer */}
                  <footer className="p-6 border-t border-light-grey space-y-4">
                    {/* Summary */}
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-warm-grey">{itemCount} {itemCount === 1 ? "item" : "items"} selected</span>
                      <button
                        onClick={clearSelection}
                        className="text-[11px] tracking-[0.1em] uppercase text-warm-grey hover:text-primary-black transition-colors"
                      >
                        Clear All
                      </button>
                    </div>

                    {/* Pricing Note */}
                    <p className="text-[11px] text-warm-grey text-center">
                      Pricing provided upon enquiry
                    </p>

                    {/* Enquire Button */}
                    <button
                      onClick={() => {
                        closeSelection();
                        setShowEnquiry(true);
                      }}
                      className="w-full py-4 bg-primary-black text-white text-[13px] tracking-[0.15em] uppercase hover:bg-charcoal transition-colors"
                    >
                      Request Quote
                    </button>
                    
                    {/* Call Button */}
                    <a
                      href="tel:+442033704057"
                      className="flex items-center justify-center gap-2 w-full py-4 border border-primary-black text-[13px] tracking-[0.15em] uppercase hover:bg-primary-black hover:text-white transition-colors"
                    >
                      Call: 020 3370 4057
                    </a>
                  </footer>
                </>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Selection Enquiry Panel */}
      <SelectionEnquiryPanel
        isOpen={showEnquiry}
        onClose={() => setShowEnquiry(false)}
        items={items}
        labels={labels}
      />
    </>
  );
}

// Special enquiry panel for selection
function SelectionEnquiryPanel({
  isOpen,
  onClose,
  items,
  labels,
}: {
  isOpen: boolean;
  onClose: () => void;
  items: SelectionItem[];
  labels: { id: string; name: string; color: string }[];
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
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Selection Enquiry:", { formData, items, labels });
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2500);
  };

  // Group items by label
  const groupedItems = labels.map((label) => ({
    label,
    items: items.filter((item) => item.labelId === label.id),
  }));
  const unlabeledItems = items.filter((item) => !item.labelId);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed right-0 top-0 h-full w-full max-w-lg bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-light-grey flex items-center justify-between">
              <h2 className="text-lg tracking-[0.1em] uppercase font-light text-primary-black">
                Request Quote
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-off-white transition-colors rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl tracking-[0.1em] uppercase mb-2 text-primary-black">Enquiry Sent!</h3>
                  <p className="text-warm-grey text-sm">
                    Our team will review your selection and send you a personalised quote within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Selection Summary */}
                  <div className="bg-off-white p-4 max-h-48 overflow-y-auto">
                    <h3 className="text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-3">
                      Your Selection ({items.reduce((sum, i) => sum + i.quantity, 0)} items)
                    </h3>
                    
                    {groupedItems.map(({ label, items: labelItems }) => (
                      labelItems.length > 0 && (
                        <div key={label.id} className="mb-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: label.color }}
                            />
                            <span className="text-[11px] tracking-[0.1em] uppercase font-medium text-primary-black">
                              {label.name}
                            </span>
                          </div>
                          <ul className="space-y-1 pl-4">
                            {labelItems.map((item) => (
                              <li key={item.id} className="text-[12px] text-warm-grey">
                                {item.quantity}× {item.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    ))}
                    
                    {unlabeledItems.length > 0 && (
                      <div className="mb-3">
                        {labels.length > 0 && (
                          <p className="text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-1">
                            Other Items
                          </p>
                        )}
                        <ul className="space-y-1 pl-0">
                          {unlabeledItems.map((item) => (
                            <li key={item.id} className="text-[12px] text-warm-grey">
                              {item.quantity}× {item.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full border border-light-grey px-4 py-3 text-sm focus:border-primary-black outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full border border-light-grey px-4 py-3 text-sm focus:border-primary-black outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-light-grey px-4 py-3 text-sm focus:border-primary-black outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-2">
                      Phone *
                    </label>
                    <div className="flex">
                      <select
                        value={formData.countryCode}
                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                        className="border border-light-grey px-3 py-3 text-sm bg-off-white focus:border-primary-black outline-none"
                      >
                        <option value="+44">+44</option>
                        <option value="+1">+1</option>
                        <option value="+971">+971</option>
                        <option value="+353">+353</option>
                      </select>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="flex-1 border border-l-0 border-light-grey px-4 py-3 text-sm focus:border-primary-black outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-2">
                        Project Type
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full border border-light-grey px-4 py-3 text-sm bg-white focus:border-primary-black outline-none"
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
                      <label className="block text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-2">
                        Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full border border-light-grey px-4 py-3 text-sm bg-white focus:border-primary-black outline-none"
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
                    <label className="block text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Any specific requirements, questions, or details about your project..."
                      className="w-full border border-light-grey px-4 py-3 text-sm focus:border-primary-black outline-none resize-none"
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
                        Sending...
                      </>
                    ) : (
                      "Submit Quote Request"
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
