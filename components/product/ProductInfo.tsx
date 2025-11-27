"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
import { EnquiryPanel } from "./EnquiryPanel";
import { ProductAccordion } from "./ProductAccordion";

interface Props {
  product: {
    name: string;
    sku: string;
    rating?: number;
    reviewCount?: number;
    colour?: string;
    colourHex?: string;
    variants?: {
      slug: string;
      colourName: string;
      colourHex: string;
    }[];
    description: string;
    specifications?: { label: string; value: string }[];
  };
}

export function ProductInfo({ product }: Props) {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Product Name */}
      <h1 className="text-2xl lg:text-3xl tracking-[0.05em] font-display font-light uppercase">
        {product.name}
      </h1>

      {/* Reviews (optional) */}
      {product.rating && (
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating!)
                    ? "text-primary-black"
                    : "text-light-grey"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          {product.reviewCount && (
            <span className="text-[12px] text-warm-grey">
              {product.reviewCount.toLocaleString()} reviews
            </span>
          )}
        </div>
      )}

      {/* Colour Selector */}
      {product.variants && product.variants.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-[12px] tracking-[0.1em] uppercase text-warm-grey">
              Colour
            </span>
            {product.colour && (
              <span className="text-[12px] tracking-[0.1em] uppercase text-primary-black">
                {product.colour}
              </span>
            )}
          </div>
          <div className="flex gap-3">
            {product.variants.map((variant) => (
              <a
                key={variant.slug}
                href={`/product/${variant.slug}`}
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  variant.colourName === product.colour
                    ? "border-primary-black"
                    : "border-light-grey hover:border-warm-grey"
                }`}
                style={{ backgroundColor: variant.colourHex }}
                title={variant.colourName}
              />
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3 pt-4">
        {/* Call Now */}
        <a
          href="tel:+442033704057"
          className="w-full py-4 border border-primary-black text-primary-black text-[12px] tracking-[0.15em] uppercase font-medium flex items-center justify-center gap-2 hover:bg-off-white transition-colors"
        >
          <Phone className="w-4 h-4" strokeWidth={1.5} />
          Call Now: +44 (0)20 3370 4057
        </a>

        {/* Enquire Button */}
        <button
          onClick={() => setIsEnquiryOpen(true)}
          className="w-full py-4 border border-primary-black text-primary-black text-[12px] tracking-[0.15em] uppercase font-medium hover:bg-off-white transition-colors"
        >
          Enquire
        </button>
      </div>

      {/* Accordion Sections */}
      <div className="pt-6 border-t border-light-grey">
        <ProductAccordion
          description={product.description}
          specifications={product.specifications}
        />
      </div>

      {/* Enquiry Slide-out Panel */}
      <EnquiryPanel
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        productName={product.name}
      />
    </div>
  );
}

