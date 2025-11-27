export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProductVideo {
  id: string;
  url: string;
  thumbnail: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  priceExVat: number;
  salePrice?: number;
  salePriceExVat?: number;
  stock: number;
  attributes: {
    [key: string]: string; // e.g., { color: "Natural Oak", size: "800mm" }
  };
}

export interface ProductSpecifications {
  material: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  weight?: number;
  colour: string;
  finish: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  sku: string;
  category: Category;
  subcategory: string;
  description: string;
  specifications: ProductSpecifications;
  pricing: {
    price: number; // Inc VAT
    priceExVat: number;
    salePrice?: number;
    salePriceExVat?: number;
  };
  variants: ProductVariant[];
  images: ProductImage[];
  videos?: ProductVideo[];
  relatedProducts: string[];
  tags: string[];
  stock: number;
  isNew: boolean;
  isFeatured: boolean;
  deliveryInfo: string;
}

export interface CartItem {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}

