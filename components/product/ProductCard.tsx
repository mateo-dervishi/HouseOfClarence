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

  return (
    <article className="group">
      <Link href={`/${product.category.slug}/${product.slug}`}>
        {/* Image Container */}
        <div 
          className="aspect-square overflow-hidden bg-[#f5f5f5] relative mb-4"
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

        {/* Product Info */}
        <div className="text-center space-y-2">
          {/* Color indicator if available */}
          {product.specifications?.colour && (
            <p className="text-[11px] tracking-[0.05em] text-warm-grey">
              Colour: {product.specifications.colour}
            </p>
          )}

          {/* Product Name */}
          <h3 className="text-[13px] tracking-[0.02em] leading-snug group-hover:opacity-70 transition-opacity">
            {product.name}
          </h3>

          {/* Price */}
          <div className="text-[13px]">
            {isOnSale ? (
              <div className="flex items-center justify-center gap-2">
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
            <span className="text-[11px] text-warm-grey ml-1">
              ({formatPrice(displayPriceExVat)} EX VAT)
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
