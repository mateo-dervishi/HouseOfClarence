"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

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

export function ProductGallery({ images, name, collection }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isWishlisted, setIsWishlisted] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  if (!images || images.length === 0) {
    return (
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="order-2 lg:order-1 lg:w-24 flex lg:flex-col gap-3" />
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !isZoomed) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Vertical Thumbnail Strip - Left Side */}
      {images.length > 1 && (
        <div className="order-2 lg:order-1 lg:w-24 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[700px] pb-2 lg:pb-0 lg:pr-2 scrollbar-hide">
          {images.map((img, index) => (
            <motion.button
              key={img.id || index}
              onClick={() => setSelectedIndex(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-shrink-0 w-20 lg:w-full aspect-square relative overflow-hidden transition-all duration-300 ${
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
                sizes="96px"
              />
              {selectedIndex === index && (
                <motion.div
                  layoutId="thumbnail-indicator"
                  className="absolute inset-0 ring-2 ring-primary-black"
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      )}

      {/* Main Image Container */}
      <div className="order-1 lg:order-2 flex-1">
        <div
          ref={imageRef}
          className="aspect-[4/5] relative bg-[#FAFAFA] overflow-hidden cursor-zoom-in group"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          {/* Collection Badge */}
          {collection && (
            <div className="absolute top-6 left-6 z-10">
              <span className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm text-[10px] tracking-[0.2em] uppercase font-medium">
                {collection}
              </span>
            </div>
          )}

          {/* Main Image with Zoom Effect */}
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
                className="object-cover transition-transform duration-500"
                style={{
                  transform: isZoomed ? "scale(1.5)" : "scale(1)",
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }}
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Zoom Indicator */}
          <div className="absolute bottom-6 left-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm text-[11px] tracking-[0.1em] uppercase">
              <ZoomIn className="w-3.5 h-3.5" />
              <span>Hover to zoom</span>
            </div>
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="absolute top-6 right-6 w-11 h-11 bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white z-10"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={`w-5 h-5 transition-colors duration-300 ${
                isWishlisted ? "fill-red-500 text-red-500" : "text-primary-black"
              }`}
            />
          </motion.button>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-6 right-6 z-10">
              <span className="inline-block px-3 py-2 bg-white/90 backdrop-blur-sm text-[11px] tracking-[0.1em]">
                {selectedIndex + 1} / {images.length}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
