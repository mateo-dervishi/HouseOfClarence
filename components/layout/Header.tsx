"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Search, User, ShoppingBag, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/stores/cartStore";
import { NAVIGATION } from "@/lib/constants";
import { CartDrawer } from "@/components/cart/CartDrawer";

// Navigation data with subcategories and featured items
const navigationData = NAVIGATION.filter(
  (item) => item.children && item.children.length > 0 && item.name !== "HOME"
).map((item) => ({
  name: item.name,
  href: item.href,
  subcategories: item.children || [],
  shopAll: { name: `Shop All ${item.name}`, href: item.href },
  featured: [
    {
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=500&fit=crop",
      category: item.name.toUpperCase(),
      title: "FEATURED COLLECTION",
      href: item.href,
    },
    {
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=500&fit=crop",
      category: item.name.toUpperCase(),
      title: "NEW ARRIVALS",
      href: item.href,
    },
  ],
}));

// Additional static links
const staticLinks = [
  { name: "New In", href: "/new-in" },
  { name: "Last Chance", href: "/last-chance" },
];

export function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { openCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    if (activeDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveDropdown(null);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    setActiveDropdown(activeDropdown === categoryName ? null : categoryName);
  };

  const closeDropdown = () => setActiveDropdown(null);

  const activeCategory = navigationData.find((cat) => cat.name === activeDropdown);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        {/* Main Navigation Bar */}
        <nav className="border-b border-light-grey">
          <div className="flex items-center justify-center h-14 px-8 relative">
            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-8">
              {navigationData.map((category) => (
                <li key={category.name}>
                  <button
                    onClick={() => handleCategoryClick(category.name)}
                    className={`relative text-[13px] tracking-[0.05em] uppercase py-4 transition-colors ${
                      activeDropdown === category.name
                        ? "text-primary-black"
                        : "text-primary-black hover:opacity-60"
                    }`}
                  >
                    {category.name}
                    {/* Active underline */}
                    {activeDropdown === category.name && (
                      <span className="absolute bottom-3 left-0 right-0 h-[2px] bg-primary-black" />
                    )}
                  </button>
                </li>
              ))}
              {/* Additional static links */}
              {staticLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[13px] tracking-[0.05em] uppercase py-4 hover:opacity-60 transition-opacity text-primary-black"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile hamburger */}
            <button className="lg:hidden absolute left-4 p-2" aria-label="Open menu">
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            </button>

            {/* Logo - Centered on mobile */}
            <Link
              href="/"
              className="lg:hidden absolute left-1/2 -translate-x-1/2"
            >
              <span className="text-xs tracking-[0.3em] font-display uppercase font-light">
                HOUSE OF CLARENCE
              </span>
            </Link>

            {/* Right icons */}
            <div className="absolute right-4 flex items-center gap-3">
              <button
                className="p-2 hover:opacity-60 transition-opacity"
                aria-label="Search"
              >
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button
                className="p-2 hover:opacity-60 transition-opacity hidden sm:block"
                aria-label="Account"
              >
                <User className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button
                onClick={openCart}
                className="p-2 hover:opacity-60 transition-opacity relative"
                aria-label="Shopping cart"
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-black text-white text-[10px] rounded-full flex items-center justify-center">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Dropdown Panel */}
        <AnimatePresence>
          {activeDropdown && activeCategory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="absolute top-full left-0 right-0 bg-white border-b border-light-grey overflow-hidden z-50"
            >
              <div className="max-w-[1400px] mx-auto px-8 py-12">
                <div className="flex justify-between relative">
                  {/* Left: Subcategory Links */}
                  <div className="w-64 flex-shrink-0">
                    <ul className="space-y-4">
                      {activeCategory.subcategories.map((sub) => (
                        <li key={sub.name}>
                          <Link
                            href={sub.href}
                            onClick={closeDropdown}
                            className="text-[13px] tracking-[0.02em] uppercase text-warm-grey hover:text-primary-black transition-colors"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                      {/* Shop All link - bold/darker */}
                      <li className="pt-4">
                        <Link
                          href={activeCategory.shopAll.href}
                          onClick={closeDropdown}
                          className="text-[13px] tracking-[0.02em] uppercase font-medium text-primary-black hover:opacity-60 transition-opacity"
                        >
                          {activeCategory.shopAll.name}
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Right: Featured Images */}
                  <div className="flex gap-6">
                    {activeCategory.featured.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        onClick={closeDropdown}
                        className="group w-72"
                      >
                        {/* Image */}
                        <div className="aspect-[4/5] bg-off-white overflow-hidden mb-4">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={288}
                            height={360}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        {/* Labels */}
                        <p className="text-[11px] tracking-[0.1em] text-warm-grey uppercase mb-1">
                          {item.category}
                        </p>
                        <p className="text-[13px] tracking-[0.05em] font-medium uppercase text-primary-black">
                          {item.title}
                        </p>
                      </Link>
                    ))}
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={closeDropdown}
                    className="absolute top-0 right-0 p-2 hover:opacity-60 transition-opacity"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Backdrop overlay */}
        <AnimatePresence>
          {activeDropdown && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-14 bg-black/10 z-40"
              onClick={closeDropdown}
            />
          )}
        </AnimatePresence>
      </header>
      <CartDrawer />
    </>
  );
}
