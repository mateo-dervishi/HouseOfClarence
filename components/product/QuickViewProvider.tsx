"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/types/product";
import { QuickViewModal } from "./QuickViewModal";

interface QuickViewContextType {
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

const QuickViewContext = createContext<QuickViewContextType | null>(null);

export function useQuickView() {
  const context = useContext(QuickViewContext);
  if (!context) {
    throw new Error("useQuickView must be used within a QuickViewProvider");
  }
  return context;
}

export function QuickViewProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  const openQuickView = (product: Product) => {
    setProduct(product);
    setIsOpen(true);
  };

  const closeQuickView = () => {
    setIsOpen(false);
    // Delay clearing product to allow exit animation
    setTimeout(() => setProduct(null), 200);
  };

  return (
    <QuickViewContext.Provider value={{ openQuickView, closeQuickView }}>
      {children}
      <QuickViewModal
        product={product}
        isOpen={isOpen}
        onClose={closeQuickView}
      />
    </QuickViewContext.Provider>
  );
}

