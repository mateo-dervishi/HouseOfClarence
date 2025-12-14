import { Product } from "@/types/product";
import { mockProducts } from "./mockData";

// Define complementary product relationships
// Maps subcategory to list of subcategories that pair well with it
const complementaryPairs: Record<string, string[]> = {
  // Bathroom
  "basins": ["taps", "vanity-units", "mirrors"],
  "baths": ["bath-taps", "bath-screens", "shower-heads"],
  "bath-taps": ["baths", "bath-screens"],
  "taps": ["basins", "vanity-units"],
  "vanity-units": ["basins", "taps", "mirrors"],
  "toilets": ["toilet-seats", "cisterns"],
  "showers": ["shower-heads", "shower-screens", "shower-trays"],
  "shower-heads": ["showers", "shower-screens"],
  
  // Kitchen
  "kitchen-sinks": ["kitchen-taps", "kitchen-hardware"],
  "kitchen-taps": ["kitchen-sinks", "kitchen-hardware"],
  "kitchen-hardware": ["kitchen-taps", "kitchen-sinks"],
  
  // Tiling
  "marble-tiles": ["porcelain-tiles", "mosaic-tiles"],
  "porcelain-tiles": ["marble-tiles", "ceramic-tiles"],
  "mosaic-tiles": ["marble-tiles", "porcelain-tiles"],
  "ceramic-tiles": ["porcelain-tiles", "marble-tiles"],
  
  // Lighting
  "pendant-lights": ["wall-lights", "ceiling-lights", "floor-lamps"],
  "wall-lights": ["pendant-lights", "ceiling-lights", "table-lamps"],
  "floor-lamps": ["table-lamps", "wall-lights"],
  "table-lamps": ["floor-lamps", "wall-lights"],
  "ceiling-lights": ["pendant-lights", "wall-lights"],
  
  // Electrical
  "switches": ["sockets", "dimmers"],
  "sockets": ["switches", "usb-outlets"],
  "dimmers": ["switches", "sockets"],
  
  // Furniture
  "sofas": ["armchairs", "coffee-tables", "side-tables"],
  "armchairs": ["sofas", "side-tables", "floor-lamps"],
  "dining-tables": ["dining-chairs", "pendant-lights"],
  "dining-chairs": ["dining-tables"],
  "beds": ["bedside-tables", "headboards", "table-lamps"],
  "bedside-tables": ["beds", "table-lamps"],
};

// Cross-category recommendations (different category but complementary)
const crossCategoryPairs: Record<string, { category: string; subcategories: string[] }[]> = {
  "bathroom": [
    { category: "lighting", subcategories: ["wall-lights", "ceiling-lights"] },
    { category: "electrical", subcategories: ["switches", "sockets"] },
    { category: "tiling", subcategories: ["marble-tiles", "porcelain-tiles", "mosaic-tiles"] },
  ],
  "kitchen": [
    { category: "lighting", subcategories: ["pendant-lights", "ceiling-lights"] },
    { category: "electrical", subcategories: ["switches", "sockets"] },
    { category: "tiling", subcategories: ["porcelain-tiles", "ceramic-tiles"] },
  ],
  "furniture": [
    { category: "lighting", subcategories: ["floor-lamps", "table-lamps", "pendant-lights"] },
  ],
};

/**
 * Get products that pair well with the given product
 * Based on complementary subcategories and matching style attributes
 */
