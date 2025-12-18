"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";

// Featured categories with immersive presentation
const categories = [
  {
    id: "bathroom",
    title: "Bathroom",
    subtitle: "Sanctuary",
    description: "Freestanding baths, stone basins, and brassware for spaces of quiet luxury",
    image: "/bathroom-hero.png",
    href: "/bathroom",
  },
  {
    id: "kitchen",
    title: "Kitchen",
    subtitle: "Refinement",
    description: "Premium sinks, designer taps, and hardware where function meets artistry",
    image: "/kitchen-hero.png",
    href: "/kitchen",
  },
  {
    id: "tiling",
    title: "Tiling",
    subtitle: "& Surfaces",
    description: "Marble, terrazzo, and porcelain from the world's finest quarries",
    image: "/tiling-hero.png",
    href: "/tiling",
  },
];

// Category showcase with scroll animation
function CategoryShowcase({ category, index }: { category: typeof categories[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);

  const isReversed = index % 2 === 1;

  return (
    <section ref={ref} className="relative min-h-screen flex items-center py-24 lg:py-0">
      <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isReversed ? '' : ''}`}>
          {/* Image */}
          <motion.div 
            className={`relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden ${isReversed ? 'lg:order-2' : ''}`}
            style={{ opacity, scale }}
          >
            <motion.div className="absolute inset-0" style={{ y }}>
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div 
            className={`${isReversed ? 'lg:order-1 lg:text-right' : ''}`}
            style={{ opacity }}
          >
            <motion.p 
              className="text-[11px] tracking-[0.3em] text-warm-grey uppercase mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Explore Collection
            </motion.p>
            <motion.h2 
              className="text-5xl md:text-6xl lg:text-7xl font-display tracking-[0.02em] mb-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {category.title}
            </motion.h2>
            <motion.span 
              className="block text-5xl md:text-6xl lg:text-7xl font-display tracking-[0.02em] text-warm-grey/40 mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              {category.subtitle}
            </motion.span>
            <motion.p 
              className="text-warm-grey text-lg leading-relaxed max-w-md mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ marginLeft: isReversed ? 'auto' : 0 }}
            >
              {category.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                href={category.href}
                className={`inline-flex items-center gap-3 text-[13px] tracking-[0.2em] uppercase group ${isReversed ? 'flex-row-reverse' : ''}`}
              >
                <span className="relative">
                  Discover
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary-black group-hover:w-full transition-all duration-300" />
                </span>
                <ArrowRight className={`w-4 h-4 transition-transform ${isReversed ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroImageScale = useTransform(heroProgress, [0, 1], [1, 1.1]);
  const heroOverlay = useTransform(heroProgress, [0, 1], [0.35, 0.6]);
  const heroTextOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);
  const heroTextY = useTransform(heroProgress, [0, 0.5], ["0%", "20%"]);

  return (
    <>
      {/* Hero Section - Cinematic */}
      <section ref={heroRef} className="h-screen relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ y: heroImageY, scale: heroImageScale }}
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
          className="absolute inset-0 bg-black"
          style={{ opacity: heroOverlay }}
        />

        <motion.div 
          className="relative z-10 h-full flex flex-col items-center justify-center text-white px-6"
          style={{ opacity: heroTextOpacity, y: heroTextY }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-[11px] md:text-[13px] tracking-[0.4em] uppercase mb-8 text-white/60"
            >
              Established in London
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display tracking-[0.15em] mb-6"
            >
              HOUSE OF
              <br />
              CLARENCE
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="text-[13px] md:text-[15px] tracking-[0.25em] text-white/70 max-w-xl mx-auto"
            >
              REFINED FINISHING FOR DISCERNING SPACES
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
        >
          <motion.div
            className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown className="w-5 h-5 text-white/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Brand Statement */}
      <section className="py-32 md:py-48 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-[11px] tracking-[0.3em] text-warm-grey uppercase mb-12"
          >
            Our Philosophy
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display tracking-[0.08em] leading-[1.3] mb-12"
          >
            WE CURATE THE FINEST
            <br />
            <span className="text-warm-grey/50">MATERIALS FROM AROUND</span>
            <br />
            THE WORLD
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-warm-grey text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            Every piece in our collection is selected for its exceptional quality, 
            timeless design, and commitment to craftsmanship. From Italian marble 
            to British-made brassware, we bring together materials that transform 
            spaces into sanctuaries.
          </motion.p>
        </div>
      </section>

      {/* Category Showcases */}
      {categories.map((category, index) => (
        <CategoryShowcase key={category.id} category={category} index={index} />
      ))}

      {/* Projects Teaser - Full Width */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            src="/furniture-hero.png"
            alt="Our Projects"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-[11px] tracking-[0.3em] uppercase mb-6 text-white/50">
              Portfolio
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display tracking-[0.1em] mb-8">
              FEATURED
              <br />
              PROJECTS
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto mb-12 leading-relaxed">
              Explore our work across London&apos;s most prestigious addresses. 
              From Kensington townhouses to Mayfair penthouses.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary-black text-[13px] tracking-[0.15em] uppercase hover:bg-off-white hover:scale-105 transition-all duration-300 group"
            >
              View Projects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Additional Categories - Minimal Grid */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="text-[11px] tracking-[0.3em] text-warm-grey uppercase mb-6">
              Complete Your Vision
            </p>
            <h2 className="text-3xl md:text-4xl font-display tracking-[0.1em]">
              MORE COLLECTIONS
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Lighting", description: "Pendant, wall & statement pieces", image: "/lighting-hero.png", href: "/lighting" },
              { title: "Furniture", description: "Living, dining & bedroom", image: "/electrical-hero.png", href: "/furniture" },
              { title: "Electrical", description: "Designer switches & sockets", image: "/contemporary-kitchen.png", href: "/electrical" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={item.href} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden mb-6">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>
                  <h3 className="text-xl font-display tracking-[0.1em] mb-2 group-hover:translate-x-2 transition-transform duration-300">
                    {item.title}
                  </h3>
                  <p className="text-warm-grey text-sm">
                    {item.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bespoke Service */}
      <section className="py-32 px-6 bg-primary-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[11px] tracking-[0.3em] uppercase mb-6 text-white/50">
                Tailored Service
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-[0.08em] mb-8 leading-[1.1]">
                BESPOKE
                <br />
                <span className="text-white/40">SOLUTIONS</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
                For architects, interior designers, and private clients with unique requirements. 
                Our team works directly with you to source, customize, and deliver materials 
                tailored to your exact specifications.
              </p>
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-[1px] bg-white/30" />
                  <span className="text-white/70 text-sm tracking-wide">Custom material sourcing</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-[1px] bg-white/30" />
                  <span className="text-white/70 text-sm tracking-wide">Trade & project pricing</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-[1px] bg-white/30" />
                  <span className="text-white/70 text-sm tracking-wide">Dedicated account management</span>
                </div>
              </div>
              <Link
                href="/bespoke"
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary-black text-[13px] tracking-[0.15em] uppercase hover:bg-off-white transition-all duration-300 group"
              >
                Learn More
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-[4/5] overflow-hidden"
            >
              <Image
                src="/stone-sanctuary.png"
                alt="Bespoke Service"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-32 md:py-48 px-6 bg-off-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[11px] tracking-[0.3em] text-warm-grey uppercase mb-6">
              Get in Touch
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-[0.1em] mb-8">
              START YOUR
              <br />
              PROJECT
            </h2>
            <p className="text-warm-grey text-lg max-w-xl mx-auto mb-12 leading-relaxed">
              Our team is ready to discuss your requirements and provide 
              personalised guidance for your space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+442033704057"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary-black text-white text-[13px] tracking-[0.15em] uppercase hover:bg-charcoal transition-all duration-300"
              >
                020 3370 4057
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 border border-primary-black text-primary-black text-[13px] tracking-[0.15em] uppercase hover:bg-primary-black hover:text-white transition-all duration-300 group"
              >
                Send Enquiry
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Brand Statement */}
      <section className="py-20 px-6 bg-white border-t border-light-grey">
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center text-warm-grey text-sm tracking-wide"
          >
            Curating exceptional materials for London&apos;s finest interiors since 2019
          </motion.p>
        </div>
      </section>
    </>
  );
}
