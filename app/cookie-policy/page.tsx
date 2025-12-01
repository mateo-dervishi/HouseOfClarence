"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CookiePolicyPage() {
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
              <li className="text-primary-black">Cookie Policy</li>
            </ol>
          </nav>
          <h1 className="text-3xl md:text-4xl tracking-[0.15em] font-display uppercase mb-4">
            Cookie Policy
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
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">1. What Are Cookies?</h2>
              <p className="text-warm-grey leading-relaxed">
                Cookies are small text files that are placed on your computer or mobile device when you 
                visit a website. They are widely used to make websites work more efficiently, provide a 
                better user experience, and give us information about how visitors use our site.
              </p>
              <p className="text-warm-grey leading-relaxed mt-4">
                Cookies can be &quot;persistent&quot; or &quot;session&quot; cookies. Persistent cookies remain on your 
                device for a set period, while session cookies are deleted when you close your browser.
              </p>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">2. How We Use Cookies</h2>
              <p className="text-warm-grey leading-relaxed mb-4">
                House of Clarence uses cookies and similar technologies for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-warm-grey space-y-2">
                <li>To enable essential website functionality</li>
                <li>To remember your preferences and settings</li>
                <li>To save your product selections and project lists</li>
                <li>To analyse how visitors use our website</li>
                <li>To improve our website and services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">3. Types of Cookies We Use</h2>
              
              <div className="bg-off-white p-6 mb-6">
                <h3 className="text-lg font-medium mb-3">Essential Cookies</h3>
                <p className="text-warm-grey leading-relaxed mb-4">
                  These cookies are necessary for the website to function properly. They enable core 
                  functionality such as security, network management, and accessibility.
                </p>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-light-grey">
                      <th className="text-left py-2 text-primary-black">Cookie Name</th>
                      <th className="text-left py-2 text-primary-black">Purpose</th>
                      <th className="text-left py-2 text-primary-black">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-warm-grey">
                    <tr className="border-b border-light-grey">
                      <td className="py-2">house-of-clarence-selection</td>
                      <td className="py-2">Stores your product selection list</td>
                      <td className="py-2">Persistent</td>
                    </tr>
                    <tr className="border-b border-light-grey">
                      <td className="py-2">cookie-consent</td>
                      <td className="py-2">Records your cookie preferences</td>
                      <td className="py-2">1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-off-white p-6 mb-6">
                <h3 className="text-lg font-medium mb-3">Analytics Cookies</h3>
                <p className="text-warm-grey leading-relaxed mb-4">
                  These cookies help us understand how visitors interact with our website by collecting 
                  and reporting information anonymously.
                </p>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-light-grey">
                      <th className="text-left py-2 text-primary-black">Cookie Name</th>
                      <th className="text-left py-2 text-primary-black">Purpose</th>
                      <th className="text-left py-2 text-primary-black">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-warm-grey">
                    <tr className="border-b border-light-grey">
                      <td className="py-2">_ga</td>
                      <td className="py-2">Google Analytics - distinguishes users</td>
                      <td className="py-2">2 years</td>
                    </tr>
                    <tr className="border-b border-light-grey">
                      <td className="py-2">_ga_*</td>
                      <td className="py-2">Google Analytics - maintains session state</td>
                      <td className="py-2">2 years</td>
                    </tr>
                    <tr className="border-b border-light-grey">
                      <td className="py-2">_gid</td>
                      <td className="py-2">Google Analytics - distinguishes users</td>
                      <td className="py-2">24 hours</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-off-white p-6">
                <h3 className="text-lg font-medium mb-3">Marketing Cookies</h3>
                <p className="text-warm-grey leading-relaxed mb-4">
                  These cookies are used to track visitors across websites to display relevant 
                  advertisements. We only use these with your consent.
                </p>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-light-grey">
                      <th className="text-left py-2 text-primary-black">Cookie Name</th>
                      <th className="text-left py-2 text-primary-black">Purpose</th>
                      <th className="text-left py-2 text-primary-black">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-warm-grey">
                    <tr className="border-b border-light-grey">
                      <td className="py-2">_fbp</td>
                      <td className="py-2">Facebook Pixel - tracks visits</td>
                      <td className="py-2">3 months</td>
                    </tr>
                    <tr className="border-b border-light-grey">
                      <td className="py-2">_gcl_au</td>
                      <td className="py-2">Google Ads conversion tracking</td>
                      <td className="py-2">3 months</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">4. Third-Party Cookies</h2>
              <p className="text-warm-grey leading-relaxed mb-4">
                In addition to our own cookies, we may use various third-party cookies to report usage 
                statistics and deliver advertisements. These third parties include:
              </p>
              <ul className="list-disc pl-6 text-warm-grey space-y-2">
                <li><strong>Google Analytics:</strong> Web analytics service that tracks and reports 
                website traffic</li>
                <li><strong>Google Ads:</strong> Advertising platform for conversion tracking</li>
                <li><strong>Facebook/Meta:</strong> Social media advertising and analytics</li>
                <li><strong>Hotjar:</strong> Behaviour analytics and user feedback (if enabled)</li>
              </ul>
              <p className="text-warm-grey leading-relaxed mt-4">
                Each third party has its own privacy policy governing their use of cookies. We 
                encourage you to review their policies for more information.
              </p>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">5. Managing Cookies</h2>
              <p className="text-warm-grey leading-relaxed mb-4">
                You have several options for managing cookies:
              </p>

              <h3 className="text-lg font-medium mb-3">Cookie Consent</h3>
              <p className="text-warm-grey leading-relaxed mb-4">
                When you first visit our website, you will see a cookie banner asking for your consent 
                to use non-essential cookies. You can change your preferences at any time by clicking 
                on the cookie settings link in the footer.
              </p>

              <h3 className="text-lg font-medium mb-3">Browser Settings</h3>
              <p className="text-warm-grey leading-relaxed mb-4">
                Most web browsers allow you to control cookies through their settings. You can:
              </p>
              <ul className="list-disc pl-6 text-warm-grey space-y-2">
                <li>Block all cookies</li>
                <li>Accept all cookies</li>
                <li>Delete existing cookies</li>
                <li>Set preferences for certain websites</li>
              </ul>
              <p className="text-warm-grey leading-relaxed mt-4">
                To manage cookies in your browser, please refer to the help documentation for your 
                specific browser:
              </p>
              <ul className="list-disc pl-6 text-warm-grey space-y-2 mt-4">
                <li>
                  <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary-black">
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary-black">
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary-black">
                    Safari
                  </a>
                </li>
                <li>
                  <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary-black">
                    Microsoft Edge
                  </a>
                </li>
              </ul>

              <h3 className="text-lg font-medium mb-3 mt-6">Opt-Out Tools</h3>
              <p className="text-warm-grey leading-relaxed">
                You can opt out of interest-based advertising from participating companies through:
              </p>
              <ul className="list-disc pl-6 text-warm-grey space-y-2 mt-4">
                <li>
                  <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary-black">
                    Network Advertising Initiative
                  </a>
                </li>
                <li>
                  <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary-black">
                    Digital Advertising Alliance
                  </a>
                </li>
                <li>
                  <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary-black">
                    Your Online Choices (EU)
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">6. Impact of Disabling Cookies</h2>
              <p className="text-warm-grey leading-relaxed">
                Please note that if you choose to disable cookies, some features of our website may not 
                function properly. Specifically:
              </p>
              <ul className="list-disc pl-6 text-warm-grey space-y-2 mt-4">
                <li>Your product selection list may not be saved between sessions</li>
                <li>You may need to re-enter preferences each time you visit</li>
                <li>Some interactive features may be unavailable</li>
                <li>We won&apos;t be able to remember your cookie preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">7. Local Storage</h2>
              <p className="text-warm-grey leading-relaxed">
                In addition to cookies, we use local storage (a browser feature similar to cookies) to 
                store your product selection list. This allows your selections to persist even if you 
                close your browser. You can clear local storage through your browser&apos;s developer tools 
                or by clearing all browsing data.
              </p>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">8. Updates to This Policy</h2>
              <p className="text-warm-grey leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices 
                or for operational, legal, or regulatory reasons. Any changes will be posted on this 
                page with an updated &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">9. Contact Us</h2>
              <p className="text-warm-grey leading-relaxed mb-4">
                If you have any questions about our use of cookies, please contact us:
              </p>
              <div className="bg-off-white p-6">
                <p className="text-primary-black font-medium mb-2">House of Clarence</p>
                <p className="text-warm-grey">Email: privacy@houseofclarence.com</p>
                <p className="text-warm-grey">Phone: 020 3370 4057</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl tracking-[0.1em] uppercase font-display mb-4">10. More Information</h2>
              <p className="text-warm-grey leading-relaxed">
                For more information about cookies and how to manage them, visit{" "}
                <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary-black">
                  www.allaboutcookies.org
                </a>
                {" "}or{" "}
                <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary-black">
                  www.youronlinechoices.com
                </a>.
              </p>
              <p className="text-warm-grey leading-relaxed mt-4">
                You can also read our full{" "}
                <Link href="/privacy-policy" className="underline hover:text-primary-black">
                  Privacy Policy
                </Link>{" "}
                for more information about how we handle your personal data.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

