import Link from "next/link";
import { NAVIGATION } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-black text-white mt-32">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h2 className="text-sm tracking-[0.3em] uppercase font-display mb-4">
              HOUSE OF CLARENCE
            </h2>
            <p className="text-sm text-warm-grey leading-relaxed">
              Curated collections of premium bathroom, lighting, and interior finishing materials for discerning spaces.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs tracking-widest uppercase mb-4">QUICK LINKS</h3>
            <ul className="space-y-2">
              {NAVIGATION.slice(7).map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-warm-grey hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xs tracking-widest uppercase mb-4">CUSTOMER SERVICE</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-warm-grey hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/trade"
                  className="text-sm text-warm-grey hover:text-white transition-colors"
                >
                  Trade Account
                </Link>
              </li>
              <li>
                <Link
                  href="/delivery"
                  className="text-sm text-warm-grey hover:text-white transition-colors"
                >
                  Delivery Information
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-sm text-warm-grey hover:text-white transition-colors"
                >
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs tracking-widest uppercase mb-4">LEGAL</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-warm-grey hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-warm-grey hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-sm text-warm-grey hover:text-white transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-charcoal pt-8">
          <p className="text-xs text-warm-grey text-center">
            © {currentYear} House of Clarence. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

