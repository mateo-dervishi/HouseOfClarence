"use client";

import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EnquiryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

const countryCodes = [
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+353", country: "IE", flag: "🇮🇪" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+34", country: "ES", flag: "🇪🇸" },
  { code: "+39", country: "IT", flag: "🇮🇹" },
  { code: "+31", country: "NL", flag: "🇳🇱" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
];

export function EnquiryPanel({ isOpen, onClose, productName }: EnquiryPanelProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+44",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        countryCode: "+44",
        message: "",
      });
    }, 2000);
  };

  const selectedCountry = countryCodes.find((c) => c.code === formData.countryCode);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-light-grey">
              <h2 className="text-xl tracking-[0.1em] uppercase font-light">
                Enquire
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-off-white transition-colors rounded-full"
                aria-label="Close"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <p className="text-[14px] text-warm-grey mb-8 leading-relaxed">
                Wherever you are, the House of Clarence team will be delighted to assist you.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-primary-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl tracking-[0.1em] uppercase mb-2">Thank You</h3>
                  <p className="text-warm-grey text-sm">We&apos;ll be in touch shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* First Name */}
                  <div>
                    <label className="block text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full border border-light-grey px-4 py-3 text-[14px] focus:border-primary-black outline-none transition-colors"
                      placeholder="First Name"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full border border-light-grey px-4 py-3 text-[14px] focus:border-primary-black outline-none transition-colors"
                      placeholder="Last Name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-light-grey px-4 py-3 text-[14px] focus:border-primary-black outline-none transition-colors"
                      placeholder="Email Address"
                    />
                  </div>

                  {/* Phone with Country Code */}
                  <div>
                    <label className="block text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-2">
                      Contact Number
                    </label>
                    <div className="flex">
                      {/* Country Code Selector */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                          className="flex items-center gap-2 border border-light-grey border-r-0 px-3 py-3 bg-off-white hover:bg-light-grey transition-colors"
                        >
                          <span>{selectedCountry?.flag}</span>
                          <ChevronDown className="w-3 h-3" />
                        </button>
                        
                        {showCountryDropdown && (
                          <div className="absolute top-full left-0 mt-1 bg-white border border-light-grey shadow-lg z-10 max-h-48 overflow-y-auto">
                            {countryCodes.map((country) => (
                              <button
                                key={country.code}
                                type="button"
                                onClick={() => {
                                  setFormData({ ...formData, countryCode: country.code });
                                  setShowCountryDropdown(false);
                                }}
                                className="flex items-center gap-2 px-4 py-2 hover:bg-off-white w-full text-left text-sm"
                              >
                                <span>{country.flag}</span>
                                <span>{country.code}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Phone Input */}
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="flex-1 border border-light-grey px-4 py-3 text-[14px] focus:border-primary-black outline-none transition-colors"
                        placeholder="Contact Number"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-2">
                      Enter Your Question
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full border border-light-grey px-4 py-3 text-[14px] focus:border-primary-black outline-none transition-colors resize-none"
                      placeholder={`I'm interested in the ${productName}...`}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-primary-black text-white text-[13px] tracking-[0.15em] uppercase hover:bg-charcoal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                  </button>
                </form>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
