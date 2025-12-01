import Link from "next/link";
import { Phone, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="text-sm tracking-[0.3em] uppercase font-display mb-4">
              HOUSE OF CLARENCE
            </h2>
            <p className="text-sm text-warm-grey leading-relaxed mb-6 max-w-sm">
              Premium second fix and finishing materials for discerning spaces. 
              Curated collections of bathroom, kitchen, tiling, lighting, furniture, and electrical products.
            </p>
            <div className="space-y-2">
              <a 
                href="tel:+442033704057"
                className="flex items-center gap-2 text-sm text-warm-grey hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                020 3370 4057
              </a>
              <a 
                href="mailto:enquiries@houseofclarence.com"
                className="flex items-center gap-2 text-sm text-warm-grey hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                enquiries@houseofclarence.com
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs tracking-[0.15em] uppercase mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/bathroom" className="text-sm text-warm-grey hover:text-white transition-colors">
                  Bathroom
                </Link>
              </li>
              <li>
                <Link href="/kitchen" className="text-sm text-warm-grey hover:text-white transition-colors">
                  Kitchen
                </Link>
              </li>
              <li>
                <Link href="/tiling" className="text-sm text-warm-grey hover:text-white transition-colors">
                  Tiling
                </Link>
              </li>
              <li>
                <Link href="/lighting" className="text-sm text-warm-grey hover:text-white transition-colors">
                  Lighting
                </Link>
              </li>
              <li>
                <Link href="/furniture" className="text-sm text-warm-grey hover:text-white transition-colors">
                  Furniture
                </Link>
              </li>
              <li>
                <Link href="/electrical" className="text-sm text-warm-grey hover:text-white transition-colors">
                  Electrical
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs tracking-[0.15em] uppercase mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/bespoke" className="text-sm text-warm-grey hover:text-white transition-colors">
                  Bespoke Sourcing
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-warm-grey hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-warm-grey hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/selection" className="text-sm text-warm-grey hover:text-white transition-colors">
                  Your Selection
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs tracking-[0.15em] uppercase mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms-conditions" className="text-sm text-warm-grey hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm text-warm-grey hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-sm text-warm-grey hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-charcoal pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-warm-grey">
            © {currentYear} House of Clarence. All rights reserved.
          </p>
          <p className="text-xs text-warm-grey">
            Designed for discerning spaces
          </p>
        </div>
      </div>
    </footer>
  );
}
