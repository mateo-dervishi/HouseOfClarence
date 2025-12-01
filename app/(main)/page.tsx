"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { Input } from "@/components/ui/input";
import { mockProducts } from "@/lib/mockData";
import { Phone } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Category hero images - luxury lifestyle shots
const categoryHeroImages = {
  bathroom: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&h=800&fit=crop",
  kitchen: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop",
  furniture: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=800&fit=crop",
  tiling: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop",
  lighting: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&h=800&fit=crop",
  electrical: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop",
};

// Collections data
const collections = [
  {
    id: "stone-sanctuary",
    name: "Stone Sanctuary",
    description: "Natural stone baths, basins & vanities for a spa-like retreat",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=1000&fit=crop",
    href: "/bathroom",
  },
  {
    id: "brass-heritage",
    name: "Brass Heritage",
    description: "Timeless brushed brass fixtures & hardware",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=1000&fit=crop",
    href: "/bathroom/taps",
  },
  {
    id: "marble-elegance",
    name: "Marble Elegance",
    description: "Calacatta, Carrara & rare marble tiles",
    image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&h=1000&fit=crop",
    href: "/tiling/marble-tiles",
  },
  {
    id: "contemporary-kitchen",
    name: "Contemporary Kitchen",
    description: "Modern sinks, taps & premium hardware",
    image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&h=1000&fit=crop",
    href: "/kitchen",
  },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 0.5]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Get products by category for featured sections
  const bathroomProducts = mockProducts.filter(p => p.category.slug === "bathroom").slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="h-screen relative flex items-center justify-center overflow-hidden bg-black">
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
        
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black z-[1]"
        />
        
        <motion.div 
          style={{ opacity: textOpacity as unknown as number }}
          className="relative z-10 text-center text-white px-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
              },
            },
          }}
        >
          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-display tracking-[0.3em] mb-6"
          >
            REFINED FINISHING
          </motion.h1>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto font-light"
          >
            For discerning spaces
          </motion.p>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Link 
              href="/bathroom"
              className="inline-block px-8 py-4 border border-white text-white text-[13px] tracking-[0.15em] uppercase bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:scale-105 transition-all duration-300"
            >
              EXPLORE COLLECTIONS
            </Link>
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

      {/* Brand Introduction */}
      <section className="py-24 md:py-32 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xl md:text-2xl tracking-[0.25em] mb-8 font-display">
            CURATED EXCELLENCE
          </h2>
          <p className="text-warm-grey leading-relaxed text-lg md:text-xl">
            House of Clarence brings together the finest bathroom, kitchen, and interior finishing materials 
            from around the world. Each piece is selected for its exceptional quality, timeless design, 
            and commitment to craftsmanship.
          </p>
        </motion.div>
      </section>

      {/* Main Category Showcase - Bathroom */}
      <section className="relative">
        <div className="grid lg:grid-cols-2 min-h-[80vh]">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-square lg:aspect-auto"
          >
            <Image
              src={categoryHeroImages.bathroom}
              alt="Luxury Bathroom"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          
          {/* Content Side */}
          <div className="bg-off-white flex items-center p-8 md:p-16 lg:p-20">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-lg"
            >
              <p className="text-[11px] tracking-[0.2em] text-warm-grey uppercase mb-4">Explore</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-[0.15em] font-display mb-6">
                BATHROOM
              </h2>
              <p className="text-warm-grey leading-relaxed mb-8">
                Transform your bathroom into a personal sanctuary with our curated collection of 
                freestanding baths, stone basins, vanity units, and premium brassware. From contemporary 
                minimalism to timeless elegance.
              </p>
              <div className="space-y-3 mb-8">
                <Link href="/bathroom/baths" className="block text-sm tracking-wider hover:text-warm-grey transition-colors">
                  Freestanding Baths
                </Link>
                <Link href="/bathroom/basins" className="block text-sm tracking-wider hover:text-warm-grey transition-colors">
                  Stone & Marble Basins
                </Link>
                <Link href="/bathroom/vanity-units" className="block text-sm tracking-wider hover:text-warm-grey transition-colors">
                  Vanity Units
                </Link>
                <Link href="/bathroom/taps" className="block text-sm tracking-wider hover:text-warm-grey transition-colors">
                  Brassware & Taps
                </Link>
              </div>
              <Link 
                href="/bathroom"
                className="inline-block px-8 py-4 border border-primary-black text-primary-black text-[13px] tracking-[0.15em] uppercase hover:bg-primary-black/5 hover:scale-105 transition-all duration-300"
              >
                SHOP BATHROOM
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Bathroom Products */}
      <section className="py-16 px-6 bg-off-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {bathroomProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Kitchen Category - Reverse Layout */}
      <section className="relative">
        <div className="grid lg:grid-cols-2 min-h-[80vh]">
          {/* Content Side */}
          <div className="bg-white flex items-center p-8 md:p-16 lg:p-20 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-lg ml-auto"
            >
              <p className="text-[11px] tracking-[0.2em] text-warm-grey uppercase mb-4">Explore</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-[0.15em] font-display mb-6">
                KITCHEN
              </h2>
              <p className="text-warm-grey leading-relaxed mb-8">
                Elevate your kitchen with premium sinks, designer taps, and quality hardware. 
                From Belfast ceramic sinks to professional boiling water taps, discover pieces 
                that combine functionality with refined aesthetics.
              </p>
              <div className="space-y-3 mb-8">
                <Link href="/kitchen/kitchen-sinks" className="block text-sm tracking-wider hover:text-warm-grey transition-colors">
                  Kitchen Sinks
                </Link>
                <Link href="/kitchen/kitchen-taps" className="block text-sm tracking-wider hover:text-warm-grey transition-colors">
                  Kitchen Taps
                </Link>
                <Link href="/kitchen/kitchen-hardware" className="block text-sm tracking-wider hover:text-warm-grey transition-colors">
                  Cabinet Hardware
                </Link>
              </div>
              <Link 
                href="/kitchen"
                className="inline-block px-8 py-4 border border-primary-black text-primary-black text-[13px] tracking-[0.15em] uppercase hover:bg-primary-black/5 hover:scale-105 transition-all duration-300"
              >
                SHOP KITCHEN
              </Link>
            </motion.div>
          </div>
          
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-square lg:aspect-auto order-1 lg:order-2"
          >
            <Image
              src={categoryHeroImages.kitchen}
              alt="Luxury Kitchen"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-24 px-6 bg-primary-black text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-3xl tracking-[0.25em] mb-4 font-display">COLLECTIONS</h2>
            <p className="text-warm-grey max-w-xl mx-auto">
              Thoughtfully curated collections for your personal sanctuary
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {collections.map((collection) => (
              <motion.div
                key={collection.id}
                variants={fadeUp}
              >
                <Link href={collection.href} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden mb-4">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <h3 className="text-sm md:text-base tracking-[0.15em] uppercase mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-[12px] text-warm-grey leading-relaxed">
                    {collection.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tiling & Lighting Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Tiling */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Link href="/tiling" className="group block relative aspect-[4/3] overflow-hidden">
                <Image
                  src={categoryHeroImages.tiling}
                  alt="Premium Tiling"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-[11px] tracking-[0.2em] text-white/70 uppercase mb-2">Explore</p>
                  <h3 className="text-2xl md:text-3xl tracking-[0.15em] text-white font-display mb-3">
                    TILING
                  </h3>
                  <p className="text-white/80 text-sm mb-4 max-w-sm">
                    Marble, porcelain, terrazzo & mosaic tiles
                  </p>
                  <span className="text-white text-sm tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                    Shop Tiling
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Lighting */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Link href="/lighting" className="group block relative aspect-[4/3] overflow-hidden">
                <Image
                  src={categoryHeroImages.lighting}
                  alt="Designer Lighting"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-[11px] tracking-[0.2em] text-white/70 uppercase mb-2">Explore</p>
                  <h3 className="text-2xl md:text-3xl tracking-[0.15em] text-white font-display mb-3">
                    LIGHTING
                  </h3>
                  <p className="text-white/80 text-sm mb-4 max-w-sm">
                    Pendant, wall & statement lighting
                  </p>
                  <span className="text-white text-sm tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                    Shop Lighting
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Furniture & Electrical Row */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Furniture */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-2"
            >
              <Link href="/furniture" className="group block relative aspect-[16/9] overflow-hidden">
                <Image
                  src={categoryHeroImages.furniture}
                  alt="Designer Furniture"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-[11px] tracking-[0.2em] text-white/70 uppercase mb-2">Explore</p>
                  <h3 className="text-2xl md:text-3xl tracking-[0.15em] text-white font-display mb-3">
                    FURNITURE
                  </h3>
                  <p className="text-white/80 text-sm mb-4 max-w-sm">
                    Living, dining, bedroom & study furniture
                  </p>
                  <span className="text-white text-sm tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                    Shop Furniture
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Electrical */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Link href="/electrical" className="group block relative aspect-[3/4] md:aspect-auto md:h-full overflow-hidden">
                <Image
                  src={categoryHeroImages.electrical}
                  alt="Premium Electrical"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-[11px] tracking-[0.2em] text-white/70 uppercase mb-2">Explore</p>
                  <h3 className="text-xl md:text-2xl tracking-[0.15em] text-white font-display mb-3">
                    ELECTRICAL
                  </h3>
                  <p className="text-white/80 text-sm mb-4">
                    Designer switches & sockets
                  </p>
                  <span className="text-white text-sm tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                    Shop Electrical
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About/Brand Story Section */}
      <section className="py-24 px-6 bg-off-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <p className="text-[11px] tracking-[0.2em] text-warm-grey uppercase mb-4">About House of Clarence</p>
            <h2 className="text-2xl md:text-3xl tracking-[0.15em] font-display mb-6">
              EXCEPTIONAL QUALITY, TIMELESS DESIGN
            </h2>
            <div className="space-y-4 text-warm-grey leading-relaxed">
              <p>
                House of Clarence was founded with a singular vision: to bring together the finest 
                bathroom, kitchen, and interior finishing materials under one roof. We believe that 
                exceptional spaces are built on a foundation of uncompromising quality.
              </p>
              <p>
                Every product in our collection is carefully selected for its superior materials, 
                expert craftsmanship, and timeless design. We work directly with artisans and 
                manufacturers who share our commitment to excellence.
              </p>
              <p>
                From natural stone sourced from quarries around the world to handcrafted fixtures 
                finished by skilled craftspeople, quality is never compromised at House of Clarence.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link 
                href="/about"
                className="inline-block px-8 py-4 border border-primary-black text-primary-black text-[13px] tracking-[0.15em] uppercase hover:bg-primary-black/5 hover:scale-105 transition-all duration-300 text-center"
              >
                OUR STORY
              </Link>
              <Link 
                href="/bespoke"
                className="inline-block px-8 py-4 border border-primary-black text-primary-black text-[13px] tracking-[0.15em] uppercase hover:bg-primary-black/5 hover:scale-105 transition-all duration-300 text-center"
              >
                BESPOKE SERVICE
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] order-1 lg:order-2"
          >
            <Image
              src="https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=1000&fit=crop"
              alt="House of Clarence Craftsmanship"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl tracking-[0.25em] mb-4 font-display">GET IN TOUCH</h2>
            <p className="text-warm-grey mb-8 max-w-xl mx-auto">
              Our team is available to discuss your project requirements and provide personalised quotes. 
              Pricing varies based on quantity and project scope.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+442033704057"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-black text-white text-[13px] tracking-[0.15em] uppercase hover:bg-charcoal hover:scale-105 transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                CALL: 020 3370 4057
              </a>
              <Link 
                href="/contact"
                className="inline-block px-8 py-4 border border-primary-black text-primary-black text-[13px] tracking-[0.15em] uppercase hover:bg-primary-black/5 hover:scale-105 transition-all duration-300 text-center"
              >
                SEND ENQUIRY
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-6 bg-primary-black text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-xl md:text-2xl tracking-[0.25em] mb-4 font-display">EXCLUSIVE INSPIRATION</h2>
          <p className="text-warm-grey mb-8">
            Sign up for design inspiration, expert advice, and the latest product arrivals
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-charcoal border-charcoal text-white placeholder:text-warm-grey focus:border-white"
              required
            />
            <button 
              type="submit" 
              className="px-8 py-3 bg-white text-primary-black text-[13px] tracking-[0.15em] uppercase hover:bg-off-white hover:scale-105 transition-all duration-300"
            >
              SUBSCRIBE
            </button>
          </form>
          <p className="text-[11px] text-warm-grey mt-4">
            By signing up you agree to our <Link href="/privacy-policy" className="underline hover:text-white">privacy policy</Link>
          </p>
        </motion.div>
      </section>
    </>
  );
}
