"use client";

import { ProductCard } from "@/components/product/ProductCard";
import { ProductFilters, FilterState, applyFilters, defaultFilters } from "@/components/product/ProductFilters";
import { mockProducts } from "@/lib/mockData";
import { CATEGORIES } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { ChevronDown, Grid, LayoutGrid } from "lucide-react";
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
  lighting: "/lighting-hero.png",
  electrical: "/electrical-hero.png",
};

// Category-specific image positions (to show the best part of each image)
const categoryImagePositions: Record<string, string> = {
  bathroom: "object-[center_65%]",
  kitchen: "object-[center_65%]",
  furniture: "object-[center_65%]",
  tiling: "object-[center_65%]",
  lighting: "object-[center_25%]", // Show chandelier at top
  electrical: "object-[35%_40%]", // Show wall lights on left
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const router = useRouter();
  const [sortBy, setSortBy] = useState("featured");
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  
  const category = CATEGORIES.find((cat) => cat.slug === params.category);

  if (!category) {
    router.push("/404");
    return null;
  }
  
  const heroImage = categoryHeroImages[params.category] || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&h=800&fit=crop";
  const imagePosition = categoryImagePositions[params.category] || "object-center";

  // Filter products by category
  const categoryProducts = mockProducts.filter(
    (product) => product.category.slug === params.category
  );

  // Apply filters
  const filteredProducts = useMemo(() => {
    return applyFilters(categoryProducts, filters);
  }, [categoryProducts, filters]);

  // Sort products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (a.pricing.salePrice || a.pricing.price) - (b.pricing.salePrice || b.pricing.price);
        case "price-high":
          return (b.pricing.salePrice || b.pricing.price) - (a.pricing.salePrice || a.pricing.price);
        case "newest":
          return b.isNew ? 1 : -1;
        case "name-az":
          return a.name.localeCompare(b.name);
        case "name-za":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  const handleClearFilters = () => {
    setFilters(defaultFilters);
  };

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
            className={`object-cover ${imagePosition}`}
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
          <div className="flex items-center gap-6">
            {/* Mobile Filter Button */}
            <ProductFilters
              products={categoryProducts}
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={handleClearFilters}
            />
            
            <p className="text-[13px] text-warm-grey hidden sm:block">
              {sortedProducts.length} {sortedProducts.length === 1 ? "Product" : "Products"}
              {categoryProducts.length !== sortedProducts.length && (
                <span className="text-primary-black"> (filtered from {categoryProducts.length})</span>
              )}
            </p>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
            {/* Grid Toggle - Desktop only */}
            <div className="hidden md:flex items-center gap-2 border-r border-light-grey pr-4">
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 transition-colors ${gridCols === 3 ? "text-primary-black" : "text-warm-grey hover:text-primary-black"}`}
                title="3 columns"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1.5 transition-colors ${gridCols === 4 ? "text-primary-black" : "text-warm-grey hover:text-primary-black"}`}
                title="4 columns"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
            
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
                <option value="name-az">Name: A to Z</option>
                <option value="name-za">Name: Z to A</option>
              </select>
              <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Tags */}
      {(filters.materials.length > 0 || 
        filters.colours.length > 0 || 
        filters.finishes.length > 0 || 
        filters.priceRange || 
        filters.isNew || 
        filters.isFeatured) && (
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-2">
            {filters.isNew && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-off-white text-[12px] tracking-[0.05em]">
                New Arrivals
                <button onClick={() => setFilters({ ...filters, isNew: false })} className="hover:text-red-500">
                  <span className="sr-only">Remove</span>×
                </button>
              </span>
            )}
            {filters.isFeatured && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-off-white text-[12px] tracking-[0.05em]">
                Featured
                <button onClick={() => setFilters({ ...filters, isFeatured: false })} className="hover:text-red-500">
                  <span className="sr-only">Remove</span>×
                </button>
              </span>
            )}
            {filters.materials.map((material) => (
              <span key={material} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-off-white text-[12px] tracking-[0.05em]">
                {material}
                <button 
                  onClick={() => setFilters({ ...filters, materials: filters.materials.filter(m => m !== material) })}
                  className="hover:text-red-500"
                >
                  <span className="sr-only">Remove</span>×
                </button>
              </span>
            ))}
            {filters.colours.map((colour) => (
              <span key={colour} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-off-white text-[12px] tracking-[0.05em]">
                {colour}
                <button 
                  onClick={() => setFilters({ ...filters, colours: filters.colours.filter(c => c !== colour) })}
                  className="hover:text-red-500"
                >
                  <span className="sr-only">Remove</span>×
                </button>
              </span>
            ))}
            {filters.finishes.map((finish) => (
              <span key={finish} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-off-white text-[12px] tracking-[0.05em]">
                {finish}
                <button 
                  onClick={() => setFilters({ ...filters, finishes: filters.finishes.filter(f => f !== finish) })}
                  className="hover:text-red-500"
                >
                  <span className="sr-only">Remove</span>×
                </button>
              </span>
            ))}
            {filters.priceRange && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-off-white text-[12px] tracking-[0.05em]">
                {filters.priceRange[1] === Infinity 
                  ? `Over £${filters.priceRange[0].toLocaleString()}`
                  : `£${filters.priceRange[0].toLocaleString()} - £${filters.priceRange[1].toLocaleString()}`
                }
                <button onClick={() => setFilters({ ...filters, priceRange: null })} className="hover:text-red-500">
                  <span className="sr-only">Remove</span>×
                </button>
              </span>
            )}
            <button
              onClick={handleClearFilters}
              className="text-[12px] tracking-[0.05em] text-warm-grey hover:text-primary-black underline"
            >
              Clear all
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-6 py-12">
        <div className="flex gap-12">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block">
            <ProductFilters
              products={categoryProducts}
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {sortedProducts.length > 0 ? (
              <div className={`grid grid-cols-2 ${gridCols === 3 ? 'lg:grid-cols-3' : 'md:grid-cols-3 lg:grid-cols-4'} gap-x-6 gap-y-12`}>
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <p className="text-warm-grey mb-4">No products match your filters.</p>
                <button
                  onClick={handleClearFilters}
                  className="text-[13px] tracking-[0.1em] uppercase underline hover:opacity-60 transition-opacity"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
