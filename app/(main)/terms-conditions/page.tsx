"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function TermsConditionsPage() {
  return (
    <main className="min-h-screen bg-off-white pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <nav className="mb-6">
            <ol className="flex items-center gap-2 text-[12px] tracking-[0.05em] text-warm-grey">
              <li>
                <Link href="/" className="hover:text-primary-black transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-primary-black">Terms & Conditions</li>
            </ol>
          </nav>
          <h1 className="text-3xl md:text-4xl tracking-[0.15em] font-display uppercase mb-4">
            Terms & Conditions
          </h1>
          <p className="text-warm-grey">
            Last updated: December 2024
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="prose prose-lg max-w-none"
        >
          <div className="bg-white p-8 md:p-12 shadow-sm space-y-8">
            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">1. Introduction</h2>
              <p className="text-warm-grey leading-relaxed">
                Welcome to House of Clarence. These Terms and Conditions (&quot;Terms&quot;) govern your use of 
                our website houseofclarence.com (the &quot;Website&quot;) and any purchases, enquiries, or 
                transactions you make with us. By accessing or using our Website, you agree to be bound 
                by these Terms.
              </p>
              <p className="text-warm-grey leading-relaxed mt-4">
                House of Clarence is a trading name of House of Clarence Ltd, a company registered in 
                England and Wales. References to &quot;we&quot;, &quot;us&quot;, or &quot;our&quot; refer to House of Clarence Ltd.
              </p>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">2. Use of Website</h2>
              <p className="text-warm-grey leading-relaxed mb-4">
                By using our Website, you agree to:
              </p>
              <ul className="list-disc pl-6 text-warm-grey space-y-2">
                <li>Use the Website only for lawful purposes</li>
                <li>Provide accurate and complete information when making enquiries</li>
                <li>Not attempt to gain unauthorised access to any part of the Website</li>
                <li>Not use the Website in any way that could damage, disable, or impair its operation</li>
                <li>Not reproduce, duplicate, copy, or resell any part of the Website without our consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">3. Products and Services</h2>
              
              <h3 className="text-lg font-medium mb-3">Product Information</h3>
              <p className="text-warm-grey leading-relaxed mb-4">
                We take care to ensure that all product descriptions, images, and specifications on our 
                Website are accurate. However:
              </p>
              <ul className="list-disc pl-6 text-warm-grey space-y-2">
                <li>Colours may vary slightly from images due to screen settings</li>
                <li>Natural materials (stone, marble, wood) will have inherent variations</li>
                <li>Product specifications may change without notice</li>
                <li>All measurements are approximate and should be verified before ordering</li>
              </ul>

              <h3 className="text-lg font-medium mb-3 mt-6">Pricing</h3>
              <p className="text-warm-grey leading-relaxed">
                House of Clarence operates on a quote-based pricing model. Prices displayed on the Website 
                are indicative only and may vary based on:
              </p>
              <ul className="list-disc pl-6 text-warm-grey space-y-2 mt-4">
                <li>Order quantity</li>
                <li>Project requirements and specifications</li>
                <li>Delivery location</li>
                <li>Current supplier pricing</li>
              </ul>
              <p className="text-warm-grey leading-relaxed mt-4">
                Final pricing will be confirmed in writing via a formal quotation before any order is placed.
              </p>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">4. Orders and Quotations</h2>
              
              <h3 className="text-lg font-medium mb-3">Quotations</h3>
              <p className="text-warm-grey leading-relaxed mb-4">
                All quotations provided by House of Clarence:
              </p>
              <ul className="list-disc pl-6 text-warm-grey space-y-2">
                <li>Are valid for 30 days unless otherwise stated</li>
                <li>Are exclusive of VAT unless otherwise specified</li>
                <li>Do not constitute a binding contract until accepted in writing</li>
                <li>May be subject to change based on material availability</li>
              </ul>

              <h3 className="text-lg font-medium mb-3 mt-6">Order Acceptance</h3>
              <p className="text-warm-grey leading-relaxed">
                A contract is formed when we send you written confirmation of your order acceptance. 
                We reserve the right to decline any order for any reason, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-warm-grey space-y-2 mt-4">
                <li>Product unavailability</li>
                <li>Pricing errors</li>
                <li>Inability to deliver to your location</li>
                <li>Credit or payment concerns</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">5. Payment Terms</h2>
              <p className="text-warm-grey leading-relaxed mb-4">
                Payment terms will be specified in your quotation and order confirmation. Standard terms include:
              </p>
              <ul className="list-disc pl-6 text-warm-grey space-y-2">
                <li>A deposit may be required to confirm orders (typically 50%)</li>
                <li>Balance payment due prior to dispatch unless credit terms have been agreed</li>
                <li>All prices are in GBP (£) unless otherwise stated</li>
              </ul>
              <p className="text-warm-grey leading-relaxed mt-4">
                We accept payment by bank transfer, credit/debit card, and other methods as agreed.
              </p>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">6. Delivery</h2>
              <p className="text-warm-grey leading-relaxed mb-4">
                Delivery terms will be confirmed with your order. Please note:
              </p>
              <ul className="list-disc pl-6 text-warm-grey space-y-2">
                <li>Delivery times are estimates and not guaranteed</li>
                <li>Delivery charges will be quoted separately based on order size and location</li>
                <li>Someone must be available to receive and inspect the delivery</li>
                <li>Risk passes to you upon delivery</li>
                <li>You must inspect goods upon delivery and report any damage immediately</li>
              </ul>

              <h3 className="text-lg font-medium mb-3 mt-6">Delivery Options</h3>
              <ul className="list-disc pl-6 text-warm-grey space-y-2">
                <li><strong>Standard Delivery:</strong> Kerbside delivery to mainland UK addresses</li>
                <li><strong>Premium Delivery:</strong> Room of choice delivery available for selected items</li>
                <li><strong>International Delivery:</strong> Available by arrangement</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">7. Returns and Cancellations</h2>
              
              <h3 className="text-lg font-medium mb-3">Consumer Rights</h3>
              <p className="text-warm-grey leading-relaxed mb-4">
                For consumer purchases (not business-to-business), you have the right to cancel your order 
                within 14 days of receiving your goods under the Consumer Contracts Regulations 2013. 
                To exercise this right:
              </p>
              <ul className="list-disc pl-6 text-warm-grey space-y-2">
                <li>Contact us within 14 days of delivery</li>
                <li>Return the goods in original, unused condition within 14 days of cancellation</li>
                <li>You are responsible for return shipping costs</li>
                <li>Refunds will be processed within 14 days of receiving returned goods</li>
              </ul>

              <h3 className="text-lg font-medium mb-3 mt-6">Exceptions</h3>
              <p className="text-warm-grey leading-relaxed">
                The cancellation right does not apply to:
              </p>
              <ul className="list-disc pl-6 text-warm-grey space-y-2 mt-4">
                <li>Bespoke or custom-made items</li>
                <li>Items cut to your specifications</li>
                <li>Products that have been installed or used</li>
                <li>Products ordered specifically for your project</li>
              </ul>

              <h3 className="text-lg font-medium mb-3 mt-6">Damaged or Faulty Goods</h3>
              <p className="text-warm-grey leading-relaxed">
                If goods arrive damaged or faulty, please contact us within 48 hours with photographs. 
                We will arrange collection and replacement or refund at no cost to you.
              </p>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">8. Warranty</h2>
              <p className="text-warm-grey leading-relaxed mb-4">
                Product warranties vary by manufacturer and product type. Warranty information will be 
                provided with your quotation. General warranty terms:
              </p>
              <ul className="list-disc pl-6 text-warm-grey space-y-2">
                <li>Warranties cover manufacturing defects only</li>
                <li>Warranties do not cover damage from misuse, improper installation, or normal wear</li>
                <li>Natural variations in stone, marble, and wood are not defects</li>
                <li>Installation must be carried out by qualified professionals</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">9. Intellectual Property</h2>
              <p className="text-warm-grey leading-relaxed">
                All content on our Website, including but not limited to text, images, logos, and design, 
                is the property of House of Clarence or our licensors and is protected by copyright and 
                other intellectual property laws. You may not reproduce, distribute, or use any content 
                without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">10. Limitation of Liability</h2>
              <p className="text-warm-grey leading-relaxed mb-4">
                To the fullest extent permitted by law:
              </p>
              <ul className="list-disc pl-6 text-warm-grey space-y-2">
                <li>Our liability is limited to the value of goods purchased</li>
                <li>We are not liable for indirect, consequential, or incidental damages</li>
                <li>We are not liable for delays caused by circumstances beyond our control</li>
                <li>Our maximum liability shall not exceed the total amount paid by you</li>
              </ul>
              <p className="text-warm-grey leading-relaxed mt-4">
                Nothing in these Terms excludes or limits our liability for death or personal injury 
                caused by negligence, fraud, or any other liability that cannot be excluded by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">11. Force Majeure</h2>
              <p className="text-warm-grey leading-relaxed">
                We shall not be liable for any failure or delay in performing our obligations where such 
                failure or delay results from circumstances beyond our reasonable control, including but 
                not limited to natural disasters, war, terrorism, strikes, supplier failures, or pandemic.
              </p>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">12. Governing Law</h2>
              <p className="text-warm-grey leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of England 
                and Wales. Any disputes arising under these Terms shall be subject to the exclusive 
                jurisdiction of the courts of England and Wales.
              </p>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">13. Changes to Terms</h2>
              <p className="text-warm-grey leading-relaxed">
                We reserve the right to update these Terms at any time. Changes will be posted on this 
                page with an updated &quot;Last updated&quot; date. Continued use of the Website after changes 
                constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">14. Contact Us</h2>
              <p className="text-warm-grey leading-relaxed mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="bg-off-white p-6">
                <p className="text-primary-black font-medium mb-2">House of Clarence</p>
                <p className="text-warm-grey">Email: legal@houseofclarence.com</p>
                <p className="text-warm-grey">Phone: 020 3370 4057</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

