"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowRight, ArrowDown, ExternalLink } from "lucide-react";

// Project data
const projects = [
  {
    id: "kensington-residence",
    title: "Kensington Residence",
    location: "London, UK",
    year: "2024",
    category: "Private Residence",
    description: "A symphony of marble, brass, and bespoke joinery creating timeless luxury.",
    image: "/bathroom-hero.png",
    slug: "kensington-residence",
  },
  {
    id: "mayfair-penthouse",
    title: "Mayfair Penthouse",
    location: "London, UK",
    year: "2024",
    category: "Penthouse",
    description: "Sky-high elegance with panoramic views and exquisite finishing details.",
    image: "/kitchen-hero.png",
    slug: "mayfair-penthouse",
  },
  {
    id: "chelsea-townhouse",
    title: "Chelsea Townhouse",
    location: "London, UK",
    year: "2023",
    category: "Townhouse",
    description: "Georgian heritage meets contemporary sophistication in this complete restoration.",
    image: "/furniture-hero.png",
    slug: "chelsea-townhouse",
  },
  {
    id: "notting-hill-mews",
    title: "Notting Hill Mews",
    location: "London, UK",
    year: "2023",
    category: "Mews House",
    description: "A hidden gem transformed with artisanal tiles and designer lighting.",
    image: "/tiling-hero.png",
    slug: "notting-hill-mews",
  },
  {
    id: "belgravia-mansion",
    title: "Belgravia Mansion",
    location: "London, UK",
    year: "2023",
    category: "Mansion",
    description: "Grand proportions demand extraordinary materials and meticulous execution.",
    image: "/lighting-hero.png",
    slug: "belgravia-mansion",
  },
];

// Single project card - only rendered when active
function ProjectCard({ 
  project, 
  index,
  totalProjects,
}: { 
  project: typeof projects[0]; 
  index: number;
  totalProjects: number;
}) {
  return (
    <div className="absolute inset-0">
      {/* Background image */}
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />

      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="w-full max-w-7xl mx-auto px-8 md:px-16 pb-20 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            
            {/* Left - Main content */}
            <div>
              {/* Project number */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-7xl md:text-8xl font-display font-extralight text-white/20">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-[11px] tracking-[0.4em] uppercase text-white/50">
                  / {String(totalProjects).padStart(2, '0')}
                </span>
              </div>

              {/* Category */}
              <p className="text-[11px] tracking-[0.35em] uppercase text-amber-200/70 mb-4">
                {project.category}
              </p>

              {/* Title */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-[0.02em] text-white mb-6 leading-[1.1]">
                {project.title}
              </h2>

              {/* Description */}
              <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-md mb-8">
                {project.description}
              </p>

              {/* Meta info */}
              <div className="flex items-center gap-8 text-[12px] tracking-[0.2em] text-white/40 uppercase">
                <span>{project.location}</span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span>{project.year}</span>
              </div>
            </div>

            {/* Right - CTA */}
            <div className="lg:text-right">
              <Link
                href={`/projects/${project.slug}`}
                className="group inline-flex items-center gap-6"
              >
                <span className="text-[13px] md:text-[14px] tracking-[0.25em] uppercase text-white/80 group-hover:text-white transition-colors">
                  View Project
                </span>
                <span className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white/60 transition-colors">
                  <ExternalLink className="w-5 h-5 md:w-6 md:h-6 text-white/70 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track active project - only one at a time
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newIndex = Math.min(
      Math.floor(latest * projects.length),
      projects.length - 1
    );
    if (newIndex !== activeIndex && newIndex >= 0) {
      setActiveIndex(newIndex);
    }
  });

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden bg-black">
        {/* Ambient gradient background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-stone-700/10 rounded-full blur-[120px]" />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        <div className="text-center px-6 relative z-10">
          {/* Top line decoration */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-[1px] h-20 bg-gradient-to-b from-transparent via-white/30 to-white/50 mx-auto mb-12"
            style={{ transformOrigin: 'top' }}
          />

          {/* Intro text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-[11px] tracking-[0.5em] uppercase text-white/40 mb-8"
          >
            House of Clarence Presents
          </motion.p>

          {/* Main title */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl lg:text-[10rem] font-display tracking-[0.08em] text-white font-extralight"
            >
              PROJECTS
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-[13px] tracking-[0.3em] text-white/30 mb-16"
          >
            A CURATED SELECTION OF OUR FINEST WORK
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="flex items-center justify-center gap-12 md:gap-16"
          >
            {[
              { value: projects.length.toString(), label: "Projects" },
              { value: "2023-24", label: "Timeline" },
              { value: "London", label: "Location" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl md:text-3xl font-display text-white/90 mb-1">{stat.value}</p>
                <p className="text-[9px] tracking-[0.3em] uppercase text-white/30">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <motion.div
            className="flex flex-col items-center gap-3 cursor-pointer"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">
              Scroll
            </span>
            <ArrowDown className="w-4 h-4 text-white/30" />
          </motion.div>
        </motion.div>

        {/* Corner decorations */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-white/10" />
        <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-white/10" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-white/10" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-white/10" />
      </section>

      {/* Projects Section - Clean crossfade */}
      <div 
        ref={containerRef}
        className="relative"
        style={{ height: `${100 * (projects.length + 0.5)}vh` }}
      >
        {/* Sticky viewport */}
        <div className="sticky top-0 h-screen overflow-hidden bg-black">
          {/* Only render the active project - instant cut */}
          <ProjectCard
            key={projects[activeIndex].id}
            project={projects[activeIndex]}
            index={activeIndex}
            totalProjects={projects.length}
          />
        </div>

        {/* Progress indicator - side */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
          {projects.map((_, i) => (
            <div key={i} className="relative">
              <div 
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  activeIndex === i ? 'bg-white scale-125' : 'bg-white/20'
                }`}
              />
              {activeIndex === i && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -inset-2 border border-white/30 rounded-full"
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Current project label - bottom */}
        <div className="fixed bottom-8 left-8 z-50 hidden md:block">
          <p className="text-[11px] tracking-[0.3em] uppercase text-white/50">
            {projects[activeIndex]?.category}
          </p>
        </div>
      </div>

      {/* Final CTA */}
      <section className="min-h-screen relative flex items-center justify-center bg-black overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative element */}
            <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/30 mx-auto mb-12" />
            
            <p className="text-[11px] tracking-[0.5em] uppercase text-white/30 mb-8">
              Ready to Begin?
            </p>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-[0.04em] text-white font-extralight mb-6">
              Your Project Awaits
            </h2>

            <p className="text-white/40 max-w-lg mx-auto mb-12 leading-relaxed">
              Let&apos;s discuss how we can transform your space with the world&apos;s 
              finest finishing materials.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 px-12 py-5 bg-white text-black text-[12px] tracking-[0.2em] uppercase hover:bg-white/90 transition-all duration-300"
              >
                Start a Conversation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/bespoke"
                className="inline-flex items-center justify-center gap-3 px-12 py-5 border border-white/20 text-white text-[12px] tracking-[0.2em] uppercase hover:border-white/50 hover:bg-white/5 transition-all duration-300"
              >
                Bespoke Services
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </section>
    </div>
  );
}
