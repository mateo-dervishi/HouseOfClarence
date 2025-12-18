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
    description: "Freestanding baths, stone basins, and brassware for spaces of quiet luxury",
    image: "/bathroom-hero.png",
    href: "/bathroom",
  },
  {
    id: "kitchen",
    title: "Kitchen",
    description: "Premium sinks, designer taps, and hardware where function meets artistry",
    image: "/kitchen-hero.png",
    href: "/kitchen",
  },
  {
    id: "tiling",
    title: "Surfaces",
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

  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const isReversed = index % 2 === 1;

  return (
    <section ref={ref} className="relative min-h-[90vh] flex items-center py-20 lg:py-0">
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-24 items-center`}>
          {/* Image */}
          <motion.div 
            className={`relative aspect-[4/5] overflow-hidden ${isReversed ? 'lg:order-2' : ''}`}
            style={{ opacity }}
          >
            <motion.div className="absolute inset-0" style={{ y }}>
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div 
            className={`${isReversed ? 'lg:order-1 lg:text-right' : ''}`}
            style={{ opacity }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[10px] tracking-[0.4em] text-warm-grey uppercase mb-8">
                Collection
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-[0.2em] mb-8">
                {category.title.toUpperCase()}
              </h2>
              <p 
                className="text-warm-grey text-base leading-relaxed max-w-md mb-12"
                style={{ marginLeft: isReversed ? 'auto' : 0 }}
              >
                {category.description}
              </p>
              <Link
                href={category.href}
                className={`inline-flex items-center gap-4 text-[11px] tracking-[0.25em] uppercase group ${isReversed ? 'flex-row-reverse' : ''}`}
              >
                <span>Explore</span>
                <span className="w-12 h-[1px] bg-primary-black group-hover:w-20 transition-all duration-500" />
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

  const heroImageScale = useTransform(heroProgress, [0, 1], [1, 1.15]);
  const heroOverlay = useTransform(heroProgress, [0, 1], [0.3, 0.6]);
  const heroTextOpacity = useTransform(heroProgress, [0, 0.4], [1, 0]);
  const heroTextY = useTransform(heroProgress, [0, 0.4], ["0%", "15%"]);

  return (
    <>
      {/* Hero Section - Elegant & Minimal */}
      <section ref={heroRef} className="h-screen relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ scale: heroImageScale }}
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
            transition={{ duration: 2 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="text-4xl md:text-6xl lg:text-8xl font-display tracking-[0.3em] mb-8"
            >
              REFINED FINISHING
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-[12px] md:text-[14px] tracking-[0.35em] text-white/70"
            >
              FOR DISCERNING SPACES
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            <ArrowDown className="w-5 h-5 text-white/40" strokeWidth={1} />
          </motion.div>
        </motion.div>
      </section>

      {/* Essence Statement */}
      <section className="py-40 md:py-56 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="text-warm-grey text-lg md:text-xl leading-[2] tracking-wide">
              House of Clarence brings together the finest bathroom, kitchen, 
              and interior finishing materials from around the world. Each piece 
              is selected for its exceptional quality, timeless design, and 
              commitment to craftsmanship.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Showcases */}
      {categories.map((category, index) => (
        <CategoryShowcase key={category.id} category={category} index={index} />
      ))}

      {/* Projects Section */}
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
            transition={{ duration: 1 }}
            className="text-center"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase mb-8 text-white/50">
              Portfolio
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display tracking-[0.2em] mb-12">
              OUR PROJECTS
            </h2>
            <Link
              href="/projects"
              className="inline-flex items-center gap-4 text-[11px] tracking-[0.25em] uppercase group"
            >
              <span>View All</span>
              <span className="w-12 h-[1px] bg-white group-hover:w-20 transition-all duration-500" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Additional Collections */}
      <section className="py-32 md:py-40 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <p className="text-[10px] tracking-[0.4em] text-warm-grey uppercase mb-6">
              Discover More
            </p>
            <h2 className="text-3xl md:text-4xl font-display tracking-[0.2em]">
              COLLECTIONS
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {[
              { title: "Lighting", image: "/lighting-hero.png", href: "/lighting" },
              { title: "Furniture", image: "/electrical-hero.png", href: "/furniture" },
              { title: "Electrical", image: "/contemporary-kitchen.png", href: "/electrical" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Link href={item.href} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden mb-8">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="text-center text-sm font-display tracking-[0.25em] uppercase">
                    {item.title}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bespoke */}
      <section className="py-32 md:py-40 px-6 bg-primary-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-[4/5] overflow-hidden order-2 lg:order-1"
            >
              <Image
                src="/stone-sanctuary.png"
                alt="Bespoke Service"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <p className="text-[10px] tracking-[0.4em] uppercase mb-8 text-white/50">
                Tailored Excellence
              </p>
              <h2 className="text-4xl md:text-5xl font-display tracking-[0.2em] mb-10">
                BESPOKE
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-12 max-w-md">
                For architects, interior designers, and private clients with 
                unique requirements. Our team works directly with you to source, 
                customize, and deliver materials tailored to your exact specifications.
              </p>
              <Link
                href="/bespoke"
                className="inline-flex items-center gap-4 text-[11px] tracking-[0.25em] uppercase group"
              >
                <span>Learn More</span>
                <span className="w-12 h-[1px] bg-white group-hover:w-20 transition-all duration-500" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-40 md:py-56 px-6 bg-off-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] tracking-[0.4em] text-warm-grey uppercase mb-8">
              Enquiries
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display tracking-[0.2em] mb-12">
              GET IN TOUCH
            </h2>
            <p className="text-warm-grey text-base leading-relaxed mb-16 max-w-lg mx-auto">
              Our team is available to discuss your project requirements 
              and provide personalised guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="tel:+442033704057"
                className="px-12 py-5 bg-primary-black text-white text-[11px] tracking-[0.2em] uppercase hover:bg-charcoal transition-colors duration-300"
              >
                020 3370 4057
              </a>
              <Link
                href="/contact"
                className="px-12 py-5 border border-primary-black text-primary-black text-[11px] tracking-[0.2em] uppercase hover:bg-primary-black hover:text-white transition-all duration-300"
              >
                Send Enquiry
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
