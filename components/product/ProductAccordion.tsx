"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface Props {
  description: string;
  specifications?: { label: string; value: string }[];
}

export function ProductAccordion({ description, specifications }: Props) {
  const [openSections, setOpenSections] = useState<string[]>(["description"]);

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const sections = [
    {
      id: "description",
      title: "Description",
      content: (
        <p className="text-[13px] text-warm-grey leading-relaxed">{description}</p>
      ),
    },
    ...(specifications && specifications.length > 0
      ? [
          {
            id: "specification",
            title: "Specification",
            content: (
              <table className="w-full">
                <tbody>
                  {specifications.map((spec, index) => (
                    <tr
                      key={index}
                      className="border-b border-light-grey last:border-0"
                    >
                      <td className="py-2 text-[13px] text-warm-grey w-1/2">
                        {spec.label}
                      </td>
                      <td className="py-2 text-[13px] text-primary-black">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ),
          },
        ]
      : []),
    {
      id: "shipping",
      title: "Shipping & Returns",
      content: (
        <div className="text-[13px] text-warm-grey leading-relaxed space-y-3">
          <p>
            <strong className="text-primary-black">Delivery:</strong> Free UK
            delivery on orders over £500. Standard delivery within 5-7 working
            days.
          </p>
          <p>
            <strong className="text-primary-black">Returns:</strong> We offer
            a 30-day return policy for unused items in original packaging.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="divide-y divide-light-grey">
      {sections.map((section) => (
        <div key={section.id}>
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full flex items-center justify-between py-4 text-left"
          >
            <span className="text-[13px] tracking-[0.1em] uppercase font-medium text-primary-black">
              {section.title}
            </span>
            {openSections.includes(section.id) ? (
              <Minus className="w-4 h-4" strokeWidth={1.5} />
            ) : (
              <Plus className="w-4 h-4" strokeWidth={1.5} />
            )}
          </button>
          <AnimatePresence>
            {openSections.includes(section.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pb-4">{section.content}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

