import { Category } from "@/types/product";

export const NAVIGATION: { name: string; href: string; children?: { name: string; href: string }[] }[] = [
  {
    name: "HOME",
    href: "/",
  },
  {
    name: "BATHROOM",
    href: "/bathroom",
    children: [
      { name: "Bath", href: "/bathroom/bath" },
      { name: "Basins", href: "/bathroom/basins" },
      { name: "Vanity Units", href: "/bathroom/vanity-units" },
      { name: "Counter Tops", href: "/bathroom/counter-tops" },
      { name: "Toilets", href: "/bathroom/toilets" },
      { name: "Showers", href: "/bathroom/showers" },
      { name: "Taps", href: "/bathroom/taps" },
      { name: "Mirrors", href: "/bathroom/mirrors" },
      { name: "Accessories", href: "/bathroom/accessories" },
    ],
  },
  {
    name: "KITCHEN",
    href: "/kitchen",
    children: [
      { name: "Kitchen Sinks", href: "/kitchen/sinks" },
      { name: "Kitchen Taps", href: "/kitchen/taps" },
      { name: "Kitchen Accessories", href: "/kitchen/accessories" },
      { name: "Kitchen Hardware", href: "/kitchen/hardware" },
      { name: "Kitchen Theme", href: "/kitchen/theme" },
    ],
  },
  {
    name: "FURNITURE",
    href: "/furniture",
    children: [
      { name: "Living Room Furniture", href: "/furniture/living-room" },
      { name: "Dining Room Furniture", href: "/furniture/dining-room" },
      { name: "Bedroom Furniture", href: "/furniture/bedroom" },
      { name: "Study Room Furniture", href: "/furniture/study-room" },
      { name: "Outdoor Furniture", href: "/furniture/outdoor" },
    ],
  },
  {
    name: "TILING",
    href: "/tiling",
    children: [
      { name: "Porcelain Tiles", href: "/tiling/porcelain" },
      { name: "Marble Tiles", href: "/tiling/marble" },
      { name: "Mosaic Tiles", href: "/tiling/mosaic" },
      { name: "Terrazzo Tiles", href: "/tiling/terrazzo" },
      { name: "Wall Tiles", href: "/tiling/wall-tiles" },
      { name: "Floor Tiles", href: "/tiling/floor-tiles" },
    ],
  },
  {
    name: "LIGHTING",
    href: "/lighting",
    children: [
      { name: "Pendant Light", href: "/lighting/pendant" },
      { name: "Wall Lights", href: "/lighting/wall-lights" },
      { name: "Ceiling Lights", href: "/lighting/ceiling-lights" },
      { name: "Floor Lamps", href: "/lighting/floor-lamps" },
      { name: "Outdoor Lights", href: "/lighting/outdoor-lights" },
    ],
  },
  {
    name: "ELECTRICAL",
    href: "/electrical",
    children: [
      { name: "Switches", href: "/electrical/switches" },
      { name: "Sockets", href: "/electrical/sockets" },
    ],
  },
  {
    name: "PROJECTS",
    href: "/projects",
  },
  {
    name: "ABOUT",
    href: "/about",
  },
  {
    name: "CONTACT",
    href: "/contact",
  },
];

export const CATEGORIES: Category[] = [
  {
    id: "bathroom",
    name: "Bathroom",
    slug: "bathroom",
    description: "Premium bathroom fixtures and fittings",
  },
  {
    id: "kitchen",
    name: "Kitchen",
    slug: "kitchen",
    description: "Luxury kitchen fixtures and accessories",
  },
  {
    id: "furniture",
    name: "Furniture",
    slug: "furniture",
    description: "Curated furniture collections",
  },
  {
    id: "tiling",
    name: "Tiling",
    slug: "tiling",
    description: "Luxury tiles and natural stone",
  },
  {
    id: "lighting",
    name: "Lighting",
    slug: "lighting",
    description: "Designer lighting solutions",
  },
  {
    id: "electrical",
    name: "Electrical",
    slug: "electrical",
    description: "Premium electrical fittings",
  },
];
