"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { ChevronRight, Sparkles, Palette, Grid3X3 } from "lucide-react";

interface ProductRecommendationsProps {
  product: Product;
  pairsWellWith: Product[];
  similarStyle: Product[];
  moreFromCollection: Product[];
}

type TabType = "pairs" | "style" | "collection";

export function ProductRecommendations({
  product,
  pairsWellWith,
  similarStyle,
  moreFromCollection,
}: ProductRecommendationsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("pairs");

  // Determine which tabs to show based on available recommendations
  const tabs: { id: TabType; label: string; icon: React.ReactNode; products: Product[] }[] = [];

  if (pairsWellWith.length > 0) {
    tabs.push({
      id: "pairs",
      label: "Pairs Well With",
      icon: <Sparkles className="w-4 h-4" />,
      products: pairsWellWith,
    });
  }

  if (similarStyle.length > 0) {
    tabs.push({
      id: "style",
      label: "Similar Style",
      icon: <Palette className="w-4 h-4" />,
      products: similarStyle,
    });
  }

  if (moreFromCollection.length > 0) {
    tabs.push({
      id: "collection",
      label: `More ${product.subcategory.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}`,
      icon: <Grid3X3 className="w-4 h-4" />,
      products: moreFromCollection,
    });
  }

  // If no tabs available, don't render
  if (tabs.length === 0) return null;

  // Ensure activeTab is valid
  const validActiveTab = tabs.find(t => t.id === activeTab) ? activeTab : tabs[0].id;
  const activeTabData = tabs.find(t => t.id === validActiveTab)!;

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="inline-block text-[10px] tracking-[0.25em] uppercase text-warm-grey mb-3">
            Complete Your Space
          </span>
          <h2 className="text-2xl lg:text-3xl font-light tracking-wide">
            Curated Recommendations
          </h2>
        </motion.div>

        {/* Tabs */}
        {tabs.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-[12px] tracking-[0.08em] uppercase transition-all duration-300 ${
                  validActiveTab === tab.id
                    ? "bg-primary-black text-white"
                    : "bg-off-white text-warm-grey hover:bg-light-grey hover:text-primary-black"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </motion.div>
        )}

        {/* Single Tab Header (when only one type of recommendation) */}
        {tabs.length === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 mb-8 text-[13px] tracking-[0.1em] uppercase text-warm-grey"
          >
            {tabs[0].icon}
            {tabs[0].label}
          </motion.div>
        )}

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={validActiveTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
          >
            {activeTabData.products.map((rec, index) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ProductCard product={rec} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View More Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          {validActiveTab === "collection" ? (
            <Link
              href={`/${product.category.slug}/${product.subcategory}`}
              className="inline-flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase text-primary-black hover:opacity-70 transition-opacity"
            >
              View All {product.subcategory.replace(/-/g, " ")}
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              href={`/${product.category.slug}`}
              className="inline-flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase text-primary-black hover:opacity-70 transition-opacity"
            >
              Explore {product.category.name}
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}

