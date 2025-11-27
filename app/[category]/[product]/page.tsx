"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { mockProducts } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { formatPrice, formatPriceWithVat } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import { ProductCard } from "@/components/product/ProductCard";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

interface ProductPageProps {
  params: {
    category: string;
    product: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  const product = mockProducts.find(
    (p) => p.slug === params.product && p.category.slug === params.category
  );

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <h1 className="text-6xl md:text-8xl font-display tracking-widest mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl tracking-widest mb-4">PRODUCT NOT FOUND</h2>
        <p className="text-warm-grey mb-8 max-w-md">
          The product you are looking for does not exist.
        </p>
        <Button onClick={() => router.push("/")}>RETURN TO HOME</Button>
      </div>
    );
  }

  const variant = selectedVariant
    ? product.variants.find((v) => v.id === selectedVariant)
    : null;

  const displayPrice = variant?.salePrice || variant?.price || product.pricing.salePrice || product.pricing.price;
  const displayPriceExVat = variant?.salePriceExVat || variant?.priceExVat || product.pricing.salePriceExVat || product.pricing.priceExVat;
  const isOnSale = !!(variant?.salePrice || product.pricing.salePrice);

  const handleAddToCart = () => {
    addItem(product, variant || undefined, 1);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const relatedProducts = mockProducts
    .filter((p) => p.id !== product.id && p.category.id === product.category.id)
    .slice(0, 4);

  return (
    <main className="pt-20">
      {/* Breadcrumb */}
      <nav className="container mx-auto px-6 py-4">
        <div className="text-xs tracking-widest uppercase text-warm-grey">
          <a href="/" className="hover:text-primary-black transition-colors">
            HOME
          </a>
          <span className="mx-2">/</span>
          <a
            href={`/${product.category.slug}`}
            className="hover:text-primary-black transition-colors"
          >
            {product.category.name.toUpperCase()}
          </a>
          <span className="mx-2">/</span>
          <span>{product.subcategory.toUpperCase()}</span>
        </div>
      </nav>

      {/* Product Content */}
      <div className="container mx-auto px-6 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <div className="sticky top-24">
            {product.images.length > 0 && (
              <>
                <div className="relative aspect-[4/5] overflow-hidden bg-off-white mb-4">
                  <Image
                    src={product.images[selectedImageIndex]?.url || product.images[0].url}
                    alt={product.images[selectedImageIndex]?.alt || product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative aspect-square overflow-hidden border-2 transition-colors ${
                          selectedImageIndex === index
                            ? "border-primary-black"
                            : "border-transparent hover:border-light-grey"
                        }`}
                      >
                        <Image
                          src={image.url}
                          alt={image.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 25vw, 12.5vw"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Product Info */}
          <div className="py-8 lg:py-16">
            <span className="text-xs tracking-widest text-warm-grey">
              {product.category.name.toUpperCase()} / {product.subcategory.toUpperCase()}
            </span>
            <h1 className="text-2xl md:text-3xl tracking-wide mt-4 mb-6 font-light">
              {product.name}
            </h1>

            {/* Price Block */}
            <div className="mt-6 border-t border-b border-light-grey py-4">
              {isOnSale && (
                <p className="text-sm text-warm-grey line-through mb-1">
                  {formatPrice(variant?.price || product.pricing.price)}
                </p>
              )}
              <p className="text-xl md:text-2xl">{formatPrice(displayPrice)}</p>
              <p className="text-sm text-warm-grey mt-1">
                ({formatPrice(displayPriceExVat)} EX VAT)
              </p>
            </div>

            {/* Variants */}
            {product.variants.length > 0 && (
              <div className="mt-8 space-y-6">
                {Object.keys(product.variants[0].attributes).map((attrKey) => (
                  <div key={attrKey}>
                    <label className="text-sm tracking-widest uppercase mb-2 block">
                      {attrKey}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(
                        new Set(product.variants.map((v) => v.attributes[attrKey]))
                      ).map((value) => {
                        const variantForValue = product.variants.find(
                          (v) => v.attributes[attrKey] === value
                        );
                        return (
                          <button
                            key={value}
                            onClick={() => setSelectedVariant(variantForValue?.id || null)}
                            className={`px-4 py-2 border text-sm transition-colors ${
                              selectedVariant === variantForValue?.id
                                ? "border-primary-black bg-primary-black text-white"
                                : "border-light-grey hover:border-primary-black"
                            }`}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add to Cart */}
            <Button
              className="w-full mt-8"
              onClick={handleAddToCart}
              disabled={variant ? variant.stock === 0 : product.stock === 0}
            >
              {variant ? (variant.stock === 0 ? "OUT OF STOCK" : "ADD TO BASKET") : product.stock === 0 ? "OUT OF STOCK" : "ADD TO BASKET"}
            </Button>

            {/* Collapsible Details */}
            <div className="mt-8 space-y-4">
              {/* Description */}
              <div>
                <button
                  onClick={() => toggleSection("description")}
                  className="w-full flex items-center justify-between py-4 border-b border-light-grey text-sm tracking-widest uppercase"
                >
                  DESCRIPTION
                  {expandedSection === "description" ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {expandedSection === "description" && (
                  <div className="py-4 text-warm-grey leading-relaxed">
                    {product.description}
                  </div>
                )}
              </div>

              {/* Specifications */}
              <div>
                <button
                  onClick={() => toggleSection("specifications")}
                  className="w-full flex items-center justify-between py-4 border-b border-light-grey text-sm tracking-widest uppercase"
                >
                  SPECIFICATIONS
                  {expandedSection === "specifications" ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {expandedSection === "specifications" && (
                  <div className="py-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-warm-grey">Material:</span>
                      <span>{product.specifications.material}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-warm-grey">Dimensions:</span>
                      <span>
                        {product.specifications.dimensions.width}mm ×{" "}
                        {product.specifications.dimensions.height}mm ×{" "}
                        {product.specifications.dimensions.depth}mm
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-warm-grey">Colour:</span>
                      <span>{product.specifications.colour}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-warm-grey">Finish:</span>
                      <span>{product.specifications.finish}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Delivery */}
              <div>
                <button
                  onClick={() => toggleSection("delivery")}
                  className="w-full flex items-center justify-between py-4 border-b border-light-grey text-sm tracking-widest uppercase"
                >
                  DELIVERY & RETURNS
                  {expandedSection === "delivery" ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {expandedSection === "delivery" && (
                  <div className="py-4 text-warm-grey leading-relaxed">
                    <p className="mb-2">{product.deliveryInfo}</p>
                    <p>
                      Returns accepted within 30 days of delivery. Items must be in original
                      condition and packaging.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Complete the Look / Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-24 py-16 bg-off-white">
          <div className="container mx-auto px-6">
            <h2 className="text-center tracking-widest text-2xl mb-12">COMPLETE THE LOOK</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

