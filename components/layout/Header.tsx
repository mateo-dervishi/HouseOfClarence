"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, Phone, ChevronRight, X, Menu, ShoppingBag, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/stores/cartStore";
import { navigationData, Category, Subcategory } from "@/lib/navigation";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function Header() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState<Subcategory | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { openCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };
    if (activeCategory) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeCategory]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDropdown();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const showSolidHeader = isScrolled || isHovered || activeCategory;

  const closeDropdown = () => {
    setActiveCategory(null);
    setHoveredSubcategory(null);
  };

  const handleCategoryClick = (category: Category) => {
    if (activeCategory?.slug === category.slug) {
      closeDropdown();
    } else {
      setActiveCategory(category);
      setHoveredSubcategory(category.subcategories[0] || null);
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showSolidHeader
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        {/* Top Bar */}
        <div className="border-b border-light-grey/50">
          <div className="max-w-[1600px] mx-auto px-6 py-2 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                className={`flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase transition-colors ${
                  showSolidHeader ? "text-primary-black" : "text-white"
                }`}
              >
                <Search className="w-4 h-4" strokeWidth={1.5} />
                <span>Search</span>
              </button>
              <a
                href="tel:+442033704057"
                className={`text-[11px] tracking-[0.05em] transition-colors ${
                  showSolidHeader ? "text-primary-black" : "text-white"
                }`}
              >
                +44 (0)20 3370 4057
              </a>
            </div>

            {/* Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <span
                className={`text-xl tracking-[0.3em] font-display uppercase font-light transition-colors ${
                  showSolidHeader ? "text-primary-black" : "text-white"
                }`}
              >
                HOUSE OF CLARENCE
              </span>
            </Link>

            {/* Right */}
            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className={`text-[11px] tracking-[0.1em] uppercase transition-colors ${
                  showSolidHeader ? "text-primary-black" : "text-white"
                }`}
              >
                Enquire
              </Link>
              <button
                onClick={openCart}
                className={`p-2 transition-colors relative ${
                  showSolidHeader ? "text-primary-black hover:opacity-60" : "text-white hover:opacity-70"
                }`}
                aria-label="Shopping cart"
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className={`absolute -top-1 -right-1 w-4 h-4 text-white text-[10px] rounded-full flex items-center justify-center ${
                    showSolidHeader ? "bg-primary-black" : "bg-white/20 backdrop-blur-sm"
                  }`}>
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="border-b border-light-grey/30">
          <div className="max-w-[1600px] mx-auto px-6">
            <ul className="flex items-center justify-center gap-10 py-4">
              {navigationData.map((category) => (
                <li key={category.slug}>
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className={`text-[12px] tracking-[0.15em] uppercase transition-all relative ${
                      activeCategory?.slug === category.slug
                        ? "text-primary-black border-b-2 border-primary-black pb-1"
                        : showSolidHeader
                        ? "text-warm-grey hover:text-primary-black"
                        : "text-white hover:opacity-70"
                    }`}
                  >
                    {category.name.toUpperCase()}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[110px] left-0 right-0 z-40 bg-white shadow-lg border-t border-light-grey"
            onMouseLeave={closeDropdown}
          >
            <div className="max-w-[1200px] mx-auto px-12 py-10 relative">
              <div className="flex gap-20">
                {/* LEFT: Subcategories */}
                <div className="w-64">
                  <ul className="space-y-4">
                    {activeCategory.subcategories.map((sub) => (
                      <li key={sub.slug}>
                        <button
                          onMouseEnter={() => setHoveredSubcategory(sub)}
                          className={`flex items-center justify-between w-full text-left text-[13px] tracking-[0.1em] uppercase transition-colors ${
                            hoveredSubcategory?.slug === sub.slug
                              ? "text-primary-black font-medium"
                              : "text-warm-grey hover:text-primary-black"
                          }`}
                        >
                          <span>{sub.name}</span>
                          <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </li>
                    ))}
                    <li className="pt-6 border-t border-light-grey">
                      <Link
                        href={`/${activeCategory.slug}`}
                        onClick={closeDropdown}
                        className="text-[13px] tracking-[0.1em] uppercase font-medium text-primary-black hover:opacity-60 transition-opacity"
                      >
                        Shop All {activeCategory.name}
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* RIGHT: Types for hovered subcategory */}
                <div className="flex-1">
                  <AnimatePresence mode="wait">
                    {hoveredSubcategory && (
                      <motion.div
                        key={hoveredSubcategory.slug}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.15 }}
                      >
                        <ul className="space-y-3">
                          {hoveredSubcategory.types.map((type) => (
                            <li key={type.slug}>
                              <Link
                                href={`/${activeCategory.slug}/${hoveredSubcategory.slug}/${type.slug}`}
                                onClick={closeDropdown}
                                className="text-[13px] tracking-[0.05em] uppercase text-warm-grey hover:text-primary-black transition-colors"
                              >
                                {type.name}
                              </Link>
                            </li>
                          ))}
                          <li className="pt-4">
                            <Link
                              href={`/${activeCategory.slug}/${hoveredSubcategory.slug}`}
                              onClick={closeDropdown}
                              className="text-[13px] tracking-[0.1em] uppercase font-medium text-primary-black hover:opacity-60 transition-opacity"
                            >
                              Shop All {hoveredSubcategory.name}
                            </Link>
                          </li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={closeDropdown}
                className="absolute top-6 right-8 p-2 hover:opacity-60 transition-opacity"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-30 top-[110px]"
            onClick={closeDropdown}
          />
        )}
      </AnimatePresence>

      <CartDrawer />
    </>
  );
}
