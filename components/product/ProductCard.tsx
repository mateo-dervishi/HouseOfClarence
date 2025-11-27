"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Product } from "@/types/product";
import { formatPrice, formatPriceWithVat } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);

  const displayPrice = product.pricing.salePrice || product.pricing.price;
  const displayPriceExVat = product.pricing.salePriceExVat || product.pricing.priceExVat;
  const isOnSale = !!product.pricing.salePrice;

  return (
    <motion.article
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/${product.category.slug}/${product.slug}`}>
        <div className="aspect-[4/5] overflow-hidden bg-off-white relative">
          {product.images[0] && !imageError ? (
            <Image
              src={product.images[0].url}
              alt={product.images[0].alt || product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full bg-light-grey flex items-center justify-center">
              <span className="text-warm-grey text-sm">Image Coming Soon</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-primary-black text-white text-xs px-3 py-1 tracking-wider uppercase">
                NEW
              </span>
            )}
            {isOnSale && (
              <span className="bg-accent-gold text-primary-black text-xs px-3 py-1 tracking-wider uppercase">
                SALE
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Add to wishlist"
          >
            <Heart
              className={`h-5 w-5 ${
                isWishlisted ? "fill-primary-black text-primary-black" : "text-primary-black"
              }`}
            />
          </button>
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-sm tracking-wide font-light">{product.name}</h3>
          <div className="mt-1">
            {isOnSale ? (
              <div>
                <span className="text-warm-grey line-through mr-2">
                  {formatPrice(product.pricing.price)}
                </span>
                <span className="text-primary-black">{formatPrice(displayPrice)}</span>
              </div>
            ) : (
              <p className="text-warm-grey">{formatPrice(displayPrice)}</p>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

