"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, ChevronRight, X, Menu, ClipboardList, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navigationData, Category, Subcategory } from "@/lib/navigation";
import { useSelectionStore } from "@/stores/selectionStore";
import { SelectionDrawer } from "@/components/selection/SelectionDrawer";
import { SearchModal } from "@/components/search/SearchModal";
import { createClient } from "@/lib/supabase/client";

// Featured images for each category dropdown
const categoryFeaturedImages: Record<string, { image: string; category: string; title: string; href: string }[]> = {
  bathroom: [
    { image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=500&fit=crop", category: "BATHROOM", title: "NERO MARBLE BASIN", href: "/bathroom/basins" },
    { image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=500&fit=crop", category: "VANITY UNITS", title: "WALNUT WALL HUNG", href: "/bathroom/vanity-units" },
    { image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=500&fit=crop", category: "BRASSWARE", title: "BRUSHED BRASS TAP", href: "/bathroom/taps" },
  ],
  kitchen: [
    { image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=500&fit=crop", category: "KITCHEN TAPS", title: "AGED BRONZE MIXER", href: "/kitchen/kitchen-taps" },
    { image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&h=500&fit=crop", category: "KITCHEN SINKS", title: "BELFAST CERAMIC", href: "/kitchen/kitchen-sinks" },
    { image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&h=500&fit=crop", category: "HARDWARE", title: "BRUSHED NICKEL PULL", href: "/kitchen/kitchen-hardware" },
  ],
  furniture: [
    { image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=500&fit=crop", category: "LIVING ROOM", title: "VELVET SOFA EMERALD", href: "/furniture/living-room-furniture" },
    { image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=500&fit=crop", category: "DINING", title: "OAK DINING TABLE", href: "/furniture/dining-room-furniture" },
    { image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=500&fit=crop", category: "BEDROOM", title: "LINEN HEADBOARD", href: "/furniture/bedroom-furniture" },
  ],
  tiling: [
    { image: "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=400&h=500&fit=crop", category: "MARBLE TILES", title: "CALACATTA GOLD", href: "/tiling/marble-tiles" },
    { image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400&h=500&fit=crop", category: "PORCELAIN", title: "TERRAZZO BIANCO", href: "/tiling/porcelain-tiles" },
    { image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop", category: "MOSAIC", title: "HERRINGBONE NERO", href: "/tiling/mosaic-tiles" },
  ],
  lighting: [
    { image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=500&fit=crop", category: "PENDANT LIGHTS", title: "GLASS ORB BRASS", href: "/lighting/pendant-lights" },
    { image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=500&fit=crop", category: "WALL LIGHTS", title: "ART DECO SCONCE", href: "/lighting/wall-lights" },
    { image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=500&fit=crop", category: "FLOOR LAMPS", title: "MARBLE BASE LAMP", href: "/lighting/floor-lamps" },
  ],
  electrical: [
    { image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=500&fit=crop", category: "SWITCHES", title: "BRUSHED BRASS TOGGLE", href: "/electrical/switches" },
    { image: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=400&h=500&fit=crop", category: "SOCKETS", title: "MATTE BLACK USB", href: "/electrical/sockets" },
    { image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=500&fit=crop", category: "DIMMERS", title: "CHROME DIMMER", href: "/electrical/switches" },
  ],
};

export function Header() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState<Subcategory | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  const { openSelection, getItemCount } = useSelectionStore();
  const selectionCount = getItemCount();

  // Check auth status
  useEffect(() => {
    const supabase = createClient();
    
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Pages that have dark hero backgrounds (transparent header with white text)
  const darkHeroPages = ["/"];
  const hasDarkHero = darkHeroPages.includes(pathname) || pathname.startsWith("/bathroom") || pathname.startsWith("/kitchen") || pathname.startsWith("/furniture") || pathname.startsWith("/tiling") || pathname.startsWith("/lighting") || pathname.startsWith("/electrical") || pathname.startsWith("/bespoke") || pathname.startsWith("/projects");

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

  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleSearchShortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handleSearchShortcut);
    return () => document.removeEventListener("keydown", handleSearchShortcut);
  }, []);

  // Show solid header (white bg, black text) when: scrolled, dropdown open, or on pages without dark hero
  const showSolidHeader = isScrolled || activeCategory || !hasDarkHero;

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          showSolidHeader
            ? "bg-white/95 backdrop-blur-md border-light-grey/50"
            : "bg-transparent border-white/30"
        }`}
      >
        {/* Top Row - Logo centered with icons on sides */}
        <div className="flex items-center justify-between h-12 md:h-14 px-3 md:px-8">
          {/* Left - Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className={`lg:hidden flex items-center justify-center w-10 h-10 -ml-1 transition-colors duration-300 z-10 ${
              showSolidHeader ? "text-primary-black" : "text-white"
            }`}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" strokeWidth={1.5} />
          </button>
          
          {/* Spacer for desktop */}
          <div className="hidden lg:block w-24" />

          {/* Logo - Centered */}
          <Link
            href="/"
            className={`text-[12px] sm:text-[14px] md:text-xl lg:text-2xl tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.35em] font-display uppercase font-light transition-colors duration-300 text-center flex-shrink-0 ${
              showSolidHeader ? "text-primary-black" : "text-white"
            }`}
            onClick={closeDropdown}
          >
            HOUSE OF CLARENCE
          </Link>

          {/* Right icons - Search, Profile, and Selection */}
          <div className="flex items-center justify-end">
            <button
              onClick={() => setSearchOpen(true)}
              className={`flex items-center justify-center w-10 h-10 transition-colors duration-300 ${
                showSolidHeader ? "text-primary-black hover:opacity-60" : "text-white hover:opacity-70"
              }`}
              aria-label="Search"
            >
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>
            
            {/* Profile Icon */}
            <Link
              href={isLoggedIn ? "/account" : "/login"}
              className={`flex items-center justify-center w-10 h-10 transition-colors duration-300 ${
                showSolidHeader ? "text-primary-black hover:opacity-60" : "text-white hover:opacity-70"
              }`}
              aria-label="Account"
            >
              <User className="w-5 h-5" strokeWidth={1.5} />
            </Link>
            
            {/* Selection Icon */}
            <button
              onClick={openSelection}
              className={`flex items-center justify-center w-10 h-10 -mr-1 md:mr-0 transition-colors duration-300 relative ${
                showSolidHeader ? "text-primary-black hover:opacity-60" : "text-white hover:opacity-70"
              }`}
              aria-label="Your selection"
            >
              <ClipboardList className="w-5 h-5" strokeWidth={1.5} />
              {selectionCount > 0 && (
                <span className={`absolute top-1 right-1 md:top-0.5 md:right-0.5 w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center text-[9px] md:text-[10px] font-medium ${
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
                ? "text-primary-black"
                : "text-white";
              
              return (
                <li key={category.slug}>
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className={`relative text-[11px] tracking-[0.12em] uppercase py-2 transition-all duration-300 hover:scale-110 origin-center ${textColor} ${isActive ? "" : "opacity-80 hover:opacity-100"}`}
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
            {/* Bespoke - Special link */}
            <li>
              <Link
                href="/bespoke"
                onClick={closeDropdown}
                className={`relative text-[11px] tracking-[0.12em] uppercase py-2 transition-all duration-300 hover:scale-110 origin-center ${
                  showSolidHeader ? "text-primary-black" : "text-white"
                } opacity-80 hover:opacity-100`}
              >
                BESPOKE
              </Link>
            </li>
            {/* Projects - Portfolio link */}
            <li>
              <Link
                href="/projects"
                onClick={closeDropdown}
                className={`relative text-[11px] tracking-[0.12em] uppercase py-2 transition-all duration-300 hover:scale-110 origin-center ${
                  showSolidHeader ? "text-primary-black" : "text-white"
                } opacity-80 hover:opacity-100`}
              >
                PROJECTS
              </Link>
            </li>
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
            <div className="max-w-[1400px] mx-auto px-12 py-10 relative">
              <div className="flex gap-12">
                {/* LEFT: Subcategories */}
                <div className="w-56 flex-shrink-0">
                  <ul className="space-y-1">
                    {activeCategory.subcategories.map((sub: Subcategory) => (
                      <li key={sub.slug}>
                        <button
                          onMouseEnter={() => setHoveredSubcategory(sub)}
                          className={`flex items-center justify-between w-full text-left text-[13px] tracking-[0.1em] uppercase transition-colors py-1.5 ${
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
                    <li className="pt-6 border-t border-light-grey mt-4">
                      <Link
                        href={`/${activeCategory.slug}`}
                        onClick={closeDropdown}
                        className="block py-1.5 text-[13px] tracking-[0.1em] uppercase font-medium text-primary-black hover:opacity-60 transition-opacity"
                      >
                        Shop All {activeCategory.name}
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* MIDDLE: Types for hovered subcategory */}
                <div className="w-48 flex-shrink-0">
                  <AnimatePresence mode="wait">
                    {hoveredSubcategory && (
                      <motion.div
                        key={hoveredSubcategory.slug}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.15 }}
                      >
                        <ul className="space-y-1">
                          {hoveredSubcategory.types.map((type: { name: string; slug: string }) => (
                            <li key={type.slug}>
                              <Link
                                href={`/${activeCategory.slug}/${hoveredSubcategory.slug}/${type.slug}`}
                                onClick={closeDropdown}
                                className="block py-1.5 text-[13px] tracking-[0.05em] uppercase text-warm-grey hover:text-primary-black transition-colors"
                              >
                                {type.name}
                              </Link>
                            </li>
                          ))}
                          <li className="pt-4 mt-3 border-t border-light-grey">
                            <Link
                              href={`/${activeCategory.slug}/${hoveredSubcategory.slug}`}
                              onClick={closeDropdown}
                              className="block py-1.5 text-[13px] tracking-[0.1em] uppercase font-medium text-primary-black hover:opacity-60 transition-opacity"
                            >
                              Shop All {hoveredSubcategory.name}
                            </Link>
                          </li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* RIGHT: Featured Images */}
                <div className="flex-1 flex gap-4 justify-end">
                  {categoryFeaturedImages[activeCategory.slug]?.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      onClick={closeDropdown}
                      className="group relative w-[180px] flex-shrink-0"
                    >
                      <div className="aspect-[4/5] relative overflow-hidden bg-off-white">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="180px"
                        />
                      </div>
                      <div className="mt-3">
                        <p className="text-[10px] tracking-[0.15em] text-warm-grey uppercase">
                          {item.category}
                        </p>
                        <p className="text-[12px] tracking-[0.1em] text-primary-black uppercase font-medium mt-1">
                          {item.title}
                        </p>
                      </div>
                    </Link>
                  ))}
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

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-50 lg:hidden overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-light-grey">
                <span className="text-sm tracking-[0.15em] uppercase font-display">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 -mr-2"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="flex items-center gap-3 w-full px-4 py-4 border-b border-light-grey text-left hover:bg-off-white transition-colors"
              >
                <Search className="w-5 h-5 text-warm-grey" strokeWidth={1.5} />
                <span className="text-[14px] text-warm-grey">Search products...</span>
              </button>
              
              {/* Categories */}
              <nav className="p-4">
                <ul className="space-y-1">
                  {navigationData.map((category) => (
                    <li key={category.slug}>
                      <details className="group">
                        <summary className="flex items-center justify-between py-3 text-[14px] tracking-[0.1em] uppercase cursor-pointer list-none">
                          {category.name}
                          <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90" />
                        </summary>
                        <ul className="pl-4 pb-2 space-y-1">
                          {category.subcategories.map((sub) => (
                            <li key={sub.slug}>
                              <Link
                                href={`/${category.slug}/${sub.slug}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block py-2 text-[13px] text-warm-grey hover:text-primary-black transition-colors"
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                          <li>
                            <Link
                              href={`/${category.slug}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-2 text-[13px] font-medium text-primary-black"
                            >
                              Shop All {category.name}
                            </Link>
                          </li>
                        </ul>
                      </details>
                    </li>
                  ))}
                  
                  {/* Bespoke */}
                  <li>
                    <Link
                      href="/bespoke"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-3 text-[14px] tracking-[0.1em] uppercase"
                    >
                      Bespoke
                    </Link>
                  </li>
                  {/* Projects */}
                  <li>
                    <Link
                      href="/projects"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-3 text-[14px] tracking-[0.1em] uppercase"
                    >
                      Projects
                    </Link>
                  </li>
                </ul>
              </nav>
              
              {/* Bottom Links */}
              <div className="border-t border-light-grey p-4 mt-4">
                <Link
                  href={isLoggedIn ? "/account" : "/login"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-3 text-[13px]"
                >
                  <User className="w-4 h-4" />
                  <span className="font-medium">{isLoggedIn ? "My Account" : "Sign In / Register"}</span>
                </Link>
                <a
                  href="tel:+442037155892"
                  className="flex items-center gap-3 py-3 text-[13px]"
                >
                  <span className="text-warm-grey">Call Us:</span>
                  <span className="font-medium">0203 715 5892</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Selection Drawer */}
      <SelectionDrawer />

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
