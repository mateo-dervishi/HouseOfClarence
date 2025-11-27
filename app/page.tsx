"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/lib/constants";
import { featuredProducts } from "@/lib/mockData";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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

export default function HomePage() {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Image moves slower than scroll (parallax)
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  // Overlay gets darker as you scroll
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 0.5]);

  // Text transforms
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="h-screen relative flex items-center justify-center overflow-hidden bg-black">
        {/* Parallax Background Image with Fade-in */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ y: imageY, scale: imageScale }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/images/sloane-12.webp"
            alt="House of Clarence"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>
        
        {/* Dynamic Overlay */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black z-[1]"
        />
        
        {/* Parallax Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-10 text-center text-white px-6"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display tracking-[0.3em] mb-6">
            REFINED FINISHING
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto font-light"
          >
            For discerning spaces
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <Button variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary-black">
              EXPLORE COLLECTIONS
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-3 bg-white rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Brand Statement */}
      <section className="py-32 text-center max-w-3xl mx-auto px-6">
        <motion.h2
          className="text-2xl md:text-3xl tracking-[0.3em] mb-8"
          {...fadeUp}
        >
          REFINED FINISHING FOR DISCERNING SPACES
        </motion.h2>
        <motion.p
          className="text-warm-grey leading-relaxed text-lg"
          {...fadeUp}
        >
          Curated collections of premium bathroom, lighting, and interior finishing materials.
          Each piece is selected for its exceptional quality, timeless design, and commitment to
          craftsmanship. House of Clarence brings together the finest materials from around the
          world to transform your space.
        </motion.p>
      </section>

      {/* Category Grid */}
      <section className="py-24 px-6">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-7xl mx-auto"
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              variants={fadeUp}
              className="group relative aspect-[4/5] overflow-hidden cursor-pointer"
            >
              <Link href={`/${category.slug}`}>
                <div className="relative w-full h-full">
                  <Image
                    src={`https://images.unsplash.com/photo-${1600210492486 + index}?w=800&h=1000&fit=crop`}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-xl md:text-2xl tracking-widest uppercase font-display">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-24 px-6 bg-off-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            {...fadeUp}
          >
            <h2 className="text-2xl md:text-3xl tracking-[0.3em] mb-4">FEATURED PRODUCTS</h2>
            <p className="text-warm-grey max-w-xl mx-auto">
              Discover our handpicked selection of premium finishing materials
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={fadeUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="text-center mt-12"
            {...fadeUp}
          >
            <Button variant="outline" asChild>
              <Link href="/products">
                VIEW ALL PRODUCTS <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Editorial/Lifestyle Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative aspect-[4/5] overflow-hidden"
            {...fadeUp}
          >
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop"
              alt="Craftsmanship"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
          <motion.div className="space-y-6" {...fadeUp}>
            <h2 className="text-2xl md:text-3xl tracking-[0.3em]">CRAFTSMANSHIP & QUALITY</h2>
            <p className="text-warm-grey leading-relaxed">
              At House of Clarence, we believe that exceptional spaces are built on a foundation
              of uncompromising quality. Every product in our collection is carefully selected
              for its superior materials, expert craftsmanship, and timeless design.
            </p>
            <p className="text-warm-grey leading-relaxed">
              We work directly with artisans and manufacturers who share our commitment to
              excellence, ensuring that each piece meets our exacting standards. From natural
              stone sourced from quarries around the world to handcrafted fixtures finished by
              skilled craftspeople, quality is never compromised.
            </p>
            <Button variant="outline" asChild>
              <Link href="/about">
                LEARN MORE <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 px-6 bg-primary-black text-white">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          {...fadeUp}
        >
          <h2 className="text-2xl md:text-3xl tracking-[0.3em] mb-4">STAY INFORMED</h2>
          <p className="text-warm-grey mb-8">
            Subscribe to our newsletter for exclusive offers, new arrivals, and design inspiration
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-charcoal border-charcoal text-white placeholder:text-warm-grey"
              required
            />
            <Button type="submit" className="whitespace-nowrap">
              SUBSCRIBE
            </Button>
          </form>
        </motion.div>
      </section>
    </>
  );
}

