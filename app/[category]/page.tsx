"use client";

import { ProductCard } from "@/components/product/ProductCard";
import { mockProducts } from "@/lib/mockData";
import { CATEGORIES } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const router = useRouter();
  const category = CATEGORIES.find((cat) => cat.slug === params.category);

  if (!category) {
    router.push("/404");
    return null;
  }

  // Filter products by category
  const categoryProducts = mockProducts.filter(
    (product) => product.category.slug === params.category
  );

  return (
    <main className="pt-24">
      {/* Breadcrumb */}
      <nav className="container mx-auto px-6 py-4">
        <div className="text-xs tracking-widest uppercase text-warm-grey">
          <a href="/" className="hover:text-primary-black transition-colors">
            HOME
          </a>
          <span className="mx-2">/</span>
          <span>{category.name.toUpperCase()}</span>
        </div>
      </nav>

      {/* Category Header */}
      <header className="text-center py-16 px-6">
        <motion.h1
          className="text-3xl md:text-4xl tracking-[0.3em] font-light mb-4"
          {...fadeUp}
        >
          {category.name.toUpperCase()}
        </motion.h1>
        {category.description && (
          <motion.p
            className="mt-4 text-warm-grey max-w-xl mx-auto leading-relaxed"
            {...fadeUp}
          >
            {category.description}
          </motion.p>
        )}
      </header>

      {/* Filter Bar - Simplified for now */}
      <aside className="sticky top-16 z-40 border-b border-light-grey bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            <div className="text-sm text-warm-grey">
              {categoryProducts.length} {categoryProducts.length === 1 ? "product" : "products"}
            </div>
            <div className="flex items-center gap-4">
              <select className="text-sm border-0 bg-transparent focus:outline-none cursor-pointer">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>
          </div>
        </div>
      </aside>

      {/* Product Grid */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          {categoryProducts.length > 0 ? (
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
              variants={stagger}
              initial="initial"
              animate="animate"
            >
              {categoryProducts.map((product) => (
                <motion.div key={product.id} variants={fadeUp}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-24">
              <p className="text-warm-grey mb-4">No products found in this category.</p>
              <a href="/" className="text-sm underline hover:text-primary-black transition-colors">
                Return to homepage
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

