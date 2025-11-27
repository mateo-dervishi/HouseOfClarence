# House of Clarence — Luxury Second Fix E-commerce Website

A high-end, luxury minimalist e-commerce website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Luxury Design System** - Minimalist aesthetic with generous whitespace and refined typography
- 🛍️ **E-commerce Functionality** - Product listings, detail pages, and shopping cart
- 🎭 **Smooth Animations** - Subtle micro-interactions using Framer Motion
- 📱 **Fully Responsive** - Mobile-first design that works beautifully on all devices
- 🎯 **Type-Safe** - Built with TypeScript for reliability
- 🚀 **Performance Optimized** - Next.js Image optimization and code splitting

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **UI Components**: Custom components with Shadcn/ui patterns
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
/app
  /layout.tsx          # Root layout with Header/Footer
  /page.tsx            # Homepage
  /[category]          # Category listing pages
    /[product]         # Product detail pages
/components
  /ui                  # Base UI components (Button, Input)
  /layout              # Header, Footer, Navigation
  /product             # ProductCard component
  /cart                # CartDrawer component
/lib
  /utils.ts            # Utility functions
  /constants.ts        # Navigation and category constants
  /mockData.ts         # Sample product data
/stores
  /cartStore.ts        # Zustand cart state management
/types
  /product.ts          # TypeScript type definitions
```

## Design System

### Colors

- **Primary Black**: `#0A0A0A`
- **Soft Black**: `#1A1A1A`
- **Charcoal**: `#2D2D2D`
- **Warm Grey**: `#8A8A8A`
- **Light Grey**: `#E8E8E8`
- **Off White**: `#F8F7F5`
- **Accent Gold**: `#C9A962`

### Typography

- **Display Font**: Geometric sans-serif (Couture-style) for headings
- **Body Font**: Inter for body text
- **Letter Spacing**: Generous tracking (0.2em - 0.3em) for headings
- **Line Height**: Relaxed (1.7-1.8) for body text

## Development

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Next Steps

- [ ] Integrate CMS (Sanity.io or Payload CMS)
- [ ] Set up Stripe for payments
- [ ] Add search functionality
- [ ] Implement advanced filtering
- [ ] Add user authentication
- [ ] Create trade account pages
- [ ] Set up analytics
- [ ] Optimize images and performance

## License

Private project for House of Clarence.

