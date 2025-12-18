"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";

// Project data
const projects = [
  {
    id: "kensington-residence",
    title: "Kensington Residence",
    location: "London, UK",
    year: "2024",
    image: "/bathroom-hero.png",
    slug: "kensington-residence",
  },
  {
    id: "mayfair-penthouse",
    title: "Mayfair Penthouse",
    location: "London, UK",
    year: "2024",
    image: "/kitchen-hero.png",
    slug: "mayfair-penthouse",
  },
  {
    id: "chelsea-townhouse",
    title: "Chelsea Townhouse",
    location: "London, UK",
    year: "2023",
    image: "/furniture-hero.png",
    slug: "chelsea-townhouse",
  },
  {
    id: "notting-hill-mews",
    title: "Notting Hill Mews",
    location: "London, UK",
    year: "2023",
    image: "/tiling-hero.png",
    slug: "notting-hill-mews",
  },
  {
    id: "belgravia-mansion",
    title: "Belgravia Mansion",
    location: "London, UK",
    year: "2023",
    image: "/lighting-hero.png",
    slug: "belgravia-mansion",
  },
];

// Project section - JUST the image with framing animation, no content section
function ProjectSection({ project, index }: { project: typeof projects[0]; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Framing effect: image starts full bleed, then gets framed
  const padding = useTransform(scrollYProgress, [0, 0.3, 0.5], ["0px", "0px", "48px"]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 0, 20]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0.9]);
  
  // Title and CTA animations - appear as framing happens
  const titleOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.7, 0.85], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.2, 0.4], [50, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.35, 0.5, 0.7, 0.85], [0, 1, 1, 0]);
  const ctaScale = useTransform(scrollYProgress, [0.35, 0.5], [0.9, 1]);

  return (
    <section 
      ref={containerRef}
      className="relative h-[200vh]"
    >
      {/* Sticky container - full screen */}
      <div className="sticky top-0 h-screen overflow-hidden bg-white">
        {/* Animated padding wrapper for framing effect */}
        <motion.div 
          className="h-full w-full"
          style={{ padding }}
        >
          {/* Image container with scale and border-radius */}
          <motion.div 
            className="relative h-full w-full overflow-hidden"
            style={{ 
              borderRadius,
              scale,
            }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
            />
            
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </motion.div>
        </motion.div>

        {/* Title overlay - animates in as you scroll */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-8 md:p-16 lg:p-20 z-10"
          style={{ 
            opacity: titleOpacity,
            y: titleY,
          }}
        >
          <p className="text-[11px] md:text-[13px] tracking-[0.25em] text-white/60 uppercase mb-3">
            {project.location} · {project.year}
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display tracking-[0.06em] text-white mb-8">
            {project.title}
          </h2>
          
          {/* View Project CTA - animates in with scale */}
          <motion.div
            style={{ 
              opacity: ctaOpacity,
              scale: ctaScale,
            }}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary-black text-[13px] tracking-[0.15em] uppercase hover:bg-off-white hover:scale-105 transition-all duration-300 group"
            >
              View Project
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default function ProjectsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  return (
    <>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="h-screen relative flex flex-col items-center justify-center bg-white overflow-hidden"
      >
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="text-center px-6"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[11px] md:text-[12px] tracking-[0.3em] uppercase mb-6 text-warm-grey"
          >
            Our Portfolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display tracking-[0.15em]"
          >
            FEATURED
            <br />
            PROJECTS
          </motion.h1>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-16 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            className="w-12 h-12 rounded-full border border-primary-black/30 flex items-center justify-center cursor-pointer hover:border-primary-black transition-colors"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown className="w-5 h-5 text-primary-black/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Project Sections - Just images with framing animation */}
      {projects.map((project, index) => (
        <ProjectSection key={project.id} project={project} index={index} />
      ))}

      {/* Contact CTA */}
      <section className="py-24 md:py-32 px-6 bg-primary-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[11px] tracking-[0.3em] text-white/50 uppercase mb-6">
              Start Your Project
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display tracking-[0.15em] mb-8">
              LET&apos;S CREATE
              <br />
              SOMETHING EXCEPTIONAL
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
              Whether you&apos;re an architect, interior designer, or private client, our team
              is ready to bring your vision to life with our curated collection of
              exceptional finishing materials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-primary-black text-[13px] tracking-[0.15em] uppercase hover:bg-off-white transition-all duration-300"
              >
                Start a Conversation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/bespoke"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 border border-white text-white text-[13px] tracking-[0.15em] uppercase hover:bg-white/10 transition-all duration-300"
              >
                Bespoke Service
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
