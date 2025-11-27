"use client";

import { useRouter } from "next/navigation";
import { mockProducts } from "@/lib/mockData";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { Button } from "@/components/ui/button";

interface ProductPageProps {
  params: {
    category: string;
    product: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const router = useRouter();

  const product = mockProducts.find(
    (p) => p.slug === params.product && p.category.slug === params.category
  );

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <h1 className="text-6xl md:text-8xl font-display tracking-widest mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl tracking-widest mb-4">PRODUCT NOT FOUND</h2>
        <p className="text-warm-grey mb-8 max-w-md">
          The product you are looking for does not exist.
        </p>
        <Button onClick={() => router.push("/")}>RETURN TO HOME</Button>
      </div>
    );
  }

  // Transform product data for ProductInfo component
  const productInfoData = {
    name: product.name,
    sku: product.sku,
    colour: product.specifications.colour,
    variants: product.variants.map((v) => ({
      slug: v.id,
      colourName: v.attributes.colour || product.specifications.colour,
      colourHex: "#C9A962", // Default accent gold, can be enhanced later
    })),
    description: product.description,
    specifications: [
      { label: "Material", value: product.specifications.material },
      {
        label: "Dimensions",
        value: `${product.specifications.dimensions.width}mm × ${product.specifications.dimensions.height}mm × ${product.specifications.dimensions.depth}mm`,
      },
      { label: "Colour", value: product.specifications.colour },
      { label: "Finish", value: product.specifications.finish },
    ],
  };

  const relatedProducts = mockProducts
    .filter((p) => p.id !== product.id && p.category.id === product.category.id)
    .slice(0, 6);

  return (
    <main className="pt-32">
      {/* Breadcrumb */}
      <nav className="max-w-[1600px] mx-auto px-6 py-4">
        <ol className="flex items-center gap-2 text-[11px] tracking-[0.05em] text-warm-grey uppercase">
          <li>
            <a href="/" className="hover:text-primary-black transition-colors">
              Home
            </a>
          </li>
          <li>/</li>
          <li>
            <a
              href={`/${product.category.slug}`}
              className="hover:text-primary-black transition-colors"
            >
              {product.category.name}
            </a>
          </li>
          <li>/</li>
          <li className="text-primary-black">{product.name}</li>
        </ol>
      </nav>

      {/* Product Section */}
      <section className="max-w-[1600px] mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT: Image Gallery */}
          <ProductGallery images={product.images} name={product.name} />

          {/* RIGHT: Product Info */}
          <div className="lg:sticky lg:top-36 lg:self-start">
            <ProductInfo product={productInfoData} />
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-[1600px] mx-auto px-6 py-16 border-t border-light-grey">
          <h2 className="text-2xl tracking-[0.15em] uppercase font-display font-light mb-12 text-center">
            Related Products
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
