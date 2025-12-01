import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

