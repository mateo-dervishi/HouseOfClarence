"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useMotionValue, animate } from "framer-motion";
import { ArrowRight, ArrowDown, Plus } from "lucide-react";

// Project data
const projects = [
  {
    id: "kensington-residence",
    title: "Kensington Residence",
    location: "London, UK",
    year: "2024",
    category: "Private Residence",
    image: "/bathroom-hero.png",
    slug: "kensington-residence",
    accent: "#c9a96e",
  },
  {
    id: "mayfair-penthouse",
    title: "Mayfair Penthouse",
    location: "London, UK",
    year: "2024",
    category: "Penthouse",
    image: "/kitchen-hero.png",
    slug: "mayfair-penthouse",
    accent: "#8b7355",
  },
  {
    id: "chelsea-townhouse",
    title: "Chelsea Townhouse",
    location: "London, UK",
    year: "2023",
    category: "Townhouse",
    image: "/furniture-hero.png",
    slug: "chelsea-townhouse",
    accent: "#6b8e7d",
  },
  {
    id: "notting-hill-mews",
    title: "Notting Hill Mews",
    location: "London, UK",
    year: "2023",
    category: "Mews House",
    image: "/tiling-hero.png",
    slug: "notting-hill-mews",
    accent: "#9e8b7d",
  },
  {
    id: "belgravia-mansion",
    title: "Belgravia Mansion",
    location: "London, UK",
    year: "2023",
    category: "Mansion",
    image: "/lighting-hero.png",
    slug: "belgravia-mansion",
    accent: "#7d8b9e",
  },
];

