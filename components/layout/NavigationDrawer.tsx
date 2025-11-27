"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAVIGATION } from "@/lib/constants";

// Transform NAVIGATION data to match drawer structure
const navigationData = NAVIGATION.filter(
  (item) => item.children && item.children.length > 0 && item.name !== "HOME"
).map((item) => ({
  name: item.name,
  href: item.href,
  subcategories: [
    { name: `View All ${item.name}`, href: item.href },
    ...(item.children || []),
  ],
}));

// Secondary links (no subcategories)
const secondaryLinks = NAVIGATION.filter(
  (item) => (!item.children || item.children.length === 0) && item.name !== "HOME"
);

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavigationDrawer({
  isOpen,
  onClose,
}: NavigationDrawerProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose, isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setExpandedCategory(null); // Reset accordion state when closing
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle category click - toggle accordion
  const handleCategoryClick = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };

  // Handle link click - close drawer
  const handleLinkClick = () => {
    onClose();
    setExpandedCategory(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "tween",
              duration: 0.4,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="fixed top-0 left-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between h-16 px-6 border-b border-light-grey">
              <span className="text-xs tracking-[0.2em] text-warm-grey uppercase">
                MENU
              </span>
              <button
                onClick={onClose}
                className="p-2 -mr-2 hover:opacity-70 transition-opacity"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Scrollable Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 -webkit-overflow-scrolling-touch overscroll-contain">
              {/* Primary Categories with Accordion */}
              <ul className="space-y-0">
                {navigationData.map((category) => (
                  <li key={category.name} className="border-b border-light-grey">
                    {/* Category Button */}
                    <button
                      onClick={() => handleCategoryClick(category.name)}
                      className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-off-white transition-colors min-h-[44px]"
                    >
                      <span className="text-sm tracking-[0.15em] uppercase font-light">
                        {category.name}
                      </span>
                      <motion.span
                        animate={{
                          rotate: expandedCategory === category.name ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
                      </motion.span>
                    </button>

                    {/* Subcategories - Accordion Content */}
                    <AnimatePresence>
                      {expandedCategory === category.name && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.32, 0.72, 0, 1],
                          }}
                          className="overflow-hidden bg-off-white"
                        >
                          {category.subcategories.map((sub, index) => (
                            <motion.li
                              key={sub.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Link
                                href={sub.href}
                                onClick={handleLinkClick}
                                className={`block px-6 py-3 text-sm transition-colors hover:bg-light-grey min-h-[48px] flex items-center ${
                                  index === 0
                                    ? "font-medium text-primary-black"
                                    : "text-warm-grey hover:text-primary-black"
                                }`}
                              >
                                {sub.name}
                              </Link>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <div className="my-6 mx-6 border-t border-light-grey" />

              {/* Secondary Links */}
              <ul className="space-y-0">
                {secondaryLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={handleLinkClick}
                      className="block px-6 py-3 text-sm tracking-[0.1em] text-warm-grey hover:text-primary-black hover:bg-off-white transition-colors min-h-[48px] flex items-center uppercase"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Drawer Footer */}
            <div className="border-t border-light-grey px-6 py-4">
              <div className="flex items-center justify-between text-xs text-warm-grey">
                <span>Need help?</span>
                <Link
                  href="/contact"
                  onClick={handleLinkClick}
                  className="hover:text-primary-black transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

