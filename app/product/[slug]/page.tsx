"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { mockProducts } from "@/lib/mockData";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { Button } from "@/components/ui/button";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const router = useRouter();

  const product = mockProducts.find((p) => p.slug === params.slug);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <h1 className="text-6xl md:text-8xl font-display tracking-widest mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl tracking-widest mb-4">
          PRODUCT NOT FOUND
        </h2>
        <p className="text-warm-grey mb-8 max-w-md">
          The product you are looking for does not exist.
        </p>
        <Button onClick={() => router.push("/")}>RETURN TO HOME</Button>
      </div>
    );
  }

  // Transform product data for ProductInfo component (no pricing)
  const productInfoData = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    sku: product.sku,
    colour: product.specifications.colour,
    image: product.images[0]?.url || "",
    variants: product.variants.map((v) => ({
      slug: v.id,
      colourName: v.attributes.colour || product.specifications.colour,
      colourHex: v.attributes.colourHex || "#C9A962",
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
    category: product.category.slug,
    subcategory: product.subcategory,
  };

  const relatedProducts = mockProducts
    .filter((p) => p.id !== product.id && p.category.id === product.category.id)
    .slice(0, 6);

  return (
    <main className="pt-14">
      {/* Breadcrumb */}
      <nav className="max-w-[1600px] mx-auto px-6 py-6">
        <ol className="flex items-center gap-2 text-[12px] tracking-[0.05em] text-warm-grey">
          <li>
            <Link href="/" className="hover:text-primary-black transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href={`/${product.category.slug}`}
              className="hover:text-primary-black transition-colors capitalize"
            >
              {product.category.name}
            </Link>
          </li>
          <li>/</li>
          <li className="text-primary-black">{product.name}</li>
        </ol>
      </nav>

      {/* Product Section */}
      <section className="max-w-[1600px] mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* LEFT: Image Gallery */}
          <ProductGallery images={product.images} name={product.name} />

          {/* RIGHT: Product Info */}
          <ProductInfo product={productInfoData} />
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-light-grey py-16">
          <div className="max-w-[1600px] mx-auto px-6">
            <h2 className="text-center text-[15px] tracking-[0.2em] uppercase mb-12">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
