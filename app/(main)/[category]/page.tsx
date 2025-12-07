"use client";

import { ProductCard } from "@/components/product/ProductCard";
import { mockProducts } from "@/lib/mockData";
import { CATEGORIES } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

// Category-specific hero images
const categoryHeroImages: Record<string, string> = {
  bathroom: "/bathroom-hero.png",
  kitchen: "/kitchen-hero.png",
  furniture: "/furniture-hero.png",
  tiling: "/tiling-hero.png",
  lighting: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=1920&h=800&fit=crop",
  electrical: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=800&fit=crop",
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const router = useRouter();
  const [sortBy, setSortBy] = useState("featured");
  
  const category = CATEGORIES.find((cat) => cat.slug === params.category);

  if (!category) {
    router.push("/404");
    return null;
  }
  
  const heroImage = categoryHeroImages[params.category] || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&h=800&fit=crop";

  // Filter products by category
  const categoryProducts = mockProducts.filter(
    (product) => product.category.slug === params.category
  );

  // Sort products
  const sortedProducts = [...categoryProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (a.pricing.salePrice || a.pricing.price) - (b.pricing.salePrice || b.pricing.price);
      case "price-high":
        return (b.pricing.salePrice || b.pricing.price) - (a.pricing.salePrice || a.pricing.price);
      case "newest":
        return b.isNew ? 1 : -1;
      default:
        return 0;
    }
  });

  return (
    <main>
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] bg-black overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={heroImage}
            alt={category.name}
            fill
            className="object-cover object-[center_65%]"
            priority
          />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute inset-0 bg-black/30" 
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="text-white text-3xl md:text-5xl tracking-[0.3em] font-light uppercase"
          >
            {category.name}
          </motion.h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="max-w-[1600px] mx-auto px-6 pt-8 pb-6">
        <ol className="flex items-center gap-2 text-[12px] tracking-[0.05em] text-warm-grey">
          <li>
            <a href="/" className="hover:text-primary-black transition-colors">
              Home
            </a>
          </li>
          <li>/</li>
          <li className="text-primary-black capitalize">{category.name}</li>
        </ol>
      </nav>

      {/* Filter Bar */}
      <div className="border-y border-light-grey">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <p className="text-[13px] text-warm-grey">
            {sortedProducts.length} {sortedProducts.length === 1 ? "Product" : "Products"}
          </p>
          <div className="flex items-center gap-6">
            {/* Sort Dropdown */}
            <div className="relative">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-[13px] bg-transparent border-none cursor-pointer appearance-none pr-6 focus:outline-none"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
              <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <section className="max-w-[1600px] mx-auto px-6 py-12">
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-warm-grey mb-4">No products found in this category.</p>
            <a
              href="/"
              className="text-[13px] tracking-[0.1em] uppercase underline hover:opacity-60 transition-opacity"
            >
              Return to homepage
            </a>
          </div>
        )}
      </section>
    </main>
  );
}
