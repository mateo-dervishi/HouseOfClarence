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
      { name: "Vanity Units", href: "/bathroom/vanity-units" },
      { name: "Mirrors", href: "/bathroom/mirrors" },
      { name: "Bathtubs", href: "/bathroom/bathtubs" },
      { name: "Shower Enclosures", href: "/bathroom/shower-enclosures" },
      { name: "Taps & Mixers", href: "/bathroom/taps-mixers" },
    ],
  },
  {
    name: "TILES",
    href: "/tiles",
    children: [
      { name: "Porcelain", href: "/tiles/porcelain" },
      { name: "Mosaic", href: "/tiles/mosaic" },
      { name: "Natural Stone", href: "/tiles/natural-stone" },
      { name: "Wall Tiles", href: "/tiles/wall-tiles" },
    ],
  },
  {
    name: "LIGHTING",
    href: "/lighting",
    children: [
      { name: "Table Lamps", href: "/lighting/table-lamps" },
      { name: "Chandeliers", href: "/lighting/chandeliers" },
      { name: "Bedside", href: "/lighting/bedside" },
      { name: "Pendant", href: "/lighting/pendant" },
      { name: "Wall Lights", href: "/lighting/wall-lights" },
      { name: "Floor Lamps", href: "/lighting/floor-lamps" },
    ],
  },
  {
    name: "HOMEWARE",
    href: "/homeware",
    children: [
      { name: "Furniture", href: "/homeware/furniture" },
      { name: "Soft Furnishings", href: "/homeware/soft-furnishings" },
      { name: "Decorative Objects", href: "/homeware/decorative-objects" },
      { name: "Tableware", href: "/homeware/tableware" },
    ],
  },
  {
    name: "ACCESSORIES",
    href: "/accessories",
    children: [
      { name: "Bathroom Accessories", href: "/accessories/bathroom" },
      { name: "Hardware & Handles", href: "/accessories/hardware-handles" },
      { name: "Storage Solutions", href: "/accessories/storage" },
      { name: "Mirrors", href: "/accessories/mirrors" },
    ],
  },
  {
    name: "HEATING",
    href: "/heating",
    children: [
      { name: "Designer Radiators", href: "/heating/radiators" },
      { name: "Towel Rails", href: "/heating/towel-rails" },
      { name: "Underfloor Heating", href: "/heating/underfloor" },
      { name: "Radiator Valves", href: "/heating/valves" },
    ],
  },
  {
    name: "PROJECTS",
    href: "/projects",
  },
  {
    name: "TRADE",
    href: "/trade",
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
    id: "tiles",
    name: "Tiles",
    slug: "tiles",
    description: "Luxury tiles and natural stone",
  },
  {
    id: "lighting",
    name: "Lighting",
    slug: "lighting",
    description: "Designer lighting solutions",
  },
  {
    id: "homeware",
    name: "Homeware",
    slug: "homeware",
    description: "Curated home accessories",
  },
  {
    id: "accessories",
    name: "Accessories",
    slug: "accessories",
    description: "Finishing touches",
  },
  {
    id: "heating",
    name: "Heating",
    slug: "heating",
    description: "Designer heating solutions",
  },
];

