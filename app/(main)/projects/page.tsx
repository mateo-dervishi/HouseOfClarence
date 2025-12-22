"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

// Project data
const projects = [
  {
    id: "kensington-residence",
    title: "Kensington",
    subtitle: "Residence",
    location: "London",
    year: "2024",
    category: "Private Residence",
    image: "/bathroom-hero.png",
    slug: "kensington-residence",
  },
  {
    id: "mayfair-penthouse",
    title: "Mayfair",
    subtitle: "Penthouse",
    location: "London",
    year: "2024",
    category: "Luxury Penthouse",
    image: "/kitchen-hero.png",
    slug: "mayfair-penthouse",
  },
  {
    id: "chelsea-townhouse",
    title: "Chelsea",
    subtitle: "Townhouse",
    location: "London",
    year: "2023",
    category: "Georgian Townhouse",
    image: "/furniture-hero.png",
    slug: "chelsea-townhouse",
  },
  {
    id: "notting-hill-mews",
    title: "Notting Hill",
    subtitle: "Mews",
    location: "London",
    year: "2023",
    category: "Mews Conversion",
    image: "/tiling-hero.png",
    slug: "notting-hill-mews",
  },
  {
    id: "belgravia-mansion",
    title: "Belgravia",
    subtitle: "Mansion",
    location: "London",
    year: "2023",
    category: "Historic Mansion",
    image: "/lighting-hero.png",
    slug: "belgravia-mansion",
  },
];

// Staggered text reveal component
function RevealText({ 
  text, 
  isVisible, 
  className,
  delay = 0 
}: { 
  text: string; 
  isVisible: boolean;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      <motion.span
        className="inline-block"
        initial={{ y: "100%" }}
        animate={{ y: isVisible ? "0%" : "100%" }}
        transition={{ 
          duration: 0.8, 
          delay,
          ease: [0.16, 1, 0.3, 1] 
        }}
      >
        {text}
      </motion.span>
    </span>
  );
}

