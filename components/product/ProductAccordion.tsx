"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  description: string;
  specifications?: { label: string; value: string }[];
}

export function ProductAccordion({ description, specifications }: Props) {
  const [openSection, setOpenSection] = useState<string | null>("description");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="border-t border-light-grey mt-8">
      {/* Description */}
      <div className="border-b border-light-grey">
        <button
          onClick={() => toggleSection("description")}
          className="w-full flex items-center justify-between py-5 text-left group"
        >
          <span className="text-[12px] tracking-[0.15em] uppercase group-hover:text-charcoal transition-colors">
            Full Description
          </span>
          <motion.div
            animate={{ rotate: openSection === "description" ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-warm-grey" />
          </motion.div>
        </button>
        <AnimatePresence>
          {openSection === "description" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pb-6 text-[14px] leading-[1.8] text-warm-grey">
                <p>{description}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Specification */}
      {specifications && specifications.length > 0 && (
        <div className="border-b border-light-grey">
          <button
            onClick={() => toggleSection("specification")}
            className="w-full flex items-center justify-between py-5 text-left group"
          >
            <span className="text-[12px] tracking-[0.15em] uppercase group-hover:text-charcoal transition-colors">
              Specifications
            </span>
            <motion.div
              animate={{ rotate: openSection === "specification" ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4 text-warm-grey" />
            </motion.div>
          </button>
          <AnimatePresence>
            {openSection === "specification" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pb-6">
                  <table className="w-full text-[13px]">
                    <tbody>
                      {specifications.map((spec, index) => (
                        <tr key={index} className="border-b border-light-grey/50 last:border-0">
                          <td className="py-3 text-warm-grey w-2/5">{spec.label}</td>
                          <td className="py-3 text-primary-black">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Shipping & Returns */}
      <div className="border-b border-light-grey">
        <button
          onClick={() => toggleSection("shipping")}
          className="w-full flex items-center justify-between py-5 text-left group"
        >
          <span className="text-[12px] tracking-[0.15em] uppercase group-hover:text-charcoal transition-colors">
            Delivery & Returns
          </span>
          <motion.div
            animate={{ rotate: openSection === "shipping" ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-warm-grey" />
          </motion.div>
        </button>
        <AnimatePresence>
          {openSection === "shipping" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pb-6 text-[14px] leading-[1.8] text-warm-grey space-y-4">
                <div>
                  <p className="font-medium text-primary-black mb-2">
                    Delivery
                  </p>
                  <p>
                    Delivery costs and timelines will be provided with your personalised quote.
                    We offer nationwide delivery across the UK with white-glove service available.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-primary-black mb-2">Returns</p>
                  <p>
                    You have 14 days from the date of receiving your order to
                    initiate a return. Items must be unused and in original packaging.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Guarantee */}
      <div>
        <button
          onClick={() => toggleSection("guarantee")}
          className="w-full flex items-center justify-between py-5 text-left group"
        >
          <span className="text-[12px] tracking-[0.15em] uppercase group-hover:text-charcoal transition-colors">
            Guarantee
          </span>
          <motion.div
            animate={{ rotate: openSection === "guarantee" ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-warm-grey" />
          </motion.div>
        </button>
        <AnimatePresence>
          {openSection === "guarantee" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pb-6 text-[14px] leading-[1.8] text-warm-grey">
                <p>
                  All House of Clarence products come with a comprehensive guarantee 
                  covering manufacturing defects. Our premium materials are crafted 
                  to the highest standards for lasting quality.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
