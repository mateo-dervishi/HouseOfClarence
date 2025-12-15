"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, Plus, Check, ExternalLink, Minus } from "lucide-react";
import { Product } from "@/types/product";
import { useSelectionStore } from "@/stores/selectionStore";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { addItem, isInSelection } = useSelectionStore();

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setCurrentImageIndex(0);
      setJustAdded(false);
      setQuantity(1);
    }
  }, [product]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!product) return null;

  const images = product.images;
  const isSelected = isInSelection(product.id);

  const handleAddToSelection = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: 0,
        priceExVat: 0,
        image: images[0]?.url || "",
        colour: product.specifications?.colour,
        category: product.category.slug,
      });
    }
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-[70] flex items-center justify-center"
          >
            <div className="bg-white w-full max-w-5xl max-h-full overflow-hidden shadow-2xl flex flex-col">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white flex items-center justify-center transition-colors shadow-md"
                aria-label="Close quick view"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row h-full overflow-hidden">
                {/* Left: Image Gallery */}
                <div className="md:w-1/2 bg-off-white relative flex-shrink-0">
                  {/* Main Image */}
                  <div className="aspect-square md:aspect-auto md:h-full relative">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={images[currentImageIndex]?.url || "/placeholder.jpg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white flex items-center justify-center transition-colors shadow-md"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white flex items-center justify-center transition-colors shadow-md"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}

                    {/* Image Indicators */}
                    {images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              idx === currentImageIndex
                                ? "bg-primary-black"
                                : "bg-white/70 hover:bg-white"
                            }`}
                            aria-label={`View image ${idx + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Strip */}
                  {images.length > 1 && (
                    <div className="hidden md:flex gap-2 p-4 bg-white border-t border-light-grey overflow-x-auto">
                      {images.slice(0, 5).map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-16 h-16 flex-shrink-0 relative overflow-hidden transition-all ${
                            idx === currentImageIndex
                              ? "ring-2 ring-primary-black"
                              : "opacity-60 hover:opacity-100"
                          }`}
                        >
                          <Image
                            src={img.url}
                            alt={`${product.name} thumbnail ${idx + 1}`}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Product Info */}
                <div className="md:w-1/2 overflow-y-auto">
                  <div className="p-6 md:p-8">
                    {/* Category */}
                    <p className="text-[10px] tracking-[0.2em] uppercase text-warm-grey mb-2">
                      {product.category.name} / {product.subcategory.replace(/-/g, " ")}
                    </p>

                    {/* Name */}
                    <h2 className="text-xl md:text-2xl font-light tracking-wide mb-2">
                      {product.name}
                    </h2>

                    {/* SKU */}
                    <p className="text-[11px] text-warm-grey mb-6">
                      SKU: {product.sku}
                    </p>

                    {/* Description */}
                    <p className="text-[14px] text-warm-grey leading-relaxed mb-6">
                      {product.description}
                    </p>

                    {/* Specifications */}
                    <div className="border-t border-light-grey pt-6 mb-6">
                      <h3 className="text-[11px] tracking-[0.15em] uppercase text-warm-grey mb-4">
                        Specifications
                      </h3>
                      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-[13px]">
                        <div>
                          <dt className="text-warm-grey">Material</dt>
                          <dd className="font-medium">{product.specifications.material}</dd>
                        </div>
                        <div>
                          <dt className="text-warm-grey">Finish</dt>
                          <dd className="font-medium">{product.specifications.finish}</dd>
                        </div>
                        <div>
                          <dt className="text-warm-grey">Colour</dt>
                          <dd className="font-medium">{product.specifications.colour}</dd>
                        </div>
                        <div>
                          <dt className="text-warm-grey">Dimensions</dt>
                          <dd className="font-medium">
                            {product.specifications.dimensions.width} × {product.specifications.dimensions.height} × {product.specifications.dimensions.depth}mm
                          </dd>
                        </div>
                      </dl>
                    </div>

                    {/* Quantity & Add to Selection */}
                    <div className="border-t border-light-grey pt-6 space-y-4">
                      {/* Quantity Selector */}
                      <div className="flex items-center gap-4">
                        <span className="text-[12px] tracking-[0.1em] uppercase text-warm-grey">
                          Quantity
                        </span>
                        <div className="flex items-center border border-light-grey">
                          <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="p-2 hover:bg-off-white transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 text-sm min-w-[2.5rem] text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="p-2 hover:bg-off-white transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Add to Selection Button */}
                      <button
                        onClick={handleAddToSelection}
                        className={`w-full py-4 text-[12px] tracking-[0.15em] uppercase transition-colors flex items-center justify-center gap-2 ${
                          justAdded
                            ? "bg-green-600 text-white"
                            : "bg-primary-black text-white hover:bg-charcoal"
                        }`}
                      >
                        {justAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            Added to Selection
                          </>
                        ) : isSelected ? (
                          <>
                            <Plus className="w-4 h-4" />
                            Add More to Selection
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            Add to Selection
                          </>
                        )}
                      </button>

                      {/* View Full Details Link */}
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-center gap-2 py-3 text-[12px] tracking-[0.1em] uppercase text-warm-grey hover:text-primary-black transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Full Details
                      </Link>
                    </div>

                    {/* Tags */}
                    {product.tags.length > 0 && (
                      <div className="border-t border-light-grey pt-6 mt-6">
                        <div className="flex flex-wrap gap-2">
                          {product.tags.slice(0, 6).map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-off-white text-[10px] tracking-[0.1em] uppercase text-warm-grey"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