// Individual project section with 3D perspective
function ProjectSection({ 
  project, 
  index,
}: { 
  project: typeof projects[0]; 
  index: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Clip path for dramatic reveal
  const clipProgress = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, 100]);
  
  // 3D perspective transforms
  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [15, 0, 0, -15]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);

  // Track when in center view
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setIsInView(latest > 0.25 && latest < 0.75);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const isEven = index % 2 === 0;

  return (
    <section
      ref={sectionRef}
      className="min-h-[120vh] relative flex items-center justify-center py-20 md:py-32"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        className="w-full max-w-7xl mx-auto px-6 md:px-12"
        style={{ 
          rotateX,
          scale,
          opacity,
          y,
          transformStyle: "preserve-3d",
        }}
      >
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
          
          {/* Image side */}
          <motion.div 
            className={`relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
          >
            {/* Frame decoration */}
            <motion.div
              className="absolute -inset-4 md:-inset-6 border border-primary-black/10 rounded-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.9 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            
            {/* Main image with clip reveal */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <motion.div
                className="absolute inset-0"
                style={{
                  clipPath: clipProgress.get() !== undefined 
                    ? `inset(${clipProgress.get()}% 0 0 0)`
                    : 'inset(100% 0 0 0)',
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={index < 2}
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </motion.div>

              {/* Project number overlay */}
              <motion.div
                className="absolute top-6 right-6 z-10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="text-6xl md:text-7xl font-display font-light text-white/20">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </motion.div>

              {/* View button overlay */}
              <motion.div
                className="absolute bottom-6 left-6 right-6 z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group flex items-center justify-between w-full px-6 py-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <span className="text-[12px] md:text-[13px] tracking-[0.2em] uppercase text-white">
                    View Project
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Content side */}
          <div className={`relative ${isEven ? 'lg:order-2' : 'lg:order-1'} ${isEven ? 'lg:pl-8' : 'lg:pr-8'}`}>
            {/* Category */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-warm-grey">
                <span className="w-8 h-[1px] bg-warm-grey" />
                {project.category}
              </span>
            </motion.div>

            {/* Title */}
            <h2 className="mb-2">
              <RevealText
                text={project.title}
                isVisible={isInView}
                className="text-5xl md:text-6xl lg:text-7xl font-display tracking-[0.02em]"
                delay={0.3}
              />
            </h2>
            <h2 className="mb-8">
              <RevealText
                text={project.subtitle}
                isVisible={isInView}
                className="text-5xl md:text-6xl lg:text-7xl font-display tracking-[0.02em] text-warm-grey"
                delay={0.4}
              />
            </h2>

            {/* Divider */}
            <motion.div
              className="w-full h-[1px] bg-light-grey mb-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isInView ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{ transformOrigin: isEven ? 'left' : 'right' }}
            />

            {/* Details */}
            <motion.div
              className="grid grid-cols-2 gap-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-warm-grey mb-2">Location</p>
                <p className="text-lg font-display">{project.location}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-warm-grey mb-2">Year</p>
                <p className="text-lg font-display">{project.year}</p>
              </div>
            </motion.div>

            {/* Description placeholder */}
            <motion.p
              className="text-warm-grey leading-relaxed mb-8 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              A meticulous restoration and redesign bringing together heritage 
              architecture with contemporary luxury finishing materials.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group inline-flex items-center gap-4"
              >
                <span className="text-[13px] tracking-[0.2em] uppercase font-medium">
                  Explore Project
                </span>
                <span className="w-12 h-12 rounded-full border-2 border-primary-black flex items-center justify-center group-hover:bg-primary-black group-hover:text-white transition-all duration-300">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Background number */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
        style={{ opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 0.03, 0]) }}
      >
        <span className="text-[300px] md:text-[500px] font-display font-light text-primary-black">
          {String(index + 1).padStart(2, '0')}
        </span>
      </motion.div>
    </section>
  );
}

export default function ProjectsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 0.5], [1, 0.9]);
  const heroY = useTransform(heroProgress, [0, 0.5], [0, -50]);

  // Line drawing animation
  const [linesVisible, setLinesVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLinesVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-off-white">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="h-screen relative flex items-center justify-center overflow-hidden"
      >
        {/* Animated lines background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1px] bg-primary-black/5"
              style={{
                top: `${20 + i * 15}%`,
                left: 0,
                right: 0,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: linesVisible ? 1 : 0 }}
              transition={{ duration: 1.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[1px] bg-primary-black/5"
              style={{
                left: `${20 + i * 15}%`,
                top: 0,
                bottom: 0,
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: linesVisible ? 1 : 0 }}
              transition={{ duration: 1.5, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="text-center px-6 relative z-10"
        >
          {/* Small intro text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <motion.span 
              className="h-[1px] bg-primary-black/30"
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ duration: 0.8, delay: 1 }}
            />
            <span className="text-[11px] tracking-[0.4em] uppercase text-warm-grey">
              Selected Works
            </span>
            <motion.span 
              className="h-[1px] bg-primary-black/30"
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ duration: 0.8, delay: 1 }}
            />
          </motion.div>

          {/* Main title with staggered reveal */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl lg:text-9xl font-display tracking-[0.04em]"
            >
              PROJECTS
            </motion.h1>
          </div>

          {/* Year range */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-[13px] tracking-[0.3em] text-warm-grey"
          >
            2023 — 2024
          </motion.p>

          {/* Project count */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-16 flex items-center justify-center gap-8"
          >
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-display mb-2">{projects.length}</p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-warm-grey">Projects</p>
            </div>
            <div className="w-[1px] h-12 bg-primary-black/10" />
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-display mb-2">∞</p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-warm-grey">Possibilities</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll prompt */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-warm-grey">
            Scroll to explore
          </span>
          <motion.div
            className="w-[1px] h-12 bg-primary-black/30"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </motion.div>
      </section>

      {/* Project Sections */}
      {projects.map((project, index) => (
        <ProjectSection
          key={project.id}
          project={project}
          index={index}
        />
      ))}

      {/* Final CTA */}
      <section className="py-32 md:py-48 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #1a1a1a 1px, transparent 0)`,
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[11px] tracking-[0.4em] uppercase text-warm-grey mb-8">
              Your Vision, Realized
            </p>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-[0.04em] mb-8">
              Let&apos;s Create Your
              <br />
              <span className="text-warm-grey">Next Masterpiece</span>
            </h2>

            <p className="text-warm-grey max-w-lg mx-auto mb-12 leading-relaxed">
              From concept to completion, we partner with architects and designers
              to source the world&apos;s finest finishing materials.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary-black text-white text-[13px] tracking-[0.15em] uppercase hover:bg-primary-black/90 transition-all duration-300 rounded-full"
              >
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/bespoke"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-primary-black text-primary-black text-[13px] tracking-[0.15em] uppercase hover:bg-primary-black hover:text-white transition-all duration-300 rounded-full"
              >
                Bespoke Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
