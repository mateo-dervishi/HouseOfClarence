"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, ShoppingBag, Search, User } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { cn } from "@/lib/utils";
import { CartDrawer } from "@/components/cart/CartDrawer";
import NavigationDrawer from "./NavigationDrawer";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
            : "bg-white border-b border-light-grey"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 lg:px-8">
          {/* Left: Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 -ml-2 hover:opacity-70 transition-opacity"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" strokeWidth={1.5} />
          </button>

          {/* Centre: Logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0"
          >
            <span className="text-sm tracking-[0.3em] font-display uppercase font-light">
              HOUSE OF CLARENCE
            </span>
          </Link>

          {/* Right: Icons */}
          <div className="flex items-center gap-4">
            <button
              className="p-2 hover:opacity-70 transition-opacity"
              aria-label="Search"
            >
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button
              className="p-2 hover:opacity-70 transition-opacity"
              aria-label="Account"
            >
              <User className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button
              onClick={openCart}
              className="p-2 hover:opacity-70 transition-opacity relative"
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
      </header>

      {/* Navigation Drawer */}
      <NavigationDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
}
