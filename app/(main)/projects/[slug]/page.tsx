"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Project data - in production, this would come from a CMS/database
const projectsData = {
  "kensington-residence": {
    id: "kensington-residence",
    title: "Kensington Residence",
    subtitle: "Georgian Townhouse Renovation",
    location: "Kensington, London",
    year: "2024",
    client: "Private Client",
    architect: "Studio KO",
    scope: ["Bathroom Design", "Kitchen Fixtures", "Bespoke Vanities", "Marble Installation"],
    heroImage: "/bathroom-hero.png",
    description:
      "A complete bathroom and kitchen renovation for a Georgian townhouse in Kensington. The project featured custom Italian marble throughout, bespoke brass fixtures, and handcrafted vanity units designed to complement the property's period features.",
    fullDescription: [
      "This Georgian townhouse in the heart of Kensington required a sensitive approach that would honour its architectural heritage while introducing contemporary luxury. Working closely with Studio KO, we developed a material palette that bridges two centuries of design.",
      "The master bathroom features floor-to-ceiling Calacatta Viola marble, sourced from a single block in Tuscany to ensure perfect vein matching across all surfaces. Our bespoke brass fixtures were aged using traditional techniques to complement the property's original hardware.",
      "Every vanity unit was designed in-house and handcrafted by British artisans, featuring dovetail joinery and hand-applied lacquer finishes. The result is a space that feels both timeless and distinctly contemporary.",
    ],
    gallery: [
      { src: "/bathroom-hero.png", caption: "Master bathroom with Calacatta Viola marble" },
      { src: "/kitchen-hero.png", caption: "Kitchen with brass fixtures" },
      { src: "/stone-sanctuary.png", caption: "Freestanding stone bath detail" },
      { src: "/brass-heritage.png", caption: "Aged brass tap installation" },
    ],
    nextProject: {
      slug: "mayfair-penthouse",
      title: "Mayfair Penthouse",
    },
    prevProject: {
      slug: "belgravia-mansion",
      title: "Belgravia Mansion",
    },
  },
  "mayfair-penthouse": {
    id: "mayfair-penthouse",
    title: "Mayfair Penthouse",
    subtitle: "Luxury Apartment",
    location: "Mayfair, London",
    year: "2024",
    client: "Private Client",
    architect: "Lawson Robb",
    scope: ["Stone Sanctuary Collection", "Designer Lighting", "Premium Tiling", "Electrical Finishes"],
    heroImage: "/kitchen-hero.png",
    description:
      "An opulent penthouse renovation featuring our exclusive Stone Sanctuary collection. Floor-to-ceiling Calacatta marble, freestanding natural stone baths, and designer lighting create an atmosphere of refined luxury.",
    fullDescription: [
      "Perched above the rooftops of Mayfair with panoramic views of Hyde Park, this penthouse demanded materials and finishes that could compete with its extraordinary setting. Our Stone Sanctuary collection formed the foundation of the design.",
      "The master bathroom centres on a sculptural freestanding bath carved from a single block of Carrara marble, weighing over two tonnes. Positioned to capture the morning light and park views, it becomes the focal point of the entire residence.",
      "Throughout the apartment, we installed our signature aged brass electrical fittings and bespoke lighting solutions. The result is a home that feels like a private gallery of the finest materials the world has to offer.",
    ],
    gallery: [
      { src: "/kitchen-hero.png", caption: "Open-plan living with park views" },
      { src: "/bathroom-hero.png", caption: "Master bathroom suite" },
      { src: "/marble-elegance.png", caption: "Marble vanity detail" },
      { src: "/lighting-hero.png", caption: "Bespoke lighting installation" },
    ],
    nextProject: {
      slug: "chelsea-townhouse",
      title: "Chelsea Townhouse",
    },
    prevProject: {
      slug: "kensington-residence",
      title: "Kensington Residence",
    },
  },
  "chelsea-townhouse": {
    id: "chelsea-townhouse",
    title: "Chelsea Townhouse",
    subtitle: "Complete Renovation",
    location: "Chelsea, London",
    year: "2023",
    client: "Private Client",
    architect: "Banda Property",
    scope: ["Full Interior Finishing", "Bathroom Suites", "Kitchen Design", "Statement Lighting"],
    heroImage: "/furniture-hero.png",
    description:
      "A comprehensive interior finishing project spanning five floors. We supplied all bathroom fixtures, kitchen hardware, lighting, and electrical finishes, creating a cohesive design language throughout.",
    fullDescription: [
      "This ambitious project required us to furnish an entire five-storey townhouse with a unified material language. From the basement cinema room to the rooftop terrace, every space received the same meticulous attention to detail.",
      "We developed a custom palette of finishes exclusive to this project: a proprietary bronze patina for all hardware, hand-finished plaster in a warm oyster tone, and our signature brushed brass for every electrical fitting.",
      "The kitchen features a 4-metre island topped with bookmatched Patagonia granite, while each of the four bathrooms tells its own story through distinct but complementary marble selections.",
    ],
    gallery: [
      { src: "/furniture-hero.png", caption: "Living room with custom furniture" },
      { src: "/contemporary-kitchen.png", caption: "Bespoke kitchen island" },
      { src: "/electrical-hero.png", caption: "Custom electrical finishes" },
      { src: "/tiling-hero.png", caption: "Guest bathroom tiling" },
    ],
    nextProject: {
      slug: "notting-hill-mews",
      title: "Notting Hill Mews",
    },
    prevProject: {
      slug: "mayfair-penthouse",
      title: "Mayfair Penthouse",
    },
  },
  "notting-hill-mews": {
    id: "notting-hill-mews",
    title: "Notting Hill Mews",
    subtitle: "Boutique Development",
    location: "Notting Hill, London",
    year: "2023",
    client: "Development Client",
    architect: "Michaelis Boyd",
    scope: ["Multi-unit Development", "Contemporary Bathrooms", "Bespoke Solutions", "Premium Hardware"],
    heroImage: "/tiling-hero.png",
    description:
      "Working with leading architects, we provided all finishing materials for this exclusive mews development. Contemporary bathroom design meets timeless quality, with each unit featuring unique material selections.",
    fullDescription: [
      "This exclusive development of four mews houses required a approach that would give each residence its own identity while maintaining the cohesive quality that defines House of Clarence projects.",
      "We worked with Michaelis Boyd to develop four distinct material palettes, each drawing from different inspirations: Mediterranean warmth, Nordic minimalism, Japanese tranquility, and British heritage.",
      "Despite their differences, all four homes share our commitment to exceptional quality. Terrazzo flooring, fluted glass partitions, and our curated collection of minimalist sanitaryware unite these exceptional homes.",
    ],
    gallery: [
      { src: "/tiling-hero.png", caption: "Mediterranean-inspired bathroom" },
      { src: "/bathroom-hero.png", caption: "Nordic bathroom suite" },
      { src: "/stone-sanctuary.png", caption: "Japanese-inspired wet room" },
      { src: "/brass-heritage.png", caption: "Heritage brass detailing" },
    ],
    nextProject: {
      slug: "belgravia-mansion",
      title: "Belgravia Mansion",
    },
    prevProject: {
      slug: "chelsea-townhouse",
      title: "Chelsea Townhouse",
    },
  },
  "belgravia-mansion": {
    id: "belgravia-mansion",
    title: "Belgravia Mansion",
    subtitle: "Heritage Restoration",
    location: "Belgravia, London",
    year: "2023",
    client: "Private Client",
    architect: "Ben Pentreath",
    scope: ["Heritage Materials", "Brass Heritage Collection", "Period Restoration", "Custom Fixtures"],
    heroImage: "/lighting-hero.png",
    description:
      "A sensitive restoration project that required sourcing authentic period-appropriate materials while incorporating modern luxuries. Our brass heritage collection was central to maintaining the property's historical character.",
    fullDescription: [
      "This Grade II listed Belgravia mansion presented unique challenges. Every material choice required approval from heritage consultants, yet our client desired contemporary comfort and luxury throughout.",
      "We collaborated closely with Ben Pentreath to source reclaimed marble from European salvage specialists, matching the original Victorian installations as closely as possible. Where original fixtures were beyond repair, we commissioned bespoke reproductions from specialist craftsmen.",
      "Our Brass Heritage Collection proved essential, with its traditionally-aged finishes perfectly complementing the mansion's original hardware. The result is a restoration that honours history while embracing modernity.",
    ],
    gallery: [
      { src: "/lighting-hero.png", caption: "Restored entrance hall" },
      { src: "/electrical-hero.png", caption: "Period-appropriate electrical" },
      { src: "/marble-elegance.png", caption: "Reclaimed marble flooring" },
      { src: "/furniture-hero.png", caption: "Drawing room restoration" },
    ],
    nextProject: {
      slug: "kensington-residence",
      title: "Kensington Residence",
    },
    prevProject: {
      slug: "notting-hill-mews",
      title: "Notting Hill Mews",
    },
  },
};

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projectsData[slug as keyof typeof projectsData];

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], ["0%", "30%"]);

  if (!project) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{ scale: imageScale, opacity: imageOpacity }}
        >
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <motion.div 
          className="relative z-10 h-full flex flex-col justify-end p-6 md:p-12 lg:p-20"
          style={{ y: titleY }}
        >
          {/* Back link */}
          <Link
            href="/projects"
            className="absolute top-24 md:top-32 left-6 md:left-12 lg:left-20 inline-flex items-center gap-2 text-white/70 text-sm tracking-[0.1em] uppercase hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl"
          >
            <p className="text-[11px] md:text-[13px] tracking-[0.3em] text-white/60 uppercase mb-4">
              {project.subtitle}
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display tracking-[0.08em] text-white mb-6">
              {project.title}
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed">
              {project.description}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Project Details */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
            {/* Left - Project Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <p className="text-[11px] tracking-[0.2em] text-warm-grey uppercase mb-2">Location</p>
                <p className="text-primary-black">{project.location}</p>
              </div>
              <div>
                <p className="text-[11px] tracking-[0.2em] text-warm-grey uppercase mb-2">Year</p>
                <p className="text-primary-black">{project.year}</p>
              </div>
              <div>
                <p className="text-[11px] tracking-[0.2em] text-warm-grey uppercase mb-2">Client</p>
                <p className="text-primary-black">{project.client}</p>
              </div>
              <div>
                <p className="text-[11px] tracking-[0.2em] text-warm-grey uppercase mb-2">Architect</p>
                <p className="text-primary-black">{project.architect}</p>
              </div>
              <div>
                <p className="text-[11px] tracking-[0.2em] text-warm-grey uppercase mb-2">Scope</p>
                <ul className="space-y-1">
                  {project.scope.map((item, i) => (
                    <li key={i} className="text-primary-black">{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right - Full Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2 space-y-6"
            >
              {project.fullDescription.map((paragraph, i) => (
                <p key={i} className="text-warm-grey leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-off-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-display tracking-[0.15em] mb-12"
          >
            PROJECT GALLERY
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {project.gallery.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={index === 0 ? "md:col-span-2" : ""}
              >
                <div className={`relative overflow-hidden ${index === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                  <Image
                    src={image.src}
                    alt={image.caption}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes={index === 0 ? "100vw" : "50vw"}
                  />
                </div>
                <p className="mt-4 text-[13px] text-warm-grey tracking-wide">
                  {image.caption}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Next/Prev Project Navigation */}
      <section className="bg-primary-black">
        <div className="grid md:grid-cols-2">
          {/* Previous Project */}
          <Link
            href={`/projects/${project.prevProject.slug}`}
            className="group relative py-16 md:py-24 px-6 md:px-12 lg:px-20 border-r border-white/10 hover:bg-white/5 transition-colors"
          >
            <p className="text-[11px] tracking-[0.2em] text-white/50 uppercase mb-4 flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Previous Project
            </p>
            <h3 className="text-2xl md:text-3xl font-display tracking-[0.1em] text-white group-hover:translate-x-2 transition-transform">
              {project.prevProject.title}
            </h3>
          </Link>

          {/* Next Project */}
          <Link
            href={`/projects/${project.nextProject.slug}`}
            className="group relative py-16 md:py-24 px-6 md:px-12 lg:px-20 text-right hover:bg-white/5 transition-colors"
          >
            <p className="text-[11px] tracking-[0.2em] text-white/50 uppercase mb-4 flex items-center justify-end gap-2">
              Next Project
              <ArrowRight className="w-4 h-4" />
            </p>
            <h3 className="text-2xl md:text-3xl font-display tracking-[0.1em] text-white group-hover:-translate-x-2 transition-transform">
              {project.nextProject.title}
            </h3>
          </Link>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[11px] tracking-[0.3em] text-warm-grey uppercase mb-6">
              Start Your Project
            </p>
            <h2 className="text-2xl md:text-4xl font-display tracking-[0.15em] mb-6">
              INTERESTED IN A SIMILAR PROJECT?
            </h2>
            <p className="text-warm-grey max-w-xl mx-auto mb-10 leading-relaxed">
              Our team would love to discuss how we can bring the same level of
              craftsmanship and attention to detail to your project.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-primary-black text-white text-[13px] tracking-[0.15em] uppercase hover:bg-charcoal transition-all duration-300"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}

