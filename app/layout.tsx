import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SelectionSyncProvider } from "@/components/providers/SelectionSyncProvider";
import { QuickViewProvider } from "@/components/product/QuickViewProvider";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Using Inter as base, we'll style headings with display font via CSS
export const metadata: Metadata = {
  title: "House of Clarence | Luxury Second Fix & Construction Finishing Materials",
  description: "Curated collections of premium bathroom, lighting, and interior finishing materials for discerning spaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Favicon for light mode (black icon) */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-black-32.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-black-16.png"
          media="(prefers-color-scheme: light)"
        />
        {/* Favicon for dark mode (white icon) */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-white-32.png"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-white-16.png"
          media="(prefers-color-scheme: dark)"
        />
        {/* Apple Touch Icon */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon-light.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon-dark.png"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body className="antialiased">
        <SelectionSyncProvider>
          <QuickViewProvider>
            {children}
          </QuickViewProvider>
        </SelectionSyncProvider>
      </body>
    </html>
  );
}

