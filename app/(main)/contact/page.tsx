"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="text-center py-16 px-6">
        <motion.h1
          className="text-4xl md:text-6xl tracking-[0.3em] font-display mb-4"
          {...fadeUp}
        >
          CONTACT US
        </motion.h1>
        <motion.p className="text-warm-grey max-w-2xl mx-auto" {...fadeUp}>
          Get in touch with our team for product enquiries, trade accounts, or design consultations.
        </motion.p>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl tracking-widest mb-8">SEND US A MESSAGE</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm tracking-widest uppercase mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm tracking-widest uppercase mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm tracking-widest uppercase mb-2">
                  Phone
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm tracking-widest uppercase mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="flex w-full border border-light-grey bg-white px-4 py-3 text-sm transition-colors placeholder:text-warm-grey focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-black focus-visible:ring-offset-2"
                />
              </div>
              <Button type="submit" className="w-full">
                SEND MESSAGE
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div className="space-y-8" {...fadeUp}>
            <div>
              <h2 className="text-2xl tracking-widest mb-6">GET IN TOUCH</h2>
              <div className="space-y-6 text-warm-grey">
                <div>
                  <h3 className="text-sm tracking-widest uppercase text-primary-black mb-2">
                    EMAIL
                  </h3>
                  <a href="mailto:info@houseofclarence.com" className="hover:text-primary-black transition-colors">
                    info@houseofclarence.com
                  </a>
                </div>
                <div>
                  <h3 className="text-sm tracking-widest uppercase text-primary-black mb-2">
                    PHONE
                  </h3>
                  <a href="tel:+442071234567" className="hover:text-primary-black transition-colors">
                    +44 (0) 20 7123 4567
                  </a>
                </div>
                <div>
                  <h3 className="text-sm tracking-widest uppercase text-primary-black mb-2">
                    ADDRESS
                  </h3>
                  <p>
                    123 Design Street<br />
                    London, SW1A 1AA<br />
                    United Kingdom
                  </p>
                </div>
                <div>
                  <h3 className="text-sm tracking-widest uppercase text-primary-black mb-2">
                    OPENING HOURS
                  </h3>
                  <p>
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-light-grey">
              <h3 className="text-sm tracking-widest uppercase text-primary-black mb-4">
                TRADE ENQUIRIES
              </h3>
              <p className="text-warm-grey mb-4">
                Are you a trade professional? Apply for a trade account to access exclusive
                pricing and dedicated support.
              </p>
              <Button variant="outline" asChild>
                <a href="/trade">APPLY FOR TRADE ACCOUNT</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

