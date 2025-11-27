"use client";

import { useState } from "react";
import Image from "next/image";

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
}

export function ProductGallery({ images, name }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="space-y-4">
        <div className="aspect-square relative bg-[#f5f5f5] overflow-hidden">
          <div className="w-full h-full flex items-center justify-center text-warm-grey">
            No image available
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square relative bg-[#f5f5f5] overflow-hidden">
        <Image
          src={images[selectedIndex]?.url || images[0].url}
          alt={images[selectedIndex]?.alt || name}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {/* Wishlist Button */}
        <button
          className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
          aria-label="Add to wishlist"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Thumbnail Strip - Horizontal */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={img.id || index}
              onClick={() => setSelectedIndex(index)}
              className={`flex-shrink-0 w-20 h-20 relative overflow-hidden border-2 transition-all ${
                selectedIndex === index
                  ? "border-primary-black"
                  : "border-transparent hover:border-warm-grey"
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt || `${name} view ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
