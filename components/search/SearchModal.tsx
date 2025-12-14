"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight, Clock, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mockProducts } from "@/lib/mockData";
import { Product } from "@/types/product";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Recent searches stored in localStorage
const RECENT_SEARCHES_KEY = "hoc-recent-searches";
const MAX_RECENT_SEARCHES = 5;

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (!isOpen) {
      setQuery("");
      setResults([]);
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  // Search function
  const searchProducts = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = searchQuery.toLowerCase();
    
    const filtered = mockProducts.filter((product) => {
      // Search in name
      if (product.name.toLowerCase().includes(lowerQuery)) return true;
      // Search in SKU
      if (product.sku.toLowerCase().includes(lowerQuery)) return true;
      // Search in category
      if (product.category.name.toLowerCase().includes(lowerQuery)) return true;
      // Search in subcategory
      if (product.subcategory.toLowerCase().includes(lowerQuery)) return true;
      // Search in material
      if (product.specifications.material.toLowerCase().includes(lowerQuery)) return true;
      // Search in colour
      if (product.specifications.colour.toLowerCase().includes(lowerQuery)) return true;
      // Search in finish
      if (product.specifications.finish.toLowerCase().includes(lowerQuery)) return true;
      // Search in tags
      if (product.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) return true;
      
      return false;
    });

    // Sort by relevance (name matches first, then others)
    filtered.sort((a, b) => {
      const aNameMatch = a.name.toLowerCase().includes(lowerQuery);
      const bNameMatch = b.name.toLowerCase().includes(lowerQuery);
      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;
      return 0;
    });

    setResults(filtered.slice(0, 8)); // Limit to 8 results
    setSelectedIndex(-1);
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      searchProducts(query);
    }, 150);
    return () => clearTimeout(timer);
  }, [query, searchProducts]);

  // Save recent search
  const saveRecentSearch = (search: string) => {
    const trimmed = search.trim();
    if (!trimmed) return;

    const updated = [trimmed, ...recentSearches.filter(s => s !== trimmed)].slice(0, MAX_RECENT_SEARCHES);
    setRecentSearches(updated);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  };

  // Handle product click
  const handleProductClick = (product: Product) => {
    saveRecentSearch(query);
    onClose();
    router.push(`/product/${product.slug}`);
  };

  // Handle search submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIndex >= 0 && results[selectedIndex]) {
      handleProductClick(results[selectedIndex]);
    } else if (query.trim()) {
      saveRecentSearch(query);
      onClose();
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  // Handle recent search click
  const handleRecentSearchClick = (search: string) => {
    setQuery(search);
    searchProducts(search);
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  // Group results by category
  const groupedResults = results.reduce((acc, product) => {
    const category = product.category.name;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  // Popular searches (static for now)
  const popularSearches = ["Marble", "Brass", "Pendant Light", "Basin", "Oak"];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 z-[70] bg-white shadow-2xl max-h-[85vh] overflow-hidden"
          >
            <div className="max-w-4xl mx-auto">
              {/* Search Input */}
              <form onSubmit={handleSubmit} className="relative">
                <div className="flex items-center border-b border-light-grey">
                  <Search className="w-5 h-5 text-warm-grey ml-6" strokeWidth={1.5} />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search products, materials, colours..."
                    className="flex-1 px-4 py-5 text-lg outline-none placeholder:text-warm-grey/60"
                    autoComplete="off"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="p-2 mr-2 text-warm-grey hover:text-primary-black transition-colors"
                    >
                      <X className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-4 mr-2 text-warm-grey hover:text-primary-black transition-colors"
                  >
                    <span className="text-sm tracking-wide">ESC</span>
                  </button>
                </div>
              </form>

              {/* Results / Suggestions */}
              <div className="overflow-y-auto max-h-[calc(85vh-70px)]">
                {query.trim() ? (
                  // Search Results
                  results.length > 0 ? (
                    <div className="py-4">
                      {Object.entries(groupedResults).map(([category, products]) => (
                        <div key={category} className="mb-6">
                          <h3 className="px-6 text-[11px] tracking-[0.15em] uppercase text-warm-grey mb-3">
                            {category}
                          </h3>
                          <ul>
                            {products.map((product, idx) => {
                              const globalIndex = results.indexOf(product);
                              return (
                                <li key={product.id}>
                                  <button
                                    onClick={() => handleProductClick(product)}
                                    className={`w-full flex items-center gap-4 px-6 py-3 text-left transition-colors ${
                                      selectedIndex === globalIndex
                                        ? "bg-off-white"
                                        : "hover:bg-off-white/50"
                                    }`}
                                  >
                                    {/* Product Image */}
                                    <div className="w-16 h-16 bg-off-white relative overflow-hidden flex-shrink-0">
                                      <Image
                                        src={product.images[0]?.url || "/placeholder.jpg"}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                        sizes="64px"
                                      />
                                    </div>
                                    
                                    {/* Product Info */}
                                    <div className="flex-1 min-w-0">
                                      <p className="text-[14px] tracking-[0.02em] text-primary-black truncate">
                                        {product.name}
                                      </p>
                                      <p className="text-[12px] text-warm-grey mt-0.5">
                                        {product.specifications.colour} · {product.specifications.material}
                                      </p>
                                      <p className="text-[11px] text-warm-grey/70 mt-0.5">
                                        SKU: {product.sku}
                                      </p>
                                    </div>

                                    {/* Arrow */}
                                    <ArrowRight className="w-4 h-4 text-warm-grey flex-shrink-0" strokeWidth={1.5} />
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                      
                      {/* View All Results Link */}
                      {results.length >= 8 && (
                        <div className="px-6 py-4 border-t border-light-grey">
                          <Link
                            href={`/search?q=${encodeURIComponent(query)}`}
                            onClick={() => {
                              saveRecentSearch(query);
                              onClose();
                            }}
                            className="flex items-center justify-center gap-2 text-[13px] tracking-[0.05em] text-primary-black hover:opacity-70 transition-opacity"
                          >
                            View all results
                            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                          </Link>
                        </div>
                      )}
                    </div>
                  ) : (
                    // No Results
                    <div className="py-12 text-center">
                      <p className="text-warm-grey text-[14px]">
                        No results found for &ldquo;{query}&rdquo;
                      </p>
                      <p className="text-warm-grey/70 text-[13px] mt-2">
                        Try searching for a product name, material, or colour
                      </p>
                    </div>
                  )
                ) : (
                  // Default State - Recent & Popular
                  <div className="py-6">
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div className="mb-8">
                        <div className="flex items-center justify-between px-6 mb-3">
                          <h3 className="text-[11px] tracking-[0.15em] uppercase text-warm-grey flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
                            Recent Searches
                          </h3>
                          <button
                            onClick={clearRecentSearches}
                            className="text-[11px] text-warm-grey hover:text-primary-black transition-colors"
                          >
                            Clear
                          </button>
                        </div>
                        <ul className="flex flex-wrap gap-2 px-6">
                          {recentSearches.map((search, idx) => (
                            <li key={idx}>
                              <button
                                onClick={() => handleRecentSearchClick(search)}
                                className="px-4 py-2 text-[13px] bg-off-white hover:bg-light-grey/50 transition-colors"
                              >
                                {search}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Popular Searches */}
                    <div>
                      <h3 className="px-6 text-[11px] tracking-[0.15em] uppercase text-warm-grey flex items-center gap-2 mb-3">
                        <TrendingUp className="w-3.5 h-3.5" strokeWidth={1.5} />
                        Popular Searches
                      </h3>
                      <ul className="flex flex-wrap gap-2 px-6">
                        {popularSearches.map((search, idx) => (
                          <li key={idx}>
                            <button
                              onClick={() => handleRecentSearchClick(search)}
                              className="px-4 py-2 text-[13px] border border-light-grey hover:border-primary-black hover:bg-off-white transition-colors"
                            >
                              {search}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Quick Categories */}
                    <div className="mt-8 px-6">
                      <h3 className="text-[11px] tracking-[0.15em] uppercase text-warm-grey mb-3">
                        Browse Categories
                      </h3>
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                        {["Bathroom", "Kitchen", "Furniture", "Tiling", "Lighting", "Electrical"].map((cat) => (
                          <Link
                            key={cat}
                            href={`/${cat.toLowerCase()}`}
                            onClick={onClose}
                            className="text-center py-3 border border-light-grey hover:border-primary-black hover:bg-off-white transition-colors"
                          >
                            <span className="text-[12px] tracking-[0.1em] uppercase">{cat}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

