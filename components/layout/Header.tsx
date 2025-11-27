"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ChevronRight, X, Menu, ClipboardList } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navigationData, Category, Subcategory } from "@/lib/navigation";
import { useSelectionStore } from "@/stores/selectionStore";
import { SelectionDrawer } from "@/components/selection/SelectionDrawer";

export function Header() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState<Subcategory | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  
  const { openSelection, getItemCount } = useSelectionStore();
  const selectionCount = getItemCount();

  // Check if we're on a product page (pattern: /[category]/[product])
  const isProductPage = pathname?.split("/").filter(Boolean).length === 2 && 
    pathname !== "/" && 
    !pathname.startsWith("/about") && 
    !pathname.startsWith("/contact") && 
    !pathname.startsWith("/projects") && 
    !pathname.startsWith("/trade");

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          showSolidHeader
            ? "bg-white/95 backdrop-blur-md border-light-grey/50"
            : "bg-transparent border-white/30"
        }`}
      >
        {/* Top Row - Logo centered with icons on right */}
        <div className="relative flex items-center justify-center h-14 px-8">
          {/* Mobile hamburger - Left */}
          <button
            className={`lg:hidden absolute left-6 p-2 transition-colors duration-300 ${
              showSolidHeader ? "text-primary-black" : "text-white"
            }`}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" strokeWidth={1.5} />
          </button>

          {/* Logo - Centered, larger */}
          <Link
            href="/"
            className={`text-xl md:text-2xl tracking-[0.35em] font-display uppercase font-light transition-colors duration-300 ${
              showSolidHeader ? "text-primary-black" : "text-white"
            }`}
            onClick={closeDropdown}
          >
            HOUSE OF CLARENCE
          </Link>

          {/* Right icons - Search and Selection */}
          <div className="absolute right-6 flex items-center gap-1">
            <button
              className={`p-2 transition-colors duration-300 ${
                showSolidHeader ? "text-primary-black hover:opacity-60" : "text-white hover:opacity-70"
              }`}
              aria-label="Search"
            >
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>
            
            {/* Selection Icon */}
            <button
              onClick={openSelection}
              className={`p-2 transition-colors duration-300 relative ${
                showSolidHeader ? "text-primary-black hover:opacity-60" : "text-white hover:opacity-70"
              }`}
              aria-label="Your selection"
            >
              <ClipboardList className="w-5 h-5" strokeWidth={1.5} />
              {selectionCount > 0 && (
                <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium ${
                  showSolidHeader 
                    ? "bg-primary-black text-white" 
                    : "bg-white text-primary-black"
                }`}>
                  {selectionCount > 9 ? "9+" : selectionCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Row - Categories centered */}
        <nav className="hidden lg:block">
          <ul className="flex items-center justify-center gap-6 pb-3">
            {navigationData.map((category: Category) => {
              const isActive = activeCategory?.slug === category.slug;
              const textColor = showSolidHeader
                ? isActive
                  ? "text-primary-black"
                  : "text-primary-black hover:opacity-60"
                : isActive
                  ? "text-white"
                  : "text-white hover:opacity-70";
              
              return (
                <li key={category.slug}>
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className={`relative text-[11px] tracking-[0.12em] uppercase py-2 transition-colors duration-300 ${textColor}`}
                  >
                    {category.name.toUpperCase()}
                    {/* Active underline */}
                    {isActive && (
                      <span className={`absolute bottom-0 left-0 right-0 h-[1px] ${
                        showSolidHeader ? "bg-primary-black" : "bg-white/70"
                      }`} />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
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
            className="fixed top-[88px] left-0 right-0 z-40 bg-white shadow-lg border-t border-light-grey"
            onMouseLeave={closeDropdown}
          >
            <div className="max-w-[1200px] mx-auto px-12 py-10 relative">
              <div className="flex gap-20">
                {/* LEFT: Subcategories */}
                <div className="w-64">
                  <ul className="space-y-4">
                    {activeCategory.subcategories.map((sub: Subcategory) => (
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
                          {hoveredSubcategory.types.map((type: { name: string; slug: string }) => (
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
            className="fixed inset-0 bg-black/20 z-30 top-[88px]"
            onClick={closeDropdown}
          />
        )}
      </AnimatePresence>

      {/* Selection Drawer */}
      <SelectionDrawer />
    </>
  );
}
