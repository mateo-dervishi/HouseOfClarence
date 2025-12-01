"use client";

import { ProductCard } from "@/components/product/ProductCard";
import { mockProducts } from "@/lib/mockData";
import { navigationData } from "@/lib/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SubcategoryPageProps {
  params: {
    category: string;
    subcategory: string;
  };
}

export default function SubcategoryPage({ params }: SubcategoryPageProps) {
  const router = useRouter();
  const [sortBy, setSortBy] = useState("featured");

  // Find category and subcategory from navigation data
  const category = navigationData.find((cat) => cat.slug === params.category);
  const subcategory = category?.subcategories.find(
    (sub) => sub.slug === params.subcategory
  );

  if (!category || !subcategory) {
    router.push("/404");
    return null;
  }

  // Filter products by category and subcategory
  // For now, filter by category since mock data may not have exact subcategory matches
  const subcategoryProducts = mockProducts.filter(
    (product) =>
      product.category.slug === params.category &&
      (product.subcategory.toLowerCase().includes(params.subcategory.replace(/-/g, " ")) ||
        params.subcategory.includes(product.subcategory.toLowerCase().replace(/ /g, "-")))
  );

  // If no exact matches, show all products from the category
  const displayProducts =
    subcategoryProducts.length > 0
      ? subcategoryProducts
      : mockProducts.filter((p) => p.category.slug === params.category);

  // Sort products
  const sortedProducts = [...displayProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (
          (a.pricing.salePrice || a.pricing.price) -
          (b.pricing.salePrice || b.pricing.price)
        );
      case "price-high":
        return (
          (b.pricing.salePrice || b.pricing.price) -
          (a.pricing.salePrice || a.pricing.price)
        );
      case "newest":
        return b.isNew ? 1 : -1;
      default:
        return 0;
    }
  });

  return (
    <main className="pt-14">
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] bg-[#f5f5f5] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=600&fit=crop"
          alt={subcategory.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl tracking-[0.2em] font-light uppercase">
            {subcategory.name}
          </h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="max-w-[1600px] mx-auto px-6 py-6">
        <ol className="flex items-center gap-2 text-[12px] tracking-[0.05em] text-warm-grey">
          <li>
            <Link href="/" className="hover:text-primary-black transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href={`/${params.category}`}
              className="hover:text-primary-black transition-colors capitalize"
            >
              {category.name}
            </Link>
          </li>
          <li>/</li>
          <li className="text-primary-black capitalize">{subcategory.name}</li>
        </ol>
      </nav>

      {/* Subcategory Types (if available) */}
      {subcategory.types && subcategory.types.length > 0 && (
        <div className="max-w-[1600px] mx-auto px-6 pb-6">
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${params.category}/${params.subcategory}`}
              className="text-[12px] tracking-[0.1em] uppercase px-4 py-2 border border-primary-black bg-primary-black text-white"
            >
              All {subcategory.name}
            </Link>
            {subcategory.types.map((type) => (
              <Link
                key={type.slug}
                href={`/${params.category}/${params.subcategory}/${type.slug}`}
                className="text-[12px] tracking-[0.1em] uppercase px-4 py-2 border border-light-grey hover:border-primary-black transition-colors"
              >
                {type.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Filter Bar */}
      <div className="border-y border-light-grey">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <p className="text-[13px] text-warm-grey">
            {sortedProducts.length}{" "}
            {sortedProducts.length === 1 ? "Product" : "Products"}
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
            <p className="text-warm-grey mb-4">
              No products found in this subcategory.
            </p>
            <Link
              href={`/${params.category}`}
              className="text-[13px] tracking-[0.1em] uppercase underline hover:opacity-60 transition-opacity"
            >
              View all {category.name}
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

