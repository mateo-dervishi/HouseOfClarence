"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";

// Project data
const projects = [
  {
    id: "kensington-residence",
    title: "Kensington Residence",
    location: "London, UK",
    year: "2024",
    description:
      "A complete bathroom and kitchen renovation for a Georgian townhouse in Kensington. The project featured custom Italian marble throughout, bespoke brass fixtures, and handcrafted vanity units designed to complement the property's period features.",
    secondaryText:
      "Working closely with the client's architect, we sourced rare Calacatta Viola marble from Italy, paired with aged brass fixtures from our heritage collection. Every detail was considered to create a harmonious blend of contemporary luxury and Georgian elegance.",
    image: "/bathroom-hero.png",
    href: "/projects/kensington-residence",
  },
  {
    id: "mayfair-penthouse",
    title: "Mayfair Penthouse",
    location: "London, UK",
    year: "2024",
    description:
      "An opulent penthouse renovation featuring our exclusive Stone Sanctuary collection. Floor-to-ceiling Calacatta marble, freestanding natural stone baths, and designer lighting create an atmosphere of refined luxury throughout.",
    secondaryText:
      "The master bathroom features a sculptural freestanding bath carved from a single block of Carrara marble, positioned to capture the panoramic views of Hyde Park. Underfloor heating throughout ensures comfort meets aesthetics.",
    image: "/kitchen-hero.png",
    href: "/projects/mayfair-penthouse",
  },
  {
    id: "chelsea-townhouse",
    title: "Chelsea Townhouse",
    location: "London, UK",
    year: "2023",
    description:
      "A comprehensive interior finishing project spanning five floors. We supplied all bathroom fixtures, kitchen hardware, lighting, and electrical finishes, creating a cohesive design language throughout this stunning Chelsea property.",
    secondaryText:
      "From the basement cinema room to the rooftop terrace, every space received the same meticulous attention. Custom bronze hardware, hand-finished plaster walls, and our signature brushed brass electrical fittings unite the entire property.",
    image: "/furniture-hero.png",
    href: "/projects/chelsea-townhouse",
  },
  {
    id: "notting-hill-mews",
    title: "Notting Hill Mews",
    location: "London, UK",
    year: "2023",
    description:
      "Working with leading architects, we provided all finishing materials for this exclusive mews development. Contemporary bathroom design meets timeless quality, with each unit featuring unique material selections.",
    secondaryText:
      "Four distinct residences, each with its own material palette yet unified by exceptional quality. Terrazzo flooring, fluted glass partitions, and our curated collection of minimalist sanitaryware define these exceptional homes.",
    image: "/tiling-hero.png",
    href: "/projects/notting-hill-mews",
  },
  {
    id: "belgravia-mansion",
    title: "Belgravia Mansion",
    location: "London, UK",
    year: "2023",
    description:
      "A sensitive restoration project that required sourcing authentic period-appropriate materials while incorporating modern luxuries. Our brass heritage collection was central to maintaining the property's historical character.",
    secondaryText:
      "Listed building constraints demanded creative solutions. We collaborated with heritage consultants to source reclaimed marble and commissioned bespoke reproductions of Victorian-era fixtures, seamlessly blending old and new.",
    image: "/lighting-hero.png",
    href: "/projects/belgravia-mansion",
  },
];

// Helper to use motion values in style
function useMotionStyle(value: MotionValue<string>) {
  return value;
}

// Project section with scroll-driven framing effect
function ProjectSection({ project, index }: { project: typeof projects[0]; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // The framing effect: image shrinks and gets padding as you scroll
  const padding = useTransform(scrollYProgress, [0, 0.4], ["0px", "40px"]);
  const paddingMobile = useTransform(scrollYProgress, [0, 0.4], ["0px", "20px"]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.4], [0, 16]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.92]);
  
  // Title animations
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.5], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [40, 0]);

  // Split title for content section
  const titleWords = project.title.split(" ");
  const firstLine = titleWords[0];
  const secondLine = titleWords.slice(1).join(" ");

  return (
    <section 
      ref={containerRef}
      className="relative"
      style={{ minHeight: "250vh" }}
    >
      {/* Sticky image container */}
      <div className="sticky top-0 h-screen overflow-hidden bg-white">
        {/* Animated padding wrapper */}
        <motion.div 
          className="h-full w-full"
          style={{ 
            padding: typeof window !== 'undefined' && window.innerWidth < 768 ? paddingMobile : padding 
          }}
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          </motion.div>
        </motion.div>

        {/* Title overlay - fades in and out */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16 z-10 pointer-events-none"
          style={{ 
            opacity: titleOpacity,
            y: titleY,
          }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display tracking-[0.08em] text-white mb-4">
            {project.title}
          </h2>
          <Link
            href={project.href}
            className="inline-flex items-center gap-2 text-white/80 text-sm tracking-[0.15em] uppercase hover:text-white transition-colors group pointer-events-auto"
          >
            View Project
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* Content section - scrolls up over the sticky image */}
      <div className="relative z-10 bg-white -mt-[50vh]">
        <div className="py-16 md:py-24 px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Left column - Large Title */}
              <div>
                <p className="text-[11px] tracking-[0.2em] text-warm-grey uppercase mb-6">
                  {project.year} · {project.location}
                </p>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-[0.05em] leading-[1.1]">
                  {firstLine}
                  <br />
                  {secondLine}
                </h3>
              </div>

              {/* Right column - Two columns of text */}
              <div className="lg:pt-12">
                <div className="grid md:grid-cols-2 gap-8">
                  <p className="text-warm-grey leading-relaxed text-[15px]">
                    {project.description}
                  </p>
                  <p className="text-warm-grey leading-relaxed text-[15px]">
                    {project.secondaryText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ProjectsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="h-screen relative flex flex-col items-center justify-center bg-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center px-6"
        >
          <p className="text-[11px] md:text-[12px] tracking-[0.3em] uppercase mb-6 text-warm-grey">
            Our Portfolio
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display tracking-[0.15em]">
            FEATURED
            <br />
            PROJECTS
          </h1>
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

      {/* Project Sections */}
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
