"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { NAVIGATION } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { MegaMenu } from "@/components/layout/MegaMenu";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { openCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-sm border-b border-light-grey"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 -ml-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0"
            >
              <h1 className="text-sm lg:text-base font-display tracking-[0.3em] uppercase font-light">
                HOUSE OF CLARENCE
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAVIGATION.slice(0, 7).map((item) => (
                <div
                  key={item.name}
                  onMouseEnter={() => item.children && setActiveMenu(item.name)}
                  onMouseLeave={() => setActiveMenu(null)}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className="text-xs tracking-widest uppercase hover:text-warm-grey transition-colors"
                  >
                    {item.name}
                  </Link>
                  {activeMenu === item.name && item.children && (
                    <MegaMenu
                      items={item.children}
                      onClose={() => setActiveMenu(null)}
                    />
                  )}
                </div>
              ))}
            </nav>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2 -mr-2"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary-black text-white text-xs flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-light-grey bg-white">
            <nav className="container mx-auto px-6 py-8 space-y-6">
              {NAVIGATION.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm tracking-widest uppercase block mb-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <ul className="ml-4 space-y-2 mt-2">
                      {item.children.map((child) => (
                        <li key={child.name}>
                          <Link
                            href={child.href}
                            className="text-sm text-warm-grey hover:text-primary-black transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </header>
      <CartDrawer />
    </>
  );
}

