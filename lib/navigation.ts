export interface ProductType {
  name: string;
  slug: string;
}

export interface Subcategory {
  name: string;
  slug: string;
  types: ProductType[];
}

export interface Category {
  name: string;
  slug: string;
  subcategories: Subcategory[];
}

export const navigationData: Category[] = [
  // ═══════════════════════════════════════════════════════════
  // BATHROOM
  // ═══════════════════════════════════════════════════════════
  {
    name: "Bathroom",
    slug: "bathroom",
    subcategories: [
      {
        name: "Baths",
        slug: "baths",
        types: [
          { name: "Freestanding Baths", slug: "freestanding-baths" },
          { name: "Stone Baths", slug: "stone-baths" },
          { name: "Acrylic Baths", slug: "acrylic-baths" },
          { name: "Cast Iron Baths", slug: "cast-iron-baths" },
          { name: "Traditional Baths", slug: "traditional-baths" },
          { name: "Modern Baths", slug: "modern-baths" },
          { name: "Slipper Baths", slug: "slipper-baths" },
        ],
      },
      {
        name: "Basins",
        slug: "basins",
        types: [
          { name: "Countertop Basins", slug: "countertop-basins" },
          { name: "Wall Hung Basins", slug: "wall-hung-basins" },
          { name: "Pedestal Basins", slug: "pedestal-basins" },
          { name: "Stone Basins", slug: "stone-basins" },
          { name: "Marble Basins", slug: "marble-basins" },
          { name: "Ceramic Basins", slug: "ceramic-basins" },
          { name: "Cloakroom Basins", slug: "cloakroom-basins" },
        ],
      },
      {
        name: "Vanity Units",
        slug: "vanity-units",
        types: [
          { name: "Freestanding Vanity Units", slug: "freestanding-vanity-units" },
          { name: "Wall Hung Vanity Units", slug: "wall-hung-vanity-units" },
          { name: "Double Vanity Units", slug: "double-vanity-units" },
          { name: "Traditional Vanity Units", slug: "traditional-vanity-units" },
          { name: "Modern Vanity Units", slug: "modern-vanity-units" },
          { name: "Cloakroom Vanity Units", slug: "cloakroom-vanity-units" },
          { name: "Marble Vanity Units", slug: "marble-vanity-units" },
        ],
      },
      {
        name: "Counter Tops",
        slug: "counter-tops",
        types: [
          { name: "Stone Countertops", slug: "stone-countertops" },
          { name: "Marble Countertops", slug: "marble-countertops" },
          { name: "Quartz Countertops", slug: "quartz-countertops" },
          { name: "Solid Surface Countertops", slug: "solid-surface-countertops" },
          { name: "Floating Shelves", slug: "floating-shelves" },
        ],
      },
      {
        name: "Toilets",
        slug: "toilets",
        types: [
          { name: "Close Coupled Toilets", slug: "close-coupled-toilets" },
          { name: "Wall Hung Toilets", slug: "wall-hung-toilets" },
          { name: "Back to Wall Toilets", slug: "back-to-wall-toilets" },
          { name: "Traditional Toilets", slug: "traditional-toilets" },
          { name: "Smart Toilets", slug: "smart-toilets" },
          { name: "Rimless Toilets", slug: "rimless-toilets" },
        ],
      },
      {
        name: "Showers",
        slug: "showers",
        types: [
          { name: "Shower Enclosures", slug: "shower-enclosures" },
          { name: "Walk-in Showers", slug: "walk-in-showers" },
          { name: "Shower Screens", slug: "shower-screens" },
          { name: "Shower Doors", slug: "shower-doors" },
          { name: "Shower Sets", slug: "shower-sets" },
          { name: "Shower Trays", slug: "shower-trays" },
          { name: "Thermostatic Showers", slug: "thermostatic-showers" },
        ],
      },
      {
        name: "Taps",
        slug: "taps",
        types: [
          { name: "Basin Taps", slug: "basin-taps" },
          { name: "Bath Taps", slug: "bath-taps" },
          { name: "Mixer Taps", slug: "mixer-taps" },
          { name: "Wall Mounted Taps", slug: "wall-mounted-taps" },
          { name: "Freestanding Bath Taps", slug: "freestanding-bath-taps" },
          { name: "Traditional Taps", slug: "traditional-taps" },
          { name: "Modern Taps", slug: "modern-taps" },
        ],
      },
      {
        name: "Mirrors",
        slug: "mirrors",
        types: [
          { name: "LED Mirrors", slug: "led-mirrors" },
          { name: "Illuminated Mirrors", slug: "illuminated-mirrors" },
          { name: "Round Mirrors", slug: "round-mirrors" },
          { name: "Rectangular Mirrors", slug: "rectangular-mirrors" },
          { name: "Oval Mirrors", slug: "oval-mirrors" },
          { name: "Cosmetic Mirrors", slug: "cosmetic-mirrors" },
        ],
      },
      {
        name: "Accessories",
        slug: "accessories",
        types: [
          { name: "Towel Rails", slug: "towel-rails" },
          { name: "Toilet Roll Holders", slug: "toilet-roll-holders" },
          { name: "Soap Dispensers", slug: "soap-dispensers" },
          { name: "Robe Hooks", slug: "robe-hooks" },
          { name: "Toilet Brushes", slug: "toilet-brushes" },
          { name: "Shower Accessories", slug: "shower-accessories" },
          { name: "Bath Accessories", slug: "bath-accessories" },
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════
  // KITCHEN
  // ═══════════════════════════════════════════════════════════
  {
    name: "Kitchen",
    slug: "kitchen",
    subcategories: [
      {
        name: "Kitchen Sinks",
        slug: "kitchen-sinks",
        types: [
          { name: "Ceramic Sinks", slug: "ceramic-sinks" },
          { name: "Marble Sinks", slug: "marble-sinks" },
          { name: "Stainless Steel Sinks", slug: "stainless-steel-sinks" },
          { name: "Undermount Sinks", slug: "undermount-sinks" },
          { name: "Belfast Sinks", slug: "belfast-sinks" },
          { name: "Butler Sinks", slug: "butler-sinks" },
          { name: "Double Bowl Sinks", slug: "double-bowl-sinks" },
          { name: "Workstation Sinks", slug: "workstation-sinks" },
        ],
      },
      {
        name: "Kitchen Taps",
        slug: "kitchen-taps",
        types: [
          { name: "Mixer Taps", slug: "mixer-taps" },
          { name: "Pull Out Taps", slug: "pull-out-taps" },
          { name: "Boiling Water Taps", slug: "boiling-water-taps" },
          { name: "Traditional Kitchen Taps", slug: "traditional-kitchen-taps" },
          { name: "Modern Kitchen Taps", slug: "modern-kitchen-taps" },
          { name: "Black Kitchen Taps", slug: "black-kitchen-taps" },
          { name: "Gold Kitchen Taps", slug: "gold-kitchen-taps" },
        ],
      },
      {
        name: "Kitchen Accessories",
        slug: "kitchen-accessories",
        types: [
          { name: "Soap Dispensers", slug: "soap-dispensers" },
          { name: "Draining Boards", slug: "draining-boards" },
          { name: "Sink Strainers", slug: "sink-strainers" },
          { name: "Chopping Boards", slug: "chopping-boards" },
          { name: "Sink Grids", slug: "sink-grids" },
        ],
      },
      {
        name: "Kitchen Hardware",
        slug: "kitchen-hardware",
        types: [
          { name: "Cabinet Handles", slug: "cabinet-handles" },
          { name: "Cabinet Knobs", slug: "cabinet-knobs" },
          { name: "Pull Bars", slug: "pull-bars" },
          { name: "Cup Pulls", slug: "cup-pulls" },
          { name: "T-Bar Handles", slug: "t-bar-handles" },
          { name: "Edge Pulls", slug: "edge-pulls" },
        ],
      },
      {
        name: "Kitchen Theme",
        slug: "kitchen-theme",
        types: [
          { name: "Modern Kitchen", slug: "modern-kitchen" },
          { name: "Traditional Kitchen", slug: "traditional-kitchen" },
          { name: "Industrial Kitchen", slug: "industrial-kitchen" },
          { name: "Minimalist Kitchen", slug: "minimalist-kitchen" },
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════
  // FURNITURE
  // ═══════════════════════════════════════════════════════════
  {
    name: "Furniture",
    slug: "furniture",
    subcategories: [
      {
        name: "Living Room Furniture",
        slug: "living-room-furniture",
        types: [
          { name: "Sofas", slug: "sofas" },
          { name: "Armchairs", slug: "armchairs" },
          { name: "Coffee Tables", slug: "coffee-tables" },
          { name: "Side Tables", slug: "side-tables" },
          { name: "Console Tables", slug: "console-tables" },
          { name: "TV Units", slug: "tv-units" },
          { name: "Bookcases", slug: "bookcases" },
        ],
      },
      {
        name: "Dining Room Furniture",
        slug: "dining-room-furniture",
        types: [
          { name: "Dining Tables", slug: "dining-tables" },
          { name: "Dining Chairs", slug: "dining-chairs" },
          { name: "Bar Stools", slug: "bar-stools" },
          { name: "Sideboards", slug: "sideboards" },
          { name: "Dining Benches", slug: "dining-benches" },
          { name: "Display Cabinets", slug: "display-cabinets" },
        ],
      },
      {
        name: "Bedroom Furniture",
        slug: "bedroom-furniture",
        types: [
          { name: "Beds", slug: "beds" },
          { name: "Wardrobes", slug: "wardrobes" },
          { name: "Bedside Tables", slug: "bedside-tables" },
          { name: "Dressers", slug: "dressers" },
          { name: "Chests of Drawers", slug: "chests-of-drawers" },
          { name: "Dressing Tables", slug: "dressing-tables" },
        ],
      },
      {
        name: "Study Room Furniture",
        slug: "study-room-furniture",
        types: [
          { name: "Desks", slug: "desks" },
          { name: "Office Chairs", slug: "office-chairs" },
          { name: "Bookcases", slug: "bookcases" },
          { name: "Filing Cabinets", slug: "filing-cabinets" },
          { name: "Shelving Units", slug: "shelving-units" },
        ],
      },
      {
        name: "Outdoor Furniture",
        slug: "outdoor-furniture",
        types: [
          { name: "Outdoor Sofas", slug: "outdoor-sofas" },
          { name: "Outdoor Dining Tables", slug: "outdoor-dining-tables" },
          { name: "Outdoor Chairs", slug: "outdoor-chairs" },
          { name: "Sun Loungers", slug: "sun-loungers" },
          { name: "Garden Benches", slug: "garden-benches" },
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════
  // TILING
  // ═══════════════════════════════════════════════════════════
  {
    name: "Tiling",
    slug: "tiling",
    subcategories: [
      {
        name: "Porcelain Tiles",
        slug: "porcelain-tiles",
        types: [
          { name: "Matt Porcelain", slug: "matt-porcelain" },
          { name: "Polished Porcelain", slug: "polished-porcelain" },
          { name: "Large Format Porcelain", slug: "large-format-porcelain" },
          { name: "Wood Effect Porcelain", slug: "wood-effect-porcelain" },
          { name: "Stone Effect Porcelain", slug: "stone-effect-porcelain" },
          { name: "Concrete Effect Porcelain", slug: "concrete-effect-porcelain" },
        ],
      },
      {
        name: "Marble Tiles",
        slug: "marble-tiles",
        types: [
          { name: "Carrara Marble", slug: "carrara-marble" },
          { name: "Calacatta Marble", slug: "calacatta-marble" },
          { name: "Statuario Marble", slug: "statuario-marble" },
          { name: "Nero Marquina", slug: "nero-marquina" },
          { name: "Honed Marble", slug: "honed-marble" },
          { name: "Polished Marble", slug: "polished-marble" },
        ],
      },
      {
        name: "Mosaic Tiles",
        slug: "mosaic-tiles",
        types: [
          { name: "Hexagon Mosaic", slug: "hexagon-mosaic" },
          { name: "Linear Mosaic", slug: "linear-mosaic" },
          { name: "Penny Round Mosaic", slug: "penny-round-mosaic" },
          { name: "Herringbone Mosaic", slug: "herringbone-mosaic" },
          { name: "Fish Scale Mosaic", slug: "fish-scale-mosaic" },
          { name: "Glass Mosaic", slug: "glass-mosaic" },
        ],
      },
      {
        name: "Terrazzo Tiles",
        slug: "terrazzo-tiles",
        types: [
          { name: "Classic Terrazzo", slug: "classic-terrazzo" },
          { name: "Modern Terrazzo", slug: "modern-terrazzo" },
          { name: "Large Chip Terrazzo", slug: "large-chip-terrazzo" },
          { name: "Small Chip Terrazzo", slug: "small-chip-terrazzo" },
        ],
      },
      {
        name: "Wall Tiles",
        slug: "wall-tiles",
        types: [
          { name: "Glazed Wall Tiles", slug: "glazed-wall-tiles" },
          { name: "Matt Wall Tiles", slug: "matt-wall-tiles" },
          { name: "Gloss Wall Tiles", slug: "gloss-wall-tiles" },
          { name: "Subway Tiles", slug: "subway-tiles" },
          { name: "Splashback Tiles", slug: "splashback-tiles" },
        ],
      },
      {
        name: "Floor Tiles",
        slug: "floor-tiles",
        types: [
          { name: "Indoor Floor Tiles", slug: "indoor-floor-tiles" },
          { name: "Outdoor Floor Tiles", slug: "outdoor-floor-tiles" },
          { name: "Anti-Slip Tiles", slug: "anti-slip-tiles" },
          { name: "Patterned Floor Tiles", slug: "patterned-floor-tiles" },
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════
  // LIGHTING
  // ═══════════════════════════════════════════════════════════
  {
    name: "Lighting",
    slug: "lighting",
    subcategories: [
      {
        name: "Pendant Lights",
        slug: "pendant-lights",
        types: [
          { name: "Glass Pendants", slug: "glass-pendants" },
          { name: "Metal Pendants", slug: "metal-pendants" },
          { name: "Alabaster Pendants", slug: "alabaster-pendants" },
          { name: "Cluster Pendants", slug: "cluster-pendants" },
          { name: "Kitchen Island Pendants", slug: "kitchen-island-pendants" },
          { name: "Dining Pendants", slug: "dining-pendants" },
        ],
      },
      {
        name: "Wall Lights",
        slug: "wall-lights",
        types: [
          { name: "Wall Sconces", slug: "wall-sconces" },
          { name: "Picture Lights", slug: "picture-lights" },
          { name: "Bathroom Wall Lights", slug: "bathroom-wall-lights" },
          { name: "Bedroom Wall Lights", slug: "bedroom-wall-lights" },
          { name: "Up & Down Lights", slug: "up-down-lights" },
        ],
      },
      {
        name: "Ceiling Lights",
        slug: "ceiling-lights",
        types: [
          { name: "Flush Mount", slug: "flush-mount" },
          { name: "Semi-Flush Mount", slug: "semi-flush-mount" },
          { name: "Chandeliers", slug: "chandeliers" },
          { name: "Spotlights", slug: "spotlights" },
          { name: "Track Lighting", slug: "track-lighting" },
        ],
      },
      {
        name: "Floor Lamps",
        slug: "floor-lamps",
        types: [
          { name: "Arc Floor Lamps", slug: "arc-floor-lamps" },
          { name: "Tripod Floor Lamps", slug: "tripod-floor-lamps" },
          { name: "Reading Floor Lamps", slug: "reading-floor-lamps" },
          { name: "Torchiere Floor Lamps", slug: "torchiere-floor-lamps" },
        ],
      },
      {
        name: "Outdoor Lights",
        slug: "outdoor-lights",
        types: [
          { name: "Outdoor Wall Lights", slug: "outdoor-wall-lights" },
          { name: "Post Lights", slug: "post-lights" },
          { name: "Bollard Lights", slug: "bollard-lights" },
          { name: "Pathway Lights", slug: "pathway-lights" },
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════
  // ELECTRICAL
  // ═══════════════════════════════════════════════════════════
  {
    name: "Electrical",
    slug: "electrical",
    subcategories: [
      {
        name: "Switches",
        slug: "switches",
        types: [
          { name: "1 Gang Switches", slug: "1-gang-switches" },
          { name: "2 Gang Switches", slug: "2-gang-switches" },
          { name: "3 Gang Switches", slug: "3-gang-switches" },
          { name: "Dimmer Switches", slug: "dimmer-switches" },
          { name: "Isolator Switches", slug: "isolator-switches" },
          { name: "Blank Plates", slug: "blank-plates" },
        ],
      },
      {
        name: "Sockets",
        slug: "sockets",
        types: [
          { name: "Single Sockets", slug: "single-sockets" },
          { name: "Double Sockets", slug: "double-sockets" },
          { name: "USB Sockets", slug: "usb-sockets" },
          { name: "USB-C Sockets", slug: "usb-c-sockets" },
          { name: "Shaver Sockets", slug: "shaver-sockets" },
          { name: "Cooker Control Units", slug: "cooker-control-units" },
        ],
      },
    ],
  },
];

