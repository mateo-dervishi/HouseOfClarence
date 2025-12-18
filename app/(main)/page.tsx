"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Phone } from "lucide-react";

// Collections data
const collections = [
  {
    id: "stone-sanctuary",
    name: "Stone Sanctuary",
    description: "Natural stone baths, basins & vanities for a spa-like retreat",
    image: "/stone-sanctuary.png",
    href: "/bathroom",
  },
  {
    id: "brass-heritage",
    name: "Brass Heritage",
    description: "Timeless brushed brass fixtures & hardware",
    image: "/brass-heritage.png",
    href: "/bathroom/taps",
  },
  {
    id: "marble-elegance",
    name: "Marble Elegance",
    description: "Calacatta, Carrara & rare marble tiles",
    image: "/marble-elegance.png",
    href: "/tiling/marble-tiles",
  },
  {
    id: "contemporary-kitchen",
    name: "Contemporary Kitchen",
    description: "Modern sinks, taps & premium hardware",
    image: "/contemporary-kitchen.png",
    href: "/kitchen",
  },
];

// Hero section with scroll-driven framing animation (like projects page)
function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Framing effect like projects page - smaller padding on mobile
  const paddingX = useTransform(scrollYProgress, [0, 0.4, 0.6], ["0px", "0px", "16px"]);
  const paddingTop = useTransform(scrollYProgress, [0, 0.4, 0.6], ["0px", "0px", "80px"]); // Extra for header
  const paddingBottom = useTransform(scrollYProgress, [0, 0.4, 0.6], ["0px", "0px", "16px"]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.4, 0.6], [0, 0, 24]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6], [1, 1, 0.92]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.3, 0.5]);
  
  // Text animations
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3], ["0%", "15%"]);
  
  // Brand intro text appears as hero shrinks - fully visible when framing completes at 0.6
  const introOpacity = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);
  const introY = useTransform(scrollYProgress, [0.45, 0.6], [40, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative bg-white"
      style={{ height: "250vh" }}
    >
      {/* Sticky hero container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Animated framing wrapper */}
        <motion.div 
          className="h-full w-full"
          style={{ 
            paddingLeft: paddingX, 
            paddingRight: paddingX, 
            paddingTop: paddingTop, 
            paddingBottom: paddingBottom 
          }}
        >
          <motion.div 
            className="relative h-full w-full overflow-hidden"
            style={{ borderRadius, scale }}
          >
            <Image
              src="/images/sloane-12.webp"
              alt="House of Clarence"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <motion.div 
              className="absolute inset-0 bg-black"
              style={{ opacity: overlayOpacity }}
            />
          </motion.div>
        </motion.div>

        {/* Hero text - fades out as you scroll */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{ opacity: textOpacity, y: textY }}
        >
          <div className="text-center text-white px-4 sm:px-6">
            <h1
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] mb-4 sm:mb-6 animate-fade-in-up"
              style={{ animationDelay: '0ms' }}
            >
              REFINED FINISHING
            </h1>
            <p
              className="text-[11px] sm:text-[13px] md:text-[15px] tracking-[0.15em] sm:tracking-[0.2em] text-white/70 mb-6 sm:mb-8 animate-fade-in-up"
              style={{ animationDelay: '200ms' }}
            >
              FOR DISCERNING SPACES
            </p>
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: '400ms' }}
            >
              <Link
                href="/bathroom"
                className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-4 sm:py-5 border border-white/40 text-white text-[11px] sm:text-[12px] tracking-[0.15em] sm:tracking-[0.2em] uppercase backdrop-blur-sm bg-white/5 hover:bg-white/15 hover:border-white/70 transition-all duration-500 group"
              >
                Explore Collections
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Brand intro - appears as hero frames, centered in image */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-10 px-6 sm:px-8"
          style={{ opacity: introOpacity, y: introY }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-display tracking-[0.12em] sm:tracking-[0.2em] md:tracking-[0.25em] text-white mb-3 sm:mb-6">
              CURATED EXCELLENCE
            </h2>
            <p className="text-white/70 text-xs sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              House of Clarence brings together the finest bathroom, kitchen, and interior 
              finishing materials from around the world.
            </p>
          </div>
        </motion.div>

        {/* Scroll indicator - pill/mouse shape */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          style={{ opacity: textOpacity }}
        >
          <div 
            className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2 animate-fade-in-up"
            style={{ animationDelay: '600ms' }}
          >
            <motion.div
              className="w-1 h-2.5 bg-white/70 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}


export default function HomePage() {
  return (
    <>
      {/* Hero with Framing Animation */}
      <HeroSection />

      {/* All Categories - Bento Grid Layout */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-off-white">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          {/* Row 1: Bathroom (wide) + Tiling */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
            {/* Bathroom - spans 2 on mobile, 2 on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="col-span-2 md:col-span-2"
            >
              <Link href="/bathroom" className="group block relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-lg">
                <Image
                  src="/bathroom-hero.png"
                  alt="Luxury Bathroom"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8">
                  <p className="text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] text-white/70 uppercase mb-1 sm:mb-2">Explore</p>
                  <h3 className="text-xl sm:text-2xl md:text-3xl tracking-[0.12em] sm:tracking-[0.15em] text-white font-display mb-2 sm:mb-3">
                    BATHROOM
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm mb-2 sm:mb-4 max-w-sm hidden sm:block">
                    Freestanding baths, stone basins & premium brassware
                  </p>
                  <span className="text-white text-xs sm:text-sm tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                    Shop Bathroom →
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Tiling - full width on mobile, 1 column tall on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="col-span-2 md:col-span-1"
            >
              <Link href="/tiling" className="group block relative aspect-[16/10] sm:aspect-[4/3] md:aspect-auto md:h-full overflow-hidden rounded-lg">
                <Image
                  src="/tiling-hero.png"
                  alt="Premium Tiling"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8">
                  <p className="text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] text-white/70 uppercase mb-1 sm:mb-2">Explore</p>
                  <h3 className="text-xl sm:text-xl md:text-2xl tracking-[0.12em] sm:tracking-[0.15em] text-white font-display mb-2 sm:mb-3">
                    TILING
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm mb-2 sm:mb-4 hidden sm:block">
                    Marble & porcelain tiles
                  </p>
                  <span className="text-white text-xs sm:text-sm tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                    Shop Tiling →
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Row 2: Kitchen + Lighting (equal) */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {/* Kitchen */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Link href="/kitchen" className="group block relative aspect-[4/5] sm:aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src="/kitchen-hero.png"
                  alt="Designer Kitchen"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                  <p className="text-[9px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] text-white/70 uppercase mb-1">Explore</p>
                  <h3 className="text-lg sm:text-2xl md:text-3xl tracking-[0.1em] sm:tracking-[0.15em] text-white font-display mb-2">
                    KITCHEN
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm mb-2 sm:mb-4 max-w-sm hidden sm:block">
                    Premium sinks, designer taps & quality hardware
                  </p>
                  <span className="text-white text-[11px] sm:text-sm tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                    Shop →
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Lighting */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <Link href="/lighting" className="group block relative aspect-[4/5] sm:aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src="/lighting-hero.png"
                  alt="Designer Lighting"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                  <p className="text-[9px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] text-white/70 uppercase mb-1">Explore</p>
                  <h3 className="text-lg sm:text-2xl md:text-3xl tracking-[0.1em] sm:tracking-[0.15em] text-white font-display mb-2">
                    LIGHTING
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm mb-2 sm:mb-4 max-w-sm hidden sm:block">
                    Pendant, wall & statement lighting
                  </p>
                  <span className="text-white text-[11px] sm:text-sm tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                    Shop →
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Row 3: Furniture (wide) + Electrical */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
            {/* Furniture - spans full width on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="col-span-2 md:col-span-2"
            >
              <Link href="/furniture" className="group block relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-lg">
                <Image
                  src="/furniture-hero.png"
                  alt="Designer Furniture"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8">
                  <p className="text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] text-white/70 uppercase mb-1 sm:mb-2">Explore</p>
                  <h3 className="text-xl sm:text-2xl md:text-3xl tracking-[0.12em] sm:tracking-[0.15em] text-white font-display mb-2 sm:mb-3">
                    FURNITURE
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm mb-2 sm:mb-4 max-w-sm hidden sm:block">
                    Living, dining, bedroom & study furniture
                  </p>
                  <span className="text-white text-xs sm:text-sm tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                    Shop Furniture →
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Electrical - full width on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="col-span-2 md:col-span-1"
            >
              <Link href="/electrical" className="group block relative aspect-[16/10] sm:aspect-[4/3] md:aspect-auto md:h-full overflow-hidden rounded-lg">
                <Image
                  src="/electrical-hero.png"
                  alt="Premium Electrical"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8">
                  <p className="text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] text-white/70 uppercase mb-1 sm:mb-2">Explore</p>
                  <h3 className="text-xl sm:text-xl md:text-2xl tracking-[0.12em] sm:tracking-[0.15em] text-white font-display mb-2 sm:mb-3">
                    ELECTRICAL
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm mb-2 sm:mb-4 hidden sm:block">
                    Designer switches & sockets
                  </p>
                  <span className="text-white text-xs sm:text-sm tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                    Shop Electrical →
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collections Section - Dark */}
      <section className="py-14 sm:py-16 md:py-24 px-4 sm:px-6 bg-primary-black text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display tracking-[0.12em] sm:tracking-[0.25em] mb-3 sm:mb-4">COLLECTIONS</h2>
            <p className="text-warm-grey max-w-xl mx-auto text-sm sm:text-base">
              Thoughtfully curated collections for your personal sanctuary
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={collection.href} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden mb-3 sm:mb-4 rounded-lg">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>
                  <h3 className="text-[11px] sm:text-sm md:text-base tracking-[0.08em] sm:tracking-[0.15em] uppercase mb-1 sm:mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-[10px] sm:text-[12px] text-warm-grey leading-relaxed hidden sm:block">
                    {collection.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <p className="text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] text-warm-grey uppercase mb-3 sm:mb-4">About House of Clarence</p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display tracking-[0.1em] sm:tracking-[0.15em] mb-4 sm:mb-6">
              EXCEPTIONAL QUALITY, TIMELESS DESIGN
            </h2>
            <div className="space-y-3 sm:space-y-4 text-warm-grey leading-relaxed text-sm sm:text-base">
              <p>
                House of Clarence was founded with a singular vision: to bring together the finest 
                bathroom, kitchen, and interior finishing materials under one roof.
              </p>
              <p>
                Every product in our collection is carefully selected for its superior materials, 
                expert craftsmanship, and timeless design.
              </p>
            </div>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/about"
                className="inline-block px-6 sm:px-8 py-3 sm:py-4 border border-primary-black text-primary-black text-[11px] sm:text-[12px] tracking-[0.15em] uppercase hover:bg-primary-black hover:text-white transition-all duration-500 text-center"
              >
                Our Story
              </Link>
              <Link
                href="/bespoke"
                className="inline-block px-6 sm:px-8 py-3 sm:py-4 border border-primary-black text-primary-black text-[11px] sm:text-[12px] tracking-[0.15em] uppercase hover:bg-primary-black hover:text-white transition-all duration-500 text-center"
              >
                Bespoke Service
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/3] sm:aspect-[4/5] order-1 lg:order-2 overflow-hidden rounded-lg"
          >
            <Image
              src="/stone-sanctuary.png"
              alt="House of Clarence Craftsmanship"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <Image
            src="/marble-elegance.png"
            alt="Our Projects"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.25em] uppercase mb-4 sm:mb-6 text-white/60">
              Portfolio
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display tracking-[0.1em] sm:tracking-[0.15em] mb-4 sm:mb-8">
              OUR PROJECTS
            </h2>
            <p className="text-white/70 text-sm sm:text-base md:text-lg max-w-lg mx-auto mb-6 sm:mb-10 leading-relaxed px-2">
              Explore our work across London&apos;s most prestigious addresses
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-4 sm:py-5 bg-white text-primary-black text-[11px] sm:text-[12px] tracking-[0.15em] sm:tracking-[0.2em] uppercase hover:bg-off-white transition-all duration-500 group"
            >
              View Projects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-off-white">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display tracking-[0.15em] sm:tracking-[0.25em] mb-3 sm:mb-4">GET IN TOUCH</h2>
          <p className="text-warm-grey mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base px-2">
            Our team is available to discuss your project requirements and provide personalised quotes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="tel:+442033704057"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary-black text-white text-[11px] sm:text-[12px] tracking-[0.15em] uppercase hover:bg-charcoal transition-all duration-500"
            >
              <Phone className="w-4 h-4" />
              020 3370 4057
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border border-primary-black text-primary-black text-[11px] sm:text-[12px] tracking-[0.15em] uppercase hover:bg-primary-black hover:text-white transition-all duration-500 group"
            >
              Send Enquiry
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
