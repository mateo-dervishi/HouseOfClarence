"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const displayPrice = product.pricing.salePrice || product.pricing.price;
  const displayPriceExVat = product.pricing.salePriceExVat || product.pricing.priceExVat;
  const isOnSale = !!product.pricing.salePrice;

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
          {isOnSale && !product.isNew && (
            <span className="absolute top-4 left-4 bg-white text-[10px] tracking-[0.1em] uppercase px-3 py-1.5">
              SALE
            </span>
          )}
        </div>

        {/* Product Info - Name left, Price right */}
        <div className="space-y-2">
          <div className="flex justify-between items-start gap-4">
            {/* Product Name */}
            <h3 className="text-[12px] tracking-[0.02em] uppercase leading-tight font-medium flex-1">
              {product.name}
            </h3>

            {/* Price */}
            <div className="text-[12px] text-right flex-shrink-0">
              {isOnSale ? (
                <div className="flex items-center gap-1">
                  <span className="text-warm-grey line-through">
                    {formatPrice(product.pricing.price)}
                  </span>
                  <span className="text-primary-black">
                    {formatPrice(displayPrice)}
                  </span>
                </div>
              ) : (
                <span>{formatPrice(displayPrice)}</span>
              )}
              <span className="text-[10px] text-warm-grey">
                ({formatPrice(displayPriceExVat)} EX VAT)
              </span>
            </div>
          </div>

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
