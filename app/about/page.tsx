"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export default function AboutPage() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop"
            alt="About House of Clarence"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <motion.h1
          className="relative z-10 text-4xl md:text-6xl text-white tracking-[0.3em] font-display"
          {...fadeUp}
        >
          ABOUT US
        </motion.h1>
      </section>

      {/* Brand Story */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.h2
            className="text-3xl md:text-4xl tracking-[0.3em] text-center"
            {...fadeUp}
          >
            OUR STORY
          </motion.h2>
          <motion.div className="space-y-6 text-warm-grey leading-relaxed" {...fadeUp}>
            <p className="text-lg">
              House of Clarence was founded on a simple principle: exceptional spaces deserve
              exceptional finishing materials. We curate the finest bathroom fixtures, lighting,
              tiles, and interior accessories from around the world, bringing together quality,
              craftsmanship, and timeless design.
            </p>
            <p>
              Our name pays homage to the refined elegance and attention to detail that defines
              our collections. Each product is carefully selected for its superior materials,
              expert craftsmanship, and ability to transform ordinary spaces into extraordinary
              environments.
            </p>
            <p>
              Whether you&apos;re an interior designer, architect, trade professional, or homeowner
              with a discerning eye, House of Clarence provides the finishing touches that
              elevate your project from good to exceptional.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-off-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl tracking-[0.3em] text-center mb-16"
            {...fadeUp}
          >
            OUR VALUES
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "QUALITY",
                description:
                  "We never compromise on quality. Every product in our collection meets our exacting standards for materials and craftsmanship.",
              },
              {
                title: "CRAFTSMANSHIP",
                description:
                  "We work with artisans and manufacturers who share our commitment to excellence and attention to detail.",
              },
              {
                title: "DESIGN",
                description:
                  "Timeless design over trends. We select products that will look beautiful for years to come.",
              },
            ].map((value, index) => (
              <motion.div key={value.title} {...fadeUp} transition={{ delay: index * 0.1 }}>
                <h3 className="text-xl tracking-widest mb-4">{value.title}</h3>
                <p className="text-warm-grey leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sourcing */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div className="relative aspect-[4/5] overflow-hidden" {...fadeUp}>
            <Image
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=1000&fit=crop"
              alt="Sourcing"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
          <motion.div className="space-y-6" {...fadeUp}>
            <h2 className="text-3xl md:text-4xl tracking-[0.3em]">SOURCING & PARTNERSHIPS</h2>
            <p className="text-warm-grey leading-relaxed">
              We travel the world to find the finest materials and work directly with
              manufacturers who share our values. From Italian marble quarries to British
              metalworkers, our partnerships are built on mutual respect and a shared commitment
              to excellence.
            </p>
            <p className="text-warm-grey leading-relaxed">
              Our team regularly visits factories and workshops to ensure that every product
              meets our standards. We believe in transparency, ethical sourcing, and supporting
              traditional crafts while embracing innovation.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

