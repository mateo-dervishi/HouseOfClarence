"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
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
              <li className="text-primary-black">Privacy Policy</li>
            </ol>
          </nav>
          <h1 className="text-3xl md:text-4xl tracking-[0.15em] font-display uppercase mb-4">
            Privacy Policy
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
                House of Clarence Ltd (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you visit our website houseofclarence.com (the &quot;Website&quot;) or make enquiries about our 
                products and services.
              </p>
              <div className="bg-off-white p-6 mt-4">
                <p className="text-primary-black font-medium mb-2">Data Controller</p>
                <p className="text-warm-grey">House of Clarence Ltd</p>
                <p className="text-warm-grey">Company Number: 16501627</p>
                <p className="text-warm-grey">Registered Address: 320 High Street, Harlington, Hayes, England, UB3 5DU</p>
              </div>
              <p className="text-warm-grey leading-relaxed mt-4">
                Please read this privacy policy carefully. If you do not agree with the terms of this 
                privacy policy, please do not access the Website.
              </p>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">2. Information We Collect</h2>
              
              <h3 className="text-lg font-medium mb-3">Personal Information</h3>
              <p className="text-warm-grey leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 text-warm-grey space-y-2">
                <li>Submit an enquiry or quote request</li>
                <li>Create a selection list or project list</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact us via email, phone, or contact forms</li>
                <li>Request our bespoke sourcing service</li>
              </ul>
              <p className="text-warm-grey leading-relaxed mt-4">
                This information may include:
              </p>
              <ul className="list-disc pl-6 text-warm-grey space-y-2">
                <li>Name and contact information (email address, phone number)</li>
                <li>Project details and requirements</li>
                <li>Product preferences and selections</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="text-lg font-medium mb-3 mt-6">Automatically Collected Information</h3>
              <p className="text-warm-grey leading-relaxed">
                When you visit our Website, we may automatically collect certain information about your 
                device and your visit, including:
              </p>
              <ul className="list-disc pl-6 text-warm-grey space-y-2 mt-4">
                <li>IP address and browser type</li>
                <li>Device type and operating system</li>
                <li>Pages visited and time spent on each page</li>
                <li>Referring website or source</li>
                <li>Geographic location (country/city level)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">3. How We Use Your Information</h2>
              <p className="text-warm-grey leading-relaxed mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-warm-grey space-y-2">
                <li>To respond to your enquiries and provide quotes</li>
                <li>To process and manage your product selections</li>
                <li>To send you marketing communications (with your consent)</li>
                <li>To improve our Website and services</li>
                <li>To analyse Website usage and trends</li>
                <li>To protect against fraud and maintain security</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">4. Sharing Your Information</h2>
              <p className="text-warm-grey leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share 
                your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-warm-grey space-y-2">
                <li><strong>Service Providers:</strong> With trusted third parties who assist us in operating 
                our Website, conducting our business, or servicing you</li>
                <li><strong>Suppliers:</strong> When necessary to fulfil your orders or enquiries about specific products</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, sale, or transfer of our business</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">5. Data Security</h2>
              <p className="text-warm-grey leading-relaxed">
                We implement appropriate technical and organisational measures to protect your personal 
                information against unauthorised access, alteration, disclosure, or destruction. However, 
                no method of transmission over the Internet or electronic storage is 100% secure, and we 
                cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">6. Data Retention</h2>
              <p className="text-warm-grey leading-relaxed">
                We retain your personal information only for as long as necessary to fulfil the purposes 
                for which it was collected, including to satisfy any legal, accounting, or reporting 
                requirements. Enquiry data is typically retained for 3 years, while marketing preferences 
                are retained until you unsubscribe.
              </p>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">7. Your Rights (GDPR)</h2>
              <p className="text-warm-grey leading-relaxed mb-4">
                Under the General Data Protection Regulation (GDPR), you have the following rights:
              </p>
              <ul className="list-disc pl-6 text-warm-grey space-y-2">
                <li><strong>Right of Access:</strong> Request copies of your personal data</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your data in certain circumstances</li>
                <li><strong>Right to Restrict Processing:</strong> Request limitation of data processing</li>
                <li><strong>Right to Data Portability:</strong> Request transfer of your data</li>
                <li><strong>Right to Object:</strong> Object to processing of your data</li>
                <li><strong>Rights Related to Automated Decision-Making:</strong> Challenge automated decisions</li>
              </ul>
              <p className="text-warm-grey leading-relaxed mt-4">
                To exercise any of these rights, please contact us using the details below.
              </p>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">8. Cookies</h2>
              <p className="text-warm-grey leading-relaxed">
                Our Website uses cookies and similar tracking technologies. For detailed information 
                about the cookies we use and your choices, please see our{" "}
                <Link href="/cookie-policy" className="underline hover:text-primary-black">
                  Cookie Policy
                </Link>.
              </p>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">9. Third-Party Links</h2>
              <p className="text-warm-grey leading-relaxed">
                Our Website may contain links to third-party websites. We are not responsible for the 
                privacy practices or content of these external sites. We encourage you to read the 
                privacy policies of any third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">10. Children&apos;s Privacy</h2>
              <p className="text-warm-grey leading-relaxed">
                Our Website is not intended for children under 16 years of age. We do not knowingly 
                collect personal information from children under 16.
              </p>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">11. Changes to This Policy</h2>
              <p className="text-warm-grey leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes 
                by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">12. Contact Us</h2>
              <p className="text-warm-grey leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-off-white p-6">
                <p className="text-primary-black font-medium mb-2">House of Clarence Ltd</p>
                <p className="text-warm-grey">Company Number: 16501627</p>
                <p className="text-warm-grey">Registered Address: 320 High Street, Harlington, Hayes, England, UB3 5DU</p>
                <p className="text-warm-grey mt-2">Email: privacy@houseofclarence.com</p>
                <p className="text-warm-grey">Phone: 020 3370 4057</p>
              </div>
              <p className="text-warm-grey leading-relaxed mt-4">
                You also have the right to lodge a complaint with the Information Commissioner&apos;s Office (ICO) 
                if you believe your data protection rights have been violated. You can contact the ICO at{" "}
                <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary-black">
                  ico.org.uk
                </a>.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

