"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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

// Optimized project section
function ProjectSection({ 
  project, 
  index,
  totalProjects,
}: { 
  project: typeof projects[0]; 
  index: number;
  totalProjects: number;
}) {
  return (
    <section className="h-screen relative overflow-hidden snap-start snap-always will-change-scroll">
      {/* Background image - lazy load after first 2 */}
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover"
        sizes="100vw"
        priority={index === 0}
        loading={index === 0 ? "eager" : "lazy"}
        quality={75}
      />

      {/* Single combined overlay for better performance */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" />

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-16 pb-16 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-end">
            
            {/* Left - Main content */}
            <div>
              {/* Project number */}
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <span className="text-5xl md:text-7xl lg:text-8xl font-display font-extralight text-white/20">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-white/50">
                  / {String(totalProjects).padStart(2, '0')}
                </span>
              </div>

              {/* Category */}
              <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-amber-200/70 mb-3 md:mb-4">
                {project.category}
              </p>

              {/* Title */}
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-display tracking-[0.02em] text-white mb-4 md:mb-6 leading-[1.1]">
                {project.title}
              </h2>

              {/* Description - hidden on small mobile */}
              <p className="hidden sm:block text-white/60 text-sm md:text-base lg:text-lg leading-relaxed max-w-md mb-6 md:mb-8">
                {project.description}
              </p>

              {/* Meta info */}
              <div className="flex items-center gap-6 text-[11px] md:text-[12px] tracking-[0.2em] text-white/40 uppercase">
                <span>{project.location}</span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span>{project.year}</span>
              </div>
            </div>

            {/* Right - CTA */}
            <div className="lg:text-right mt-4 lg:mt-0">
              <Link
                href={`/projects/${project.slug}`}
                className="group inline-flex items-center gap-4 md:gap-6"
              >
                <span className="text-[12px] md:text-[14px] tracking-[0.2em] uppercase text-white/80">
                  View Project
                </span>
                <span className="w-12 h-12 md:w-16 lg:w-20 md:h-16 lg:h-20 rounded-full border border-white/30 flex items-center justify-center">
                  <ExternalLink className="w-4 h-4 md:w-5 lg:w-6 md:h-5 lg:h-6 text-white/70" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ProjectsPage() {
  return (
    <div className="bg-black h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
      {/* Hero Section - Simplified for performance */}
      <section className="h-screen relative flex items-center justify-center bg-black snap-start snap-always">
        
        {/* Simplified gradient background - no blur on mobile */}
        <div className="absolute inset-0 hidden md:block">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-stone-700/10 rounded-full blur-[100px]" />
        </div>

        {/* Grid overlay - desktop only */}
        <div className="absolute inset-0 opacity-[0.03] hidden md:block">
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
            className="w-[1px] h-16 md:h-20 bg-gradient-to-b from-transparent via-white/30 to-white/50 mx-auto mb-8 md:mb-12"
            style={{ transformOrigin: 'top' }}
          />

          {/* Intro text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-[10px] md:text-[11px] tracking-[0.4em] md:tracking-[0.5em] uppercase text-white/40 mb-6 md:mb-8"
          >
            House of Clarence Presents
          </motion.p>

          {/* Main title */}
          <div className="overflow-hidden mb-1 md:mb-2">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-3xl lg:text-4xl font-display tracking-[0.12em] md:tracking-[0.15em] text-white/60 font-extralight"
            >
              OUR FEATURED
            </motion.p>
          </div>
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-8xl lg:text-[10rem] font-display tracking-[0.06em] md:tracking-[0.08em] text-white font-extralight"
            >
              PROJECTS
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-[11px] md:text-[13px] tracking-[0.2em] md:tracking-[0.3em] text-white/30 mb-12 md:mb-16"
          >
            A CURATED SELECTION OF OUR FINEST WORK
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="flex items-center justify-center gap-12 md:gap-24"
          >
            <div className="text-center">
              <p className="text-xl md:text-3xl font-display text-white/90 mb-1">14</p>
              <p className="text-[8px] md:text-[9px] tracking-[0.25em] uppercase text-white/30">Projects</p>
            </div>
            <div className="text-center">
              <p className="text-xl md:text-3xl font-display text-white/90 mb-1">2025-26</p>
              <p className="text-[8px] md:text-[9px] tracking-[0.25em] uppercase text-white/30">Timeline</p>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 md:bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <span className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-white/30">
              Scroll
            </span>
            <ArrowDown className="w-4 h-4 text-white/30" />
          </motion.div>
        </motion.div>

        {/* Corner decorations - desktop only */}
        <div className="hidden md:block">
          <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-white/10" />
          <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-white/10" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-white/10" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-white/10" />
        </div>
      </section>

      {/* Project Sections */}
      {projects.map((project, index) => (
        <ProjectSection
          key={project.id}
          project={project}
          index={index}
          totalProjects={projects.length}
        />
      ))}

      {/* Final CTA - Simplified */}
      <section className="h-screen relative flex items-center justify-center bg-black snap-start snap-always">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center relative z-10">
          {/* Decorative element */}
          <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent to-white/30 mx-auto mb-8 md:mb-12" />
          
          <p className="text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-white/30 mb-6 md:mb-8">
            Ready to Begin?
          </p>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display tracking-[0.04em] text-white font-extralight mb-4 md:mb-6">
            Your Project Awaits
          </h2>

          <p className="text-white/40 text-sm md:text-base max-w-lg mx-auto mb-10 md:mb-12 leading-relaxed">
            Let&apos;s discuss how we can transform your space with the world&apos;s 
            finest finishing materials.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 md:px-12 py-4 md:py-5 bg-white text-black text-[11px] md:text-[12px] tracking-[0.15em] uppercase"
            >
              Start a Conversation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/bespoke"
              className="inline-flex items-center justify-center gap-3 px-8 md:px-12 py-4 md:py-5 border border-white/20 text-white text-[11px] md:text-[12px] tracking-[0.15em] uppercase"
            >
              Bespoke Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
