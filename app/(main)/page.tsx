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

// Dramatic split reveal hero
function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Split reveal - top half moves up, bottom moves down
  const topY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-100%"]);
  const bottomY = useTransform(scrollYProgress, [0, 0.6], ["0%", "100%"]);
  
  // Image zoom on scroll
  const imageScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.2]);
  
  // Text reveal - staggered appearance
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);
  
  // Reveal content opacity
  const revealOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const revealScale = useTransform(scrollYProgress, [0.3, 0.6], [0.9, 1]);

  return (
    <section 
      ref={containerRef}
      className="relative bg-black"
      style={{ height: "250vh" }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        
        {/* Split image - TOP HALF */}
        <motion.div 
          className="absolute inset-x-0 top-0 h-1/2 overflow-hidden"
          style={{ y: topY }}
        >
          <motion.div 
            className="absolute inset-0 origin-bottom"
            style={{ scale: imageScale }}
          >
            <Image
              src="/images/sloane-12.webp"
              alt="House of Clarence"
              fill
              className="object-cover object-bottom"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        </motion.div>

        {/* Split image - BOTTOM HALF */}
        <motion.div 
          className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden"
          style={{ y: bottomY }}
        >
          <motion.div 
            className="absolute inset-0 origin-top"
            style={{ scale: imageScale }}
          >
            <Image
              src="/images/sloane-12.webp"
              alt="House of Clarence"
              fill
              className="object-cover object-top"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        </motion.div>

        {/* Center line that splits */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-white/20 z-20" />

        {/* Hero text - fades out as split happens */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-30"
          style={{ opacity: textOpacity, y: textY }}
        >
          <div className="text-center text-white px-6">
            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[11px] md:text-[13px] tracking-[0.4em] uppercase text-white/60 mb-6"
            >
              Luxury Finishing Materials
            </motion.p>
            
            {/* Main title - split lines */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display tracking-[0.1em] md:tracking-[0.15em]"
              >
                HOUSE OF
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display tracking-[0.1em] md:tracking-[0.15em]"
              >
                CLARENCE
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-[12px] md:text-[14px] tracking-[0.2em] text-white/70 mb-10"
            >
              FOR DISCERNING SPACES
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Link
                href="/bathroom"
                className="inline-flex items-center gap-3 px-8 md:px-12 py-4 md:py-5 border border-white/40 text-white text-[11px] md:text-[12px] tracking-[0.2em] uppercase backdrop-blur-sm bg-white/5 hover:bg-white/15 hover:border-white/70 transition-all duration-500 group"
              >
                Explore Collections
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
          style={{ opacity: textOpacity }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
              Scroll to explore
            </span>
            <motion.div
              className="w-6 h-10 border border-white/30 rounded-full flex items-start justify-center p-2"
              animate={{ borderColor: ["rgba(255,255,255,0.3)", "rgba(255,255,255,0.6)", "rgba(255,255,255,0.3)"] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <motion.div
                className="w-1 h-2 bg-white/60 rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Revealed content behind split */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-10 bg-off-white"
          style={{ opacity: revealOpacity, scale: revealScale }}
        >
          <div className="text-center px-6 max-w-4xl">
            <p className="text-[11px] md:text-[13px] tracking-[0.4em] uppercase text-warm-grey mb-6">
              Curated Excellence
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display tracking-[0.1em] text-primary-black mb-6">
              REFINED FINISHING
            </h2>
            <p className="text-warm-grey text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              House of Clarence brings together the finest bathroom, kitchen, and interior 
              finishing materials from around the world. Each piece is selected for its 
              exceptional quality, timeless design, and superior craftsmanship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/bathroom"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-black text-white text-[11px] md:text-[12px] tracking-[0.15em] uppercase hover:bg-charcoal transition-all duration-300"
              >
                Shop Bathroom
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/kitchen"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-primary-black text-primary-black text-[11px] md:text-[12px] tracking-[0.15em] uppercase hover:bg-primary-black hover:text-white transition-all duration-300"
              >
                Shop Kitchen
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


export default function HomePage() {
  return (
    <>
      {/* Hero with Split Reveal */}
      <HeroSection />

      {/* All Categories - Bento Grid Layout */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-off-white">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-[11px] tracking-[0.3em] uppercase text-warm-grey mb-4">Our Categories</p>
            <h2 className="text-2xl md:text-3xl font-display tracking-[0.15em]">EXPLORE BY ROOM</h2>
          </motion.div>

          <div className="space-y-4 md:space-y-6">
            {/* Row 1: Bathroom (large) + Tiling */}
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="md:col-span-2"
              >
                <Link href="/bathroom" className="group block relative aspect-[16/10] md:aspect-[16/9] overflow-hidden rounded-xl">
                  <Image
                    src="/bathroom-hero.png"
                    alt="Luxury Bathroom"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <p className="text-[10px] md:text-[11px] tracking-[0.2em] text-white/70 uppercase mb-2">Explore</p>
                    <h3 className="text-2xl md:text-3xl tracking-[0.1em] text-white font-display mb-3">BATHROOM</h3>
                    <p className="text-white/70 text-sm hidden sm:block mb-4 max-w-md">
                      Freestanding baths, stone basins & premium brassware
                    </p>
                    <span className="text-white text-sm tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                      Shop Now <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="hidden md:block"
              >
                <Link href="/tiling" className="group block relative h-full overflow-hidden rounded-xl">
                  <Image
                    src="/tiling-hero.png"
                    alt="Premium Tiling"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <p className="text-[11px] tracking-[0.2em] text-white/70 uppercase mb-2">Explore</p>
                    <h3 className="text-xl md:text-2xl tracking-[0.1em] text-white font-display mb-3">TILING</h3>
                    <span className="text-white text-sm tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                      Shop Now <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* Row 2: Kitchen + Lighting */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Link href="/kitchen" className="group block relative aspect-[4/5] md:aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src="/kitchen-hero.png"
                    alt="Designer Kitchen"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                    <p className="text-[9px] md:text-[11px] tracking-[0.2em] text-white/70 uppercase mb-1 md:mb-2">Explore</p>
                    <h3 className="text-lg md:text-2xl tracking-[0.1em] text-white font-display mb-2 md:mb-3">KITCHEN</h3>
                    <span className="text-white text-xs md:text-sm tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                      Shop <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Link href="/lighting" className="group block relative aspect-[4/5] md:aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src="/lighting-hero.png"
                    alt="Designer Lighting"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                    <p className="text-[9px] md:text-[11px] tracking-[0.2em] text-white/70 uppercase mb-1 md:mb-2">Explore</p>
                    <h3 className="text-lg md:text-2xl tracking-[0.1em] text-white font-display mb-2 md:mb-3">LIGHTING</h3>
                    <span className="text-white text-xs md:text-sm tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                      Shop <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* Row 3: Furniture (large) + Electrical */}
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="md:col-span-2"
              >
                <Link href="/furniture" className="group block relative aspect-[16/10] md:aspect-[16/9] overflow-hidden rounded-xl">
                  <Image
                    src="/furniture-hero.png"
                    alt="Designer Furniture"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <p className="text-[10px] md:text-[11px] tracking-[0.2em] text-white/70 uppercase mb-2">Explore</p>
                    <h3 className="text-2xl md:text-3xl tracking-[0.1em] text-white font-display mb-3">FURNITURE</h3>
                    <p className="text-white/70 text-sm hidden sm:block mb-4 max-w-md">
                      Living, dining, bedroom & study furniture
                    </p>
                    <span className="text-white text-sm tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                      Shop Now <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Link href="/electrical" className="group block relative aspect-[16/10] md:aspect-auto md:h-full overflow-hidden rounded-xl">
                  <Image
                    src="/electrical-hero.png"
                    alt="Premium Electrical"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <p className="text-[10px] md:text-[11px] tracking-[0.2em] text-white/70 uppercase mb-2">Explore</p>
                    <h3 className="text-xl md:text-2xl tracking-[0.1em] text-white font-display mb-3">ELECTRICAL</h3>
                    <span className="text-white text-sm tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                      Shop Now <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* Mobile only: Tiling card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:hidden"
            >
              <Link href="/tiling" className="group block relative aspect-[2/1] overflow-hidden rounded-xl">
                <Image
                  src="/tiling-hero.png"
                  alt="Premium Tiling"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-[10px] tracking-[0.2em] text-white/70 uppercase mb-1">Explore</p>
                  <h3 className="text-lg tracking-[0.1em] text-white font-display mb-2">TILING</h3>
                  <span className="text-white text-xs tracking-wider flex items-center gap-2">
                    Shop Now <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-primary-black text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-display tracking-[0.2em] mb-4">COLLECTIONS</h2>
            <p className="text-warm-grey max-w-xl mx-auto">
              Thoughtfully curated collections for your personal sanctuary
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={collection.href} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden mb-4 rounded-lg">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                  </div>
                  <h3 className="text-sm md:text-base tracking-[0.1em] uppercase mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-[11px] md:text-[12px] text-warm-grey leading-relaxed hidden sm:block">
                    {collection.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <Image
          src="/marble-elegance.png"
          alt="Our Projects"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[11px] tracking-[0.3em] uppercase mb-6 text-white/60">
              Portfolio
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display tracking-[0.1em] mb-8">
              OUR PROJECTS
            </h2>
            <p className="text-white/70 md:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
              Explore our work across London&apos;s most prestigious addresses
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary-black text-[12px] tracking-[0.2em] uppercase hover:bg-off-white transition-all duration-300 group"
            >
              View Projects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:py-24 px-6 bg-off-white">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl md:text-3xl font-display tracking-[0.2em] mb-4">GET IN TOUCH</h2>
          <p className="text-warm-grey mb-8 max-w-xl mx-auto">
            Our team is available to discuss your project requirements and provide personalised quotes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+442033704057"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-black text-white text-[12px] tracking-[0.15em] uppercase hover:bg-charcoal transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              020 3370 4057
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-primary-black text-primary-black text-[12px] tracking-[0.15em] uppercase hover:bg-primary-black hover:text-white transition-all duration-300 group"
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
