"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowDown, Phone } from "lucide-react";

// Featured categories
const categories = [
  {
    id: "bathroom",
    title: "Bathroom",
    tagline: "Personal Sanctuaries",
    description: "Freestanding baths, stone basins, vanity units, and premium brassware for spaces of quiet luxury.",
    image: "/bathroom-hero.png",
    href: "/bathroom",
    links: ["Freestanding Baths", "Stone Basins", "Vanity Units", "Brassware"],
  },
  {
    id: "kitchen",
    title: "Kitchen",
    tagline: "Culinary Excellence",
    description: "Premium sinks, designer taps, and quality hardware where function meets refined artistry.",
    image: "/kitchen-hero.png",
    href: "/kitchen",
    links: ["Kitchen Sinks", "Kitchen Taps", "Cabinet Hardware"],
  },
  {
    id: "tiling",
    title: "Tiling",
    tagline: "Surface Artistry",
    description: "Marble, terrazzo, porcelain and mosaic tiles from the world's finest quarries and manufacturers.",
    image: "/tiling-hero.png",
    href: "/tiling",
    links: ["Marble Tiles", "Porcelain Tiles", "Mosaic Tiles"],
  },
];

// Stagger animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Category section with flowing animations
function CategorySection({ category, index }: { category: typeof categories[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth parallax for image
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1]);
  
  const isReversed = index % 2 === 1;

  return (
    <section ref={ref} className="relative py-20 lg:py-0 lg:min-h-screen flex items-center overflow-hidden">
      <div className="w-full">
        <div className={`grid lg:grid-cols-2 ${isReversed ? '' : ''}`}>
          {/* Image Side */}
          <motion.div 
            className={`relative h-[60vh] lg:h-screen overflow-hidden ${isReversed ? 'lg:order-2' : ''}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2 }}
          >
            <motion.div 
              className="absolute inset-0"
              style={{ y: imageY, scale: imageScale }}
            >
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
            {/* Subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent lg:hidden" />
          </motion.div>

          {/* Content Side */}
          <div className={`flex items-center ${isReversed ? 'lg:order-1' : ''}`}>
            <motion.div
              className="w-full px-8 md:px-16 lg:px-20 py-16 lg:py-0"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.p 
                variants={itemVariants}
                className="text-[11px] tracking-[0.25em] text-warm-grey uppercase mb-4"
              >
                {category.tagline}
              </motion.p>
              
              <motion.h2 
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-display tracking-[0.15em] mb-6"
              >
                {category.title.toUpperCase()}
              </motion.h2>
              
              <motion.p 
                variants={itemVariants}
                className="text-warm-grey leading-relaxed mb-8 max-w-md"
              >
                {category.description}
              </motion.p>

              <motion.div 
                variants={itemVariants}
                className="space-y-2 mb-10"
              >
                {category.links.map((link) => (
                  <Link
                    key={link}
                    href={`${category.href}/${link.toLowerCase().replace(/ /g, '-')}`}
                    className="block text-sm tracking-wide text-primary-black/70 hover:text-primary-black hover:translate-x-2 transition-all duration-300"
                  >
                    {link}
                  </Link>
                ))}
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link
                  href={category.href}
                  className="inline-flex items-center gap-3 px-8 py-4 border border-primary-black text-primary-black text-[12px] tracking-[0.2em] uppercase hover:bg-primary-black hover:text-white transition-all duration-500 group"
                >
                  Explore {category.title}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Smooth hero animations
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOverlay = useTransform(scrollYProgress, [0, 1], [0.3, 0.55]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const heroContentY = useTransform(scrollYProgress, [0, 0.4], ["0%", "20%"]);

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="h-screen relative overflow-hidden">
        {/* Background Image with Parallax */}
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

        {/* Animated Overlay */}
        <motion.div 
          className="absolute inset-0 bg-black"
          style={{ opacity: heroOverlay }}
        />

        {/* Hero Content */}
        <motion.div 
          className="relative z-10 h-full flex flex-col items-center justify-center text-white px-6"
          style={{ opacity: heroContentOpacity, y: heroContentY }}
        >
          <motion.div
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.3, delayChildren: 0.5 },
              },
            }}
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }
                },
              }}
              className="text-4xl md:text-6xl lg:text-7xl font-display tracking-[0.25em] mb-6"
            >
              REFINED FINISHING
            </motion.h1>
            
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] }
                },
              }}
              className="text-[13px] md:text-[15px] tracking-[0.3em] text-white/70 mb-12"
            >
              FOR DISCERNING SPACES
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] }
                },
              }}
            >
              <Link
                href="/bathroom"
                className="inline-flex items-center gap-3 px-10 py-5 border border-white/50 text-white text-[12px] tracking-[0.2em] uppercase backdrop-blur-sm bg-white/5 hover:bg-white/15 hover:border-white transition-all duration-500 group"
              >
                Explore Collections
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase">Scroll</span>
            <ArrowDown className="w-4 h-4 text-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* Brand Introduction */}
      <section className="py-28 md:py-40 px-6 bg-white">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl font-display tracking-[0.2em] mb-10"
          >
            CURATED EXCELLENCE
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-warm-grey text-lg md:text-xl leading-relaxed"
          >
            House of Clarence brings together the finest bathroom, kitchen, and interior 
            finishing materials from around the world. Each piece is selected for its 
            exceptional quality, timeless design, and commitment to craftsmanship.
          </motion.p>
        </motion.div>
      </section>

      {/* Category Sections */}
      {categories.map((category, index) => (
        <CategorySection key={category.id} category={category} index={index} />
      ))}

      {/* Projects Showcase */}
      <section className="relative h-[80vh] overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <Image
            src="/furniture-hero.png"
            alt="Our Projects"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/45" />
        </motion.div>

        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <motion.div
            className="text-center text-white"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p 
              variants={itemVariants}
              className="text-[11px] tracking-[0.25em] uppercase mb-6 text-white/60"
            >
              Portfolio
            </motion.p>
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-display tracking-[0.15em] mb-8"
            >
              OUR PROJECTS
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-white/70 text-lg max-w-lg mx-auto mb-10 leading-relaxed"
            >
              Explore our work across London&apos;s most prestigious addresses
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link
                href="/projects"
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary-black text-[12px] tracking-[0.2em] uppercase hover:bg-off-white transition-all duration-500 group"
              >
                View Projects
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* More Collections Grid */}
      <section className="py-28 md:py-36 px-6 bg-off-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[11px] tracking-[0.25em] text-warm-grey uppercase mb-4">
              Discover More
            </p>
            <h2 className="text-2xl md:text-3xl font-display tracking-[0.2em]">
              ADDITIONAL COLLECTIONS
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Lighting", desc: "Pendant, wall & statement lighting", image: "/lighting-hero.png", href: "/lighting" },
              { title: "Furniture", desc: "Living, dining, bedroom & study", image: "/electrical-hero.png", href: "/furniture" },
              { title: "Electrical", desc: "Designer switches & sockets", image: "/contemporary-kitchen.png", href: "/electrical" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
              >
                <Link href={item.href} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden mb-6">
                    <motion.div
                      className="absolute inset-0"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-500" />
                  </div>
                  <h3 className="text-lg font-display tracking-[0.15em] mb-2">
                    {item.title.toUpperCase()}
                  </h3>
                  <p className="text-warm-grey text-sm">{item.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bespoke Service */}
      <section className="py-28 md:py-36 px-6 bg-primary-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.p 
                variants={itemVariants}
                className="text-[11px] tracking-[0.25em] uppercase mb-6 text-white/50"
              >
                Tailored Service
              </motion.p>
              <motion.h2 
                variants={itemVariants}
                className="text-4xl md:text-5xl font-display tracking-[0.15em] mb-8"
              >
                BESPOKE SOLUTIONS
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg"
              >
                For architects, interior designers, and private clients with unique 
                requirements. Our team works directly with you to source, customize, 
                and deliver materials tailored to your exact specifications.
              </motion.p>
              <motion.div variants={itemVariants}>
                <Link
                  href="/bespoke"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary-black text-[12px] tracking-[0.2em] uppercase hover:bg-off-white transition-all duration-500 group"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative aspect-[4/5] overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
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

      {/* Contact CTA */}
      <section className="py-28 md:py-36 px-6 bg-white">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-display tracking-[0.2em] mb-6"
          >
            GET IN TOUCH
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-warm-grey text-lg mb-12 max-w-xl mx-auto"
          >
            Our team is available to discuss your project requirements and 
            provide personalised guidance.
          </motion.p>
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="tel:+442033704057"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-primary-black text-white text-[12px] tracking-[0.2em] uppercase hover:bg-charcoal transition-all duration-500"
            >
              <Phone className="w-4 h-4" />
              020 3370 4057
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 border border-primary-black text-primary-black text-[12px] tracking-[0.2em] uppercase hover:bg-primary-black hover:text-white transition-all duration-500 group"
            >
              Send Enquiry
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
