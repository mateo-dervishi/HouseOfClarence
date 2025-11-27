import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0A0A0A",
          black: "#0A0A0A",
          "soft-black": "#1A1A1A",
          charcoal: "#2D2D2D",
        },
        secondary: {
          DEFAULT: "#8A8A8A",
          "warm-grey": "#8A8A8A",
          "light-grey": "#E8E8E8",
        },
        accent: {
          DEFAULT: "#C9A962",
          gold: "#C9A962",
        },
        muted: {
          DEFAULT: "#F8F7F5",
          "off-white": "#F8F7F5",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-couture)', 'Futura', 'Bodoni Sans', 'Gilroy', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.3em',
        wider: '0.2em',
      },
      lineHeight: {
        relaxed: '1.7',
        'extra-relaxed': '1.8',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