// Individual project card with parallax layers
function ProjectCard({ 
  project, 
  index, 
  isActive,
  progress 
}: { 
  project: typeof projects[0]; 
  index: number;
  isActive: boolean;
  progress: number;
}) {
  // Parallax offset for depth effect
  const imageOffset = (progress - index) * 50;
  const textOffset = (progress - index) * 80;
  
  return (
    <div 
      className="flex-shrink-0 w-screen h-full flex items-center justify-center px-6 md:px-16 lg:px-24"
    >
      <div className="relative w-full max-w-6xl h-[70vh] md:h-[75vh]">
        {/* Main image with parallax */}
        <motion.div 
          className="absolute inset-0 overflow-hidden rounded-2xl"
          style={{ 
            x: imageOffset,
          }}
        >
          {/* Split reveal mask - top */}
          <motion.div
            className="absolute inset-0 z-10"
            initial={{ clipPath: "inset(0 0 50% 0)" }}
            animate={{ 
              clipPath: isActive ? "inset(0 0 0% 0)" : "inset(0 0 50% 0)",
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index < 2}
            />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
          
          {/* Split reveal mask - bottom */}
          <motion.div
            className="absolute inset-0"
            initial={{ clipPath: "inset(50% 0 0 0)" }}
            animate={{ 
              clipPath: isActive ? "inset(0% 0 0 0)" : "inset(50% 0 0 0)",
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        </motion.div>

        {/* Project number - large background text */}
        <motion.div
          className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 z-0 pointer-events-none"
          style={{ x: textOffset * 0.5 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 0.08 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <span 
            className="text-[180px] md:text-[280px] lg:text-[350px] font-display font-light leading-none"
            style={{ color: project.accent }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </motion.div>

        {/* Text content with deeper parallax */}
        <motion.div 
          className="absolute bottom-8 md:bottom-12 left-8 md:left-12 z-20"
          style={{ x: textOffset }}
        >
          {/* Category tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4"
          >
            <span 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] md:text-[11px] tracking-[0.2em] uppercase"
              style={{ 
                backgroundColor: `${project.accent}20`,
                color: project.accent,
                border: `1px solid ${project.accent}40`
              }}
            >
              {project.category}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 40 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-5xl lg:text-6xl font-display tracking-[0.04em] text-white mb-3"
          >
            {project.title}
          </motion.h2>

          {/* Location & Year */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 0.7 : 0, y: isActive ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-[11px] md:text-[13px] tracking-[0.2em] text-white uppercase"
          >
            {project.location} · {project.year}
          </motion.p>
        </motion.div>

        {/* View project button - bottom right */}
        <motion.div 
          className="absolute bottom-8 md:bottom-12 right-8 md:right-12 z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link
            href={`/projects/${project.slug}`}
            className="group flex items-center gap-4"
          >
            <span className="text-[12px] md:text-[13px] tracking-[0.2em] uppercase text-white/80 group-hover:text-white transition-colors">
              View Project
            </span>
            <span 
              className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
              style={{ backgroundColor: `${project.accent}90` }}
            >
              <Plus className="w-6 h-6 text-white rotate-45 group-hover:rotate-90 transition-transform duration-500" />
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

// Progress indicator dots
function ProgressIndicator({ 
  total, 
  current,
  onSelect
}: { 
  total: number; 
  current: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className="group relative flex items-center justify-end"
        >
          {/* Label on hover */}
          <span className="absolute right-8 opacity-0 group-hover:opacity-100 transition-opacity text-[11px] tracking-[0.15em] text-primary-black/70 whitespace-nowrap">
            {String(i + 1).padStart(2, '0')}
          </span>
          {/* Dot */}
          <motion.div
            className="w-2 h-2 rounded-full transition-all duration-300"
            animate={{
              scale: current === i ? 1.5 : 1,
              backgroundColor: current === i ? "#1a1a1a" : "#d4d4d4",
            }}
          />
        </button>
      ))}
    </div>
  );
}

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Track container dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== 'undefined') {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth progress for animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Calculate horizontal scroll position
  const totalWidth = dimensions.width * projects.length;
  const x = useTransform(
    smoothProgress,
    [0, 1],
    [0, -(totalWidth - dimensions.width)]
  );

  // Track active project based on scroll
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      const newIndex = Math.round(latest * (projects.length - 1));
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < projects.length) {
        setActiveIndex(newIndex);
      }
    });
    return () => unsubscribe();
  }, [smoothProgress, activeIndex]);

  // Navigate to specific project
  const navigateToProject = (index: number) => {
    if (!containerRef.current) return;
    const targetProgress = index / (projects.length - 1);
    const containerHeight = containerRef.current.scrollHeight - window.innerHeight;
    const targetScroll = targetProgress * containerHeight;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  // Current progress as number for parallax calculations
  const [progressValue, setProgressValue] = useState(0);
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      setProgressValue(latest * (projects.length - 1));
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  return (
    <>
      {/* Hero Section */}
      <section className="h-screen relative flex flex-col items-center justify-center bg-off-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #1a1a1a 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center px-6 relative z-10"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[11px] md:text-[12px] tracking-[0.4em] uppercase mb-8 text-warm-grey"
          >
            Portfolio · {projects.length} Projects
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display tracking-[0.08em] mb-6"
          >
            FEATURED
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="w-24 h-[1px] bg-primary-black/20 mx-auto mb-6"
          />
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display tracking-[0.08em]"
          >
            PROJECTS
          </motion.h1>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            className="flex flex-col items-center gap-3 cursor-pointer"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            onClick={() => navigateToProject(0)}
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-primary-black/50">
              Scroll to explore
            </span>
            <ArrowDown className="w-5 h-5 text-primary-black/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* Horizontal Scroll Gallery */}
      <div 
        ref={containerRef}
        className="relative bg-white"
        style={{ height: `${100 * projects.length}vh` }}
      >
        {/* Sticky container */}
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Horizontal scroll track */}
          <motion.div
            ref={galleryRef}
            className="flex h-full"
            style={{ x }}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isActive={activeIndex === index}
                progress={progressValue}
              />
            ))}
          </motion.div>

          {/* Project counter - bottom left */}
          <div className="absolute bottom-8 left-8 md:left-12 z-30 flex items-end gap-2">
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-7xl font-display font-light text-primary-black"
            >
              {String(activeIndex + 1).padStart(2, '0')}
            </motion.span>
            <span className="text-lg text-primary-black/30 mb-3">
              / {String(projects.length).padStart(2, '0')}
            </span>
          </div>

          {/* Progress bar - bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-light-grey/50">
            <motion.div
              className="h-full bg-primary-black"
              style={{ 
                width: `${((activeIndex + 1) / projects.length) * 100}%`,
                transition: 'width 0.5s ease-out'
              }}
            />
          </div>
        </div>

        {/* Progress indicator */}
        <ProgressIndicator 
          total={projects.length} 
          current={activeIndex}
          onSelect={navigateToProject}
        />
      </div>

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
