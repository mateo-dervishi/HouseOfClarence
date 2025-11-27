"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, Check } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

// Country codes for phone number
const countryCodes = [
  { code: "+44", flag: "🇬🇧", country: "United Kingdom" },
  { code: "+1", flag: "🇺🇸", country: "United States" },
  { code: "+33", flag: "🇫🇷", country: "France" },
  { code: "+49", flag: "🇩🇪", country: "Germany" },
  { code: "+39", flag: "🇮🇹", country: "Italy" },
  { code: "+34", flag: "🇪🇸", country: "Spain" },
  { code: "+971", flag: "🇦🇪", country: "UAE" },
];

export function EnquiryPanel({ isOpen, onClose, productName }: Props) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+44",
    phone: "",
    question: "",
  });
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedCountry = countryCodes.find(
    (c) => c.code === formData.countryCode
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    // Close after success message
    setTimeout(() => {
      onClose();
      setIsSuccess(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        countryCode: "+44",
        phone: "",
        question: "",
      });
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl overflow-y-auto"
          >
            <div className="p-8">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 hover:opacity-60 transition-opacity"
                aria-label="Close"
              >
                <X className="w-6 h-6" strokeWidth={1.5} />
              </button>

              {/* Header */}
              <div className="mb-8">
                <h2 className="text-2xl tracking-[0.1em] uppercase font-display font-light mb-3">
                  Enquire
                </h2>
                <p className="text-[14px] text-warm-grey leading-relaxed">
                  Wherever you are, the House of Clarence team will be delighted
                  to assist you.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* First Name */}
                <div>
                  <input
                    type="text"
                    placeholder="FIRST NAME"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full border border-light-grey px-4 py-4 text-[12px] tracking-[0.1em] uppercase placeholder:text-warm-grey focus:outline-none focus:border-primary-black transition-colors"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <input
                    type="text"
                    placeholder="LAST NAME"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full border border-light-grey px-4 py-4 text-[12px] tracking-[0.1em] uppercase placeholder:text-warm-grey focus:outline-none focus:border-primary-black transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border border-light-grey px-4 py-4 text-[12px] tracking-[0.1em] uppercase placeholder:text-warm-grey focus:outline-none focus:border-primary-black transition-colors"
                  />
                </div>

                {/* Phone with Country Code */}
                <div className="relative">
                  <div className="flex border border-light-grey focus-within:border-primary-black transition-colors">
                    {/* Country Code Selector */}
                    <button
                      type="button"
                      onClick={() =>
                        setShowCountryDropdown(!showCountryDropdown)
                      }
                      className="flex items-center gap-2 px-4 py-4 border-r border-light-grey hover:bg-off-white transition-colors"
                    >
                      <span className="text-lg">{selectedCountry?.flag}</span>
                      <ChevronDown className="w-4 h-4 text-warm-grey" />
                    </button>

                    {/* Phone Input */}
                    <input
                      type="tel"
                      placeholder="CONTACT NUMBER"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="flex-1 px-4 py-4 text-[12px] tracking-[0.1em] uppercase placeholder:text-warm-grey focus:outline-none"
                    />
                  </div>

                  {/* Country Dropdown */}
                  <AnimatePresence>
                    {showCountryDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 w-64 bg-white border border-light-grey shadow-lg z-10 max-h-60 overflow-y-auto mt-1"
                      >
                        {countryCodes.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                countryCode: country.code,
                              });
                              setShowCountryDropdown(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-off-white transition-colors text-left"
                          >
                            <span className="text-lg">{country.flag}</span>
                            <span className="text-[12px]">{country.country}</span>
                            <span className="text-[12px] text-warm-grey ml-auto">
                              {country.code}
                            </span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Question/Message */}
                <div>
                  <textarea
                    placeholder="ENTER YOUR QUESTION"
                    rows={4}
                    value={formData.question}
                    onChange={(e) =>
                      setFormData({ ...formData, question: e.target.value })
                    }
                    className="w-full border border-light-grey px-4 py-4 text-[12px] tracking-[0.1em] uppercase placeholder:text-warm-grey focus:outline-none focus:border-primary-black transition-colors resize-none"
                  />
                </div>

                {/* Hidden Product Name */}
                <input type="hidden" name="product" value={productName} />

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className={`w-full py-4 text-[12px] tracking-[0.15em] uppercase font-medium transition-all ${
                    isSuccess
                      ? "bg-green-600 text-white"
                      : "bg-primary-black text-white hover:bg-charcoal"
                  } disabled:opacity-70`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Submitting...
                    </span>
                  ) : isSuccess ? (
                    <span className="flex items-center justify-center gap-2">
                      <Check className="w-4 h-4" />
                      Enquiry Sent
                    </span>
                  ) : (
                    "Submit Enquiry"
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

