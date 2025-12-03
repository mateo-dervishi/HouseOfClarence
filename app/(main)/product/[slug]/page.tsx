"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { mockProducts } from "@/lib/mockData";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight, Truck, Shield, Phone } from "lucide-react";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const router = useRouter();

  const product = mockProducts.find((p) => p.slug === params.slug);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <h1 className="text-6xl md:text-8xl font-display tracking-widest mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl tracking-widest mb-4">
          PRODUCT NOT FOUND
        </h2>
        <p className="text-warm-grey mb-8 max-w-md">
          The product you are looking for does not exist.
        </p>
        <Button onClick={() => router.push("/")}>RETURN TO HOME</Button>
      </div>
    );
  }

  // Transform product data for ProductInfo component
  const productInfoData = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    sku: product.sku,
    colour: product.specifications.colour,
    image: product.images[0]?.url || "",
    variants: product.variants.map((v) => ({
      slug: v.id,
      colourName: v.attributes.colour || product.specifications.colour,
      colourHex: v.attributes.colourHex || "#C9A962",
    })),
    description: product.description,
    specifications: [
      { label: "Material", value: product.specifications.material },
      {
        label: "Dimensions",
        value: `${product.specifications.dimensions.width}mm × ${product.specifications.dimensions.height}mm × ${product.specifications.dimensions.depth}mm`,
      },
      { label: "Colour", value: product.specifications.colour },
      { label: "Finish", value: product.specifications.finish },
      { label: "Weight", value: `${product.specifications.weight}kg` },
    ],
    category: product.category.slug,
    subcategory: product.subcategory,
    dimensions: {
      width: product.specifications.dimensions.width,
      height: product.specifications.dimensions.height,
      depth: product.specifications.dimensions.depth,
    },
    material: product.specifications.material,
    finish: product.specifications.finish,
  };

  const relatedProducts = mockProducts
    .filter((p) => p.id !== product.id && p.category.id === product.category.id)
    .slice(0, 4);

  return (
    <main className="pt-20">
      {/* Breadcrumb - Premium Style */}
      <motion.nav 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-[1800px] mx-auto px-6 lg:px-12 py-6"
      >
        <ol className="flex items-center gap-2 text-[11px] tracking-[0.1em] text-warm-grey">
          <li>
            <Link href="/" className="hover:text-primary-black transition-colors">
              Home
            </Link>
          </li>
          <li><ChevronRight className="w-3 h-3" /></li>
          <li>
            <Link
              href={`/${product.category.slug}`}
              className="hover:text-primary-black transition-colors capitalize"
            >
              {product.category.name}
            </Link>
          </li>
          <li><ChevronRight className="w-3 h-3" /></li>
          <li>
            <Link
              href={`/${product.category.slug}/${product.subcategory}`}
              className="hover:text-primary-black transition-colors capitalize"
            >
              {product.subcategory.replace(/-/g, " ")}
            </Link>
          </li>
          <li><ChevronRight className="w-3 h-3" /></li>
          <li className="text-primary-black truncate max-w-[200px]">{product.name}</li>
        </ol>
      </motion.nav>

      {/* Main Product Section */}
      <section className="max-w-[1800px] mx-auto px-6 lg:px-12 pb-20">
        <div className="grid lg:grid-cols-[1fr,480px] gap-12 lg:gap-20">
          {/* LEFT: Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ProductGallery 
              images={product.images} 
              name={product.name}
              collection="House of Clarence"
            />
          </motion.div>

          {/* RIGHT: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ProductInfo product={productInfoData} />
          </motion.div>
        </div>
      </section>

      {/* Product Highlights Bar */}
      <section className="border-y border-light-grey bg-[#FAFAFA]">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-light-grey">
            <div className="flex items-center gap-4 py-8 md:pr-8">
              <div className="w-12 h-12 bg-white flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[12px] tracking-[0.1em] uppercase mb-1">UK Delivery</h4>
                <p className="text-[12px] text-warm-grey">White-glove service available</p>
              </div>
            </div>
            <div className="flex items-center gap-4 py-8 md:px-8">
              <div className="w-12 h-12 bg-white flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[12px] tracking-[0.1em] uppercase mb-1">Quality Guaranteed</h4>
                <p className="text-[12px] text-warm-grey">Premium materials & craftsmanship</p>
              </div>
            </div>
            <div className="flex items-center gap-4 py-8 md:pl-8">
              <div className="w-12 h-12 bg-white flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[12px] tracking-[0.1em] uppercase mb-1">Expert Advice</h4>
                <p className="text-[12px] text-warm-grey">Call 020 3370 4057</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Description Section (for SEO and detailed info) */}
      <section className="max-w-[1800px] mx-auto px-6 lg:px-12 py-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[10px] tracking-[0.25em] uppercase text-warm-grey mb-4">
              About This Product
            </span>
            <h2 className="text-2xl lg:text-3xl font-light tracking-wide mb-6">
              {product.name}
            </h2>
            <div className="prose prose-lg text-warm-grey">
              <p className="text-[15px] leading-[1.9]">
                {product.description}
              </p>
              <p className="text-[15px] leading-[1.9] mt-4">
                Part of our carefully curated {product.category.name.toLowerCase()} collection, 
                this piece exemplifies the House of Clarence commitment to refined finishing 
                for discerning spaces. Each product is selected for its exceptional quality, 
                timeless design, and superior craftsmanship.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-light-grey py-20 bg-[#FAFAFA]">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
            >
              <div>
                <span className="inline-block text-[10px] tracking-[0.25em] uppercase text-warm-grey mb-3">
                  Discover More
                </span>
                <h2 className="text-2xl lg:text-3xl font-light tracking-wide">
                  You May Also Like
                </h2>
              </div>
              <Link 
                href={`/${product.category.slug}`}
                className="mt-4 md:mt-0 text-[12px] tracking-[0.1em] uppercase border-b border-primary-black pb-1 hover:text-charcoal hover:border-charcoal transition-colors"
              >
                View All {product.category.name}
              </Link>
            </motion.div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard product={relatedProduct} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-primary-black" />
        <div className="absolute inset-0 opacity-20">
          <Image
            src={product.images[0]?.url || ""}
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-[1800px] mx-auto px-6 lg:px-12 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[10px] tracking-[0.3em] uppercase text-white/60 mb-4">
              Bespoke Service
            </span>
            <h2 className="text-3xl lg:text-4xl font-light tracking-wide mb-6 max-w-2xl mx-auto">
              Need Something Custom?
            </h2>
            <p className="text-[15px] text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
              Our team can help create bespoke solutions tailored to your exact specifications. 
              From custom dimensions to unique finishes, we&apos;re here to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/bespoke"
                className="px-8 py-4 bg-white text-primary-black text-[12px] tracking-[0.15em] uppercase hover:bg-off-white transition-colors"
              >
                Explore Bespoke
              </Link>
              <a
                href="tel:+442033704057"
                className="px-8 py-4 border border-white/30 text-white text-[12px] tracking-[0.15em] uppercase hover:bg-white/10 transition-colors"
              >
                Call Our Team
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
