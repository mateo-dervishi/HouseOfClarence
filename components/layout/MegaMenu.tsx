"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";

interface MegaMenuProps {
  items: { name: string; href: string }[];
  onClose: () => void;
}

export function MegaMenu({ items, onClose }: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="absolute top-full left-0 mt-2 w-64 bg-white border border-light-grey shadow-lg py-6"
      onMouseLeave={onClose}
    >
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className="block px-6 py-2 text-sm text-charcoal hover:text-primary-black hover:bg-off-white transition-colors"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

