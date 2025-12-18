"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";

// Project data - you can later move this to a CMS or database
const projects = [
  {
    id: "kensington-residence",
    title: "Kensington Residence",
    subtitle: "Private Home",
    location: "London, UK",
    year: "2024",
    description:
      "A complete bathroom and kitchen renovation for a Georgian townhouse in Kensington. The project featured custom Italian marble throughout, bespoke brass fixtures, and handcrafted vanity units designed to complement the property's period features.",
    scope: ["Bathroom Design", "Kitchen Fixtures", "Bespoke Vanities", "Marble Installation"],
    image: "/bathroom-hero.png",
    href: "/projects/kensington-residence",
  },
  {
    id: "mayfair-penthouse",
    title: "Mayfair Penthouse",
    subtitle: "Luxury Apartment",
    location: "London, UK",
    year: "2024",
    description:
      "An opulent penthouse renovation featuring our exclusive Stone Sanctuary collection. Floor-to-ceiling Calacatta marble, freestanding natural stone baths, and designer lighting create an atmosphere of refined luxury throughout.",
    scope: ["Stone Sanctuary Collection", "Designer Lighting", "Premium Tiling", "Electrical Finishes"],
    image: "/kitchen-hero.png",
    href: "/projects/mayfair-penthouse",
  },
  {
    id: "chelsea-townhouse",
    title: "Chelsea Townhouse",
    subtitle: "Complete Renovation",
    location: "London, UK",
    year: "2023",
    description:
      "A comprehensive interior finishing project spanning five floors. We supplied all bathroom fixtures, kitchen hardware, lighting, and electrical finishes, creating a cohesive design language throughout this stunning Chelsea property.",
    scope: ["Full Interior Finishing", "Bathroom Suites", "Kitchen Design", "Statement Lighting"],
    image: "/furniture-hero.png",
    href: "/projects/chelsea-townhouse",
  },
  {
    id: "notting-hill-mews",
    title: "Notting Hill Mews",
    subtitle: "Boutique Development",
    location: "London, UK",
    year: "2023",
    description:
      "Working with leading architects, we provided all finishing materials for this exclusive mews development. Contemporary bathroom design meets timeless quality, with each unit featuring unique material selections.",
    scope: ["Multi-unit Development", "Contemporary Bathrooms", "Bespoke Solutions", "Premium Hardware"],
    image: "/tiling-hero.png",
    href: "/projects/notting-hill-mews",
  },
  {
    id: "belgravia-mansion",
    title: "Belgravia Mansion",
    subtitle: "Heritage Restoration",
    location: "London, UK",
    year: "2023",
    description:
      "A sensitive restoration project that required sourcing authentic period-appropriate materials while incorporating modern luxuries. Our brass heritage collection was central to maintaining the property's historical character.",
    scope: ["Heritage Materials", "Brass Heritage Collection", "Period Restoration", "Custom Fixtures"],
    image: "/lighting-hero.png",
    href: "/projects/belgravia-mansion",
  },
];

// Single project section component with scroll animation
function ProjectSection({ project, index }: { project: typeof projects[0]; index: number }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Transform values for the effect
  const imageScale = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0.85]);
  const imageBorderRadius = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 0, 12]);
  const imageMargin = useTransform(scrollYProgress, [0, 0.3, 0.5], ["0%", "0%", "5%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [0.3, 0.4, 0.5]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], ["0%", "-20%"]);
  const titleOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.35, 0.5], ["30px", "0px"]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "200vh" }} // Extra height for scroll room
    >
      {/* Sticky container for the image */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Image frame with animated margins */}
        <motion.div
          className="relative w-full h-full"
          style={{
            padding: imageMargin,
          }}
        >
          <motion.div
            className="relative w-full h-full overflow-hidden"
            style={{
              scale: imageScale,
              borderRadius: imageBorderRadius,
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
            {/* Dark overlay */}
            <motion.div
              className="absolute inset-0 bg-black"
              style={{ opacity: overlayOpacity }}
            />
          </motion.div>
        </motion.div>

        {/* Title overlay on image */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-8 md:p-16 lg:p-20 z-10"
          style={{
            y: titleY,
            opacity: titleOpacity,
          }}
        >
          <p className="text-[11px] md:text-[13px] tracking-[0.3em] text-white/70 uppercase mb-3">
            {project.subtitle} · {project.location}
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display tracking-[0.1em] text-white mb-6">
            {project.title}
          </h2>
          <Link
            href={project.href}
            className="inline-flex items-center gap-2 text-white text-sm tracking-[0.15em] uppercase group"
          >
            View Project
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* Content section that scrolls up over the image */}
      <motion.div
        className="relative z-20 bg-white -mt-[50vh]"
        style={{
          opacity: contentOpacity,
          y: contentY,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left column - Title repeat and description */}
            <div>
              <p className="text-[11px] tracking-[0.2em] text-warm-grey uppercase mb-4">
                {project.year}
              </p>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-display tracking-[0.08em] mb-8 leading-tight">
                {project.title.split(" ")[0]}
                <br />
                {project.title.split(" ").slice(1).join(" ")}
              </h3>
              <p className="text-warm-grey leading-relaxed text-lg">
                {project.description}
              </p>
            </div>

            {/* Right column - Project details */}
            <div className="lg:pt-16">
              <div className="mb-8">
                <p className="text-[11px] tracking-[0.2em] text-warm-grey uppercase mb-4">
                  Project Scope
                </p>
                <ul className="space-y-2">
                  {project.scope.map((item, i) => (
                    <li key={i} className="text-primary-black tracking-wide">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-8">
                <p className="text-[11px] tracking-[0.2em] text-warm-grey uppercase mb-4">
                  Location
                </p>
                <p className="text-primary-black tracking-wide">{project.location}</p>
              </div>
              <Link
                href={project.href}
                className="inline-flex items-center gap-3 px-8 py-4 border border-primary-black text-primary-black text-[13px] tracking-[0.15em] uppercase hover:bg-primary-black hover:text-white transition-all duration-300 group"
              >
                View Full Project
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default function ProjectsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="h-screen relative flex items-center justify-center bg-primary-black overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src="/bathroom-hero.png"
            alt="Featured Projects"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <div className="relative z-10 text-center text-white px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[11px] md:text-[13px] tracking-[0.3em] uppercase mb-6 text-white/70"
          >
            Our Portfolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display tracking-[0.2em] mb-8"
          >
            FEATURED
            <br />
            PROJECTS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-white/70 max-w-xl mx-auto tracking-wide"
          >
            A curated selection of our finest work, showcasing exceptional craftsmanship
            and timeless design across London&apos;s most prestigious addresses.
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center cursor-pointer hover:border-white transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown className="w-5 h-5 text-white/70" />
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

