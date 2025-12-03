"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronLeft, ChevronRight, X, Expand } from "lucide-react";

interface ProductImage {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
}

interface Props {
  images: ProductImage[];
  name: string;
  collection?: string;
}

// Image type labels based on index
const imageLabels = ["Main", "Lifestyle", "Detail", "View"];

export function ProductGallery({ images, name, collection }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
    } else if (e.key === "ArrowRight") {
      setSelectedIndex((prev) => (prev + 1) % images.length);
    } else if (e.key === "Escape" && isLightboxOpen) {
      setIsLightboxOpen(false);
    }
  }, [images.length, isLightboxOpen]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen]);

  if (!images || images.length === 0) {
    return (
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="order-2 lg:order-1 lg:w-[100px] flex lg:flex-col gap-3" />
        <div className="order-1 lg:order-2 flex-1">
          <div className="aspect-[4/5] relative bg-[#FAFAFA] overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-warm-grey text-sm">
              No image available
            </div>
          </div>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Vertical Thumbnail Strip - Left Side (Lusso Style) */}
        {images.length > 1 && (
          <div className="order-2 lg:order-1 lg:w-[100px] flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[750px] pb-2 lg:pb-0 scrollbar-hide">
            {images.map((img, index) => (
              <motion.button
                key={img.id || index}
                onClick={() => setSelectedIndex(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group/thumb flex-shrink-0 w-[80px] lg:w-full aspect-square relative overflow-hidden transition-all duration-300 ${
                  selectedIndex === index
                    ? "ring-2 ring-primary-black"
                    : "ring-1 ring-light-grey hover:ring-warm-grey"
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.alt || `${name} view ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
                {/* Thumbnail hover overlay with label */}
                <div className={`absolute inset-0 flex items-end justify-center transition-opacity duration-200 ${
                  selectedIndex === index ? "opacity-100" : "opacity-0 group-hover/thumb:opacity-100"
                }`}>
                  <span className="mb-2 px-2 py-1 bg-black/70 text-white text-[9px] tracking-[0.1em] uppercase">
                    {imageLabels[index] || `View ${index + 1}`}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {/* Main Image Container */}
        <div className="order-1 lg:order-2 flex-1">
          <div className="aspect-[4/5] relative bg-[#FAFAFA] overflow-hidden group">
            {/* Collection Badge */}
            {collection && (
              <div className="absolute top-6 left-6 z-10">
                <span className="inline-block px-4 py-2 bg-white/95 backdrop-blur-sm text-[10px] tracking-[0.2em] uppercase font-medium shadow-sm">
                  {collection}
                </span>
              </div>
            )}

            {/* Main Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <Image
                  src={images[selectedIndex]?.url || images[0].url}
                  alt={images[selectedIndex]?.alt || name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </motion.div>
            </AnimatePresence>

            {/* Top Right Actions */}
            <div className="absolute top-6 right-6 z-10 flex gap-2">
              {/* Fullscreen Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLightboxOpen(true)}
                className="w-11 h-11 bg-white/95 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white shadow-sm"
                aria-label="View fullscreen"
              >
                <Expand className="w-4 h-4 text-primary-black" />
              </motion.button>
              {/* Wishlist Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="w-11 h-11 bg-white/95 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white shadow-sm"
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  className={`w-5 h-5 transition-colors duration-300 ${
                    isWishlisted ? "fill-red-500 text-red-500" : "text-primary-black"
                  }`}
                />
              </motion.button>
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/95 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-105 shadow-sm"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/95 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-105 shadow-sm"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Image Counter & Type Label */}
            {images.length > 1 && (
              <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2">
                <span className="px-3 py-2 bg-white/95 backdrop-blur-sm text-[10px] tracking-[0.15em] uppercase shadow-sm">
                  {imageLabels[selectedIndex] || "View"}
                </span>
                <span className="px-3 py-2 bg-white/95 backdrop-blur-sm text-[11px] tracking-[0.1em] shadow-sm">
                  {selectedIndex + 1} / {images.length}
                </span>
              </div>
            )}
          </div>

          {/* Mobile Dot Indicators */}
          {images.length > 1 && (
            <div className="flex justify-center gap-2 mt-4 lg:hidden">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    selectedIndex === index
                      ? "bg-primary-black w-6"
                      : "bg-light-grey hover:bg-warm-grey"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-50"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Image Counter */}
            <div className="absolute top-6 left-6 z-50">
              <span className="text-white/80 text-[12px] tracking-[0.1em]">
                {selectedIndex + 1} / {images.length}
              </span>
            </div>

            {/* Main Lightbox Image */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full max-w-6xl max-h-[85vh] mx-4"
            >
              <Image
                src={images[selectedIndex]?.url || images[0].url}
                alt={images[selectedIndex]?.alt || name}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}

            {/* Bottom Thumbnails */}
            {images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((img, index) => (
                  <button
                    key={img.id || index}
                    onClick={() => setSelectedIndex(index)}
                    className={`w-16 h-16 relative overflow-hidden transition-all duration-300 ${
                      selectedIndex === index
                        ? "ring-2 ring-white"
                        : "ring-1 ring-white/30 hover:ring-white/60 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