export function getPairsWellWith(product: Product, limit: number = 4): Product[] {
  const results: Product[] = [];
  const productMaterial = product.specifications.material.toLowerCase();
  const productFinish = product.specifications.finish.toLowerCase();
  const productColour = product.specifications.colour.toLowerCase();

  // 1. Find complementary subcategories
  const complementary = complementaryPairs[product.subcategory] || [];
  
  // 2. Get products from complementary subcategories
  const complementaryProducts = mockProducts.filter(p => 
    p.id !== product.id && 
    complementary.includes(p.subcategory)
  );

  // 3. Score and sort by style matching
  const scored = complementaryProducts.map(p => {
    let score = 0;
    const pMaterial = p.specifications.material.toLowerCase();
    const pFinish = p.specifications.finish.toLowerCase();
    const pColour = p.specifications.colour.toLowerCase();

    // Material match (e.g., both brass, both marble)
    if (pMaterial.includes(productMaterial) || productMaterial.includes(pMaterial)) score += 3;
    
    // Finish match (e.g., both brushed, both polished)
    if (pFinish === productFinish) score += 2;
    if (pFinish.includes(productFinish) || productFinish.includes(pFinish)) score += 1;
    
    // Colour similarity
    if (pColour === productColour) score += 2;
    if (pColour.includes(productColour) || productColour.includes(pColour)) score += 1;

    // Featured/New bonus
    if (p.isFeatured) score += 0.5;
    if (p.isNew) score += 0.5;

    return { product: p, score };
  });

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);
  
  // Add top scored products
  results.push(...scored.slice(0, limit).map(s => s.product));

  // 4. If we don't have enough, add cross-category recommendations
  if (results.length < limit) {
    const crossCategory = crossCategoryPairs[product.category.slug] || [];
    
    for (const cc of crossCategory) {
      if (results.length >= limit) break;
      
      const crossProducts = mockProducts.filter(p =>
        p.id !== product.id &&
        p.category.slug === cc.category &&
        cc.subcategories.includes(p.subcategory) &&
        !results.find(r => r.id === p.id)
      );

      // Score by style match
      const crossScored = crossProducts.map(p => {
        let score = 0;
        const pFinish = p.specifications.finish.toLowerCase();
        const pColour = p.specifications.colour.toLowerCase();
        
        if (pFinish === productFinish) score += 2;
        if (pColour.includes(productColour) || productColour.includes(pColour)) score += 1;
        if (p.isFeatured) score += 0.5;
        
        return { product: p, score };
      });

      crossScored.sort((a, b) => b.score - a.score);
      
      const remaining = limit - results.length;
      results.push(...crossScored.slice(0, remaining).map(s => s.product));
    }
  }

  return results;
}

/**
 * Get products with similar style (material, finish, colour)
 * from any category
 */
export function getSimilarStyle(product: Product, limit: number = 4): Product[] {
  const productMaterial = product.specifications.material.toLowerCase();
  const productFinish = product.specifications.finish.toLowerCase();
  const productColour = product.specifications.colour.toLowerCase();

  // Score all other products
  const scored = mockProducts
    .filter(p => p.id !== product.id)
    .map(p => {
      let score = 0;
      const pMaterial = p.specifications.material.toLowerCase();
      const pFinish = p.specifications.finish.toLowerCase();
      const pColour = p.specifications.colour.toLowerCase();

      // Material match is strongest
      if (pMaterial === productMaterial) score += 4;
      if (pMaterial.includes(productMaterial) || productMaterial.includes(pMaterial)) score += 2;

      // Finish match
      if (pFinish === productFinish) score += 3;
      if (pFinish.includes(productFinish) || productFinish.includes(pFinish)) score += 1;

      // Colour match
      if (pColour === productColour) score += 2;
      if (pColour.includes(productColour) || productColour.includes(pColour)) score += 1;

      // Prefer different categories for variety
      if (p.category.slug !== product.category.slug) score += 1;

      // Featured bonus
      if (p.isFeatured) score += 0.5;

      return { product: p, score };
    });

  // Sort by score and return top results
  scored.sort((a, b) => b.score - a.score);
  
  // Filter to only include products with meaningful similarity (score > 2)
  return scored
    .filter(s => s.score > 2)
    .slice(0, limit)
    .map(s => s.product);
}

/**
 * Get more products from the same subcategory
 */
export function getMoreFromCollection(product: Product, limit: number = 4): Product[] {
  return mockProducts
    .filter(p => 
      p.id !== product.id && 
      p.subcategory === product.subcategory
    )
    .slice(0, limit);
}

/**
 * Get all recommendations for a product
 */
export function getProductRecommendations(product: Product): {
  pairsWellWith: Product[];
  similarStyle: Product[];
  moreFromCollection: Product[];
} {
  return {
    pairsWellWith: getPairsWellWith(product, 4),
    similarStyle: getSimilarStyle(product, 4),
    moreFromCollection: getMoreFromCollection(product, 4),
  };
}

