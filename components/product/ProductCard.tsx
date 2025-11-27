"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { useSelectionStore } from "@/stores/selectionStore";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const { addItem, isInSelection } = useSelectionStore();
  const isSelected = isInSelection(product.id);

  // Get second image for hover effect if available
  const primaryImage = product.images[0];
  const hoverImage = product.images[1];

  // Get variant colors for swatches
  const variantColors = product.variants
    .filter((v) => v.attributes?.colourHex)
    .map((v) => ({
      name: v.attributes.colour || v.name,
      hex: v.attributes.colourHex as string,
    }));

  const optionsCount = product.variants.length;

  const handleAddToSelection = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: 0, // Price handled separately via quote
      priceExVat: 0,
      image: primaryImage?.url || "",
      colour: product.specifications?.colour,
      category: product.category.slug,
    });
    
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <article className="group">
      <Link href={`/product/${product.slug}`}>
        {/* Image Container */}
        <div 
          className="aspect-[4/5] overflow-hidden bg-[#f5f5f5] relative mb-5"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {primaryImage && !imageError ? (
            <>
              {/* Primary Image */}
              <Image
                src={primaryImage.url}
                alt={primaryImage.alt || product.name}
                fill
                className={`object-cover transition-opacity duration-500 ${
                  isHovered && hoverImage ? "opacity-0" : "opacity-100"
                }`}
                onError={() => setImageError(true)}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              {/* Hover Image */}
              {hoverImage && (
                <Image
                  src={hoverImage.url}
                  alt={hoverImage.alt || `${product.name} - alternate view`}
                  fill
                  className={`object-cover transition-opacity duration-500 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-warm-grey text-sm">Image Coming Soon</span>
            </div>
          )}

          {/* Badge */}
          {product.isNew && (
            <span className="absolute top-4 left-4 bg-white text-[10px] tracking-[0.1em] uppercase px-3 py-1.5">
              NEW
            </span>
          )}

          {/* Quick Add Button - Shows on hover */}
          <button
            onClick={handleAddToSelection}
            className={`absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            } ${
              justAdded
                ? "bg-green-600 text-white"
                : isSelected
                ? "bg-primary-black text-white"
                : "bg-white text-primary-black hover:bg-primary-black hover:text-white"
            }`}
            aria-label="Add to selection"
          >
            {justAdded ? (
              <Check className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          {/* Product Name */}
          <h3 className="text-[12px] tracking-[0.02em] uppercase leading-tight font-medium">
            {product.name}
          </h3>

          {/* Options Count */}
          {optionsCount > 0 && (
            <p className="text-[11px] text-warm-grey">
              {optionsCount} Options
            </p>
          )}

          {/* Color Swatches */}
          {variantColors.length > 0 && (
            <div className="flex gap-1.5 pt-1">
              {variantColors.map((color, index) => (
                <div
                  key={index}
                  className="w-5 h-5 rounded-full border border-light-grey"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
