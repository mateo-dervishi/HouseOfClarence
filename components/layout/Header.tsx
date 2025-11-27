"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ChevronRight, X, Menu, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navigationData, Category, Subcategory } from "@/lib/navigation";

export function Header() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState<Subcategory | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showSolidHeader
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        {/* Main Navigation Bar */}
        <nav>
          <div className="flex items-center h-14 px-8">
            {/* Logo - Left aligned */}
            <Link
              href="/"
              className={`flex-shrink-0 text-sm tracking-[0.3em] font-display uppercase font-light transition-colors duration-300 ${
                showSolidHeader ? "text-primary-black" : "text-white"
              }`}
              onClick={closeDropdown}
            >
              HOUSE OF CLARENCE
            </Link>

            {/* Desktop Navigation - Centered */}
            <ul className="hidden lg:flex items-center justify-center flex-1 overflow-hidden whitespace-nowrap">
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
                  <li key={category.slug} className="flex-shrink-0">
                    <button
                      onClick={() => handleCategoryClick(category)}
                      className={`relative text-[9px] xl:text-[10px] tracking-[0.05em] uppercase py-4 px-1 transition-colors duration-300 ${textColor}`}
                    >
                      {category.name.toUpperCase()}
                      {/* Active underline */}
                      {isActive && (
                        <span className={`absolute bottom-3 left-0 right-0 h-[2px] ${
                          showSolidHeader ? "bg-primary-black" : "bg-white"
                        }`} />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Mobile hamburger */}
            <button
              className={`lg:hidden ml-auto p-2 transition-colors duration-300 ${
                showSolidHeader ? "text-primary-black" : "text-white"
              }`}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            </button>

            {/* Right icons - Search, User, Enquire (NO CART) */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <button
                className={`p-2 transition-colors duration-300 ${
                  showSolidHeader ? "text-primary-black hover:opacity-60" : "text-white hover:opacity-70"
                }`}
                aria-label="Search"
              >
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button
                className={`p-2 transition-colors duration-300 hidden sm:block ${
                  showSolidHeader ? "text-primary-black hover:opacity-60" : "text-white hover:opacity-70"
                }`}
                aria-label="Account"
              >
                <User className="w-5 h-5" strokeWidth={1.5} />
              </button>
              {/* Enquire button instead of cart */}
              <Link
                href="/contact"
                className={`hidden sm:block text-[11px] tracking-[0.1em] uppercase px-4 py-2 border transition-colors duration-300 ${
                  showSolidHeader
                    ? "text-primary-black border-primary-black hover:bg-primary-black hover:text-white"
                    : "text-white border-white hover:bg-white hover:text-primary-black"
                }`}
              >
                Enquire
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Navigation */}
        <nav className="border-b border-light-grey/30">
          <div className="max-w-[1600px] mx-auto px-6">
            <ul className="flex items-center justify-center gap-10 py-4">
              {navigationData.map((category: Category) => (
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
            className="fixed inset-0 bg-black/20 z-30 top-[110px]"
            onClick={closeDropdown}
          />
        )}
      </AnimatePresence>
    </>
  );
}
