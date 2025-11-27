"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Phone, Plus, Check } from "lucide-react";
import { EnquiryPanel } from "./EnquiryPanel";
import { useSelectionStore } from "@/stores/selectionStore";

interface Props {
  product: {
    id: string;
    slug: string;
    name: string;
    sku: string;
    colour?: string;
    colourHex?: string;
    image: string;
    variants?: {
      slug: string;
      colourName: string;
      colourHex: string;
    }[];
    description: string;
    specifications?: { label: string; value: string }[];
    category: string;
    subcategory: string;
  };
}

export function ProductInfo({ product }: Props) {
  const [openSection, setOpenSection] = useState<string | null>("description");
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  
  const { addItem, isInSelection } = useSelectionStore();
  const isSelected = isInSelection(product.id);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleAddToSelection = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: 0, // Price handled separately via quote
      priceExVat: 0,
      image: product.image,
      colour: product.colour,
      category: product.category,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <>
      <div className="lg:sticky lg:top-24 lg:self-start">
        {/* Breadcrumb mini */}
        <nav className="mb-4">
          <ol className="flex items-center gap-2 text-[11px] tracking-[0.05em] text-warm-grey">
            <li>
              <a href={`/${product.category}`} className="hover:text-primary-black capitalize transition-colors">
                {product.category}
              </a>
            </li>
            <li>/</li>
            <li>
              <a href={`/${product.category}/${product.subcategory}`} className="hover:text-primary-black capitalize transition-colors">
                {product.subcategory}
              </a>
            </li>
          </ol>
        </nav>

        {/* Product Name */}
        <h1 className="text-2xl lg:text-3xl tracking-[0.05em] font-light mb-4">
          {product.name}
        </h1>

        {/* SKU */}
        <p className="text-[12px] text-warm-grey tracking-[0.05em] mb-8">
          SKU: {product.sku}
        </p>

        {/* Colour/Variant Selector */}
        {product.variants && product.variants.length > 0 && (
          <div className="mb-8">
            <p className="text-[12px] tracking-[0.1em] uppercase text-warm-grey mb-3">
              Colour: <span className="text-primary-black">{product.colour}</span>
            </p>
            <div className="flex gap-2">
              {product.variants.map((variant) => (
                <Link
                  key={variant.slug}
                  href={`/product/${variant.slug}`}
                  className={`w-10 h-10 rounded-full border-2 transition-colors ${
                    variant.colourName === product.colour
                      ? "border-primary-black"
                      : "border-light-grey hover:border-warm-grey"
                  }`}
                  style={{ backgroundColor: variant.colourHex }}
                  title={variant.colourName}
                />
              ))}
            </div>
          </div>
        )}

        {/* Pricing Note */}
        <div className="mb-8 p-4 bg-off-white border border-light-grey">
          <p className="text-[13px] text-warm-grey leading-relaxed">
            <span className="font-medium text-primary-black">Pricing on Request</span>
            <br />
            Add to your selection and submit an enquiry to receive a personalised quote. 
            Prices vary based on quantity and project requirements.
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="space-y-3 mb-10">
          {/* Add to Selection Button */}
          <button
            onClick={handleAddToSelection}
            className={`flex items-center justify-center gap-2 w-full py-4 text-[13px] tracking-[0.15em] uppercase transition-all ${
              justAdded
                ? "bg-green-600 text-white"
                : "bg-primary-black text-white hover:bg-charcoal"
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" />
                Added to Selection
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add to Selection
              </>
            )}
          </button>
          
          {/* Enquire Button */}
          <button
            onClick={() => setIsEnquiryOpen(true)}
            className="block w-full py-4 border border-primary-black text-center text-[13px] tracking-[0.15em] uppercase hover:bg-primary-black hover:text-white transition-colors"
          >
            Enquire About This Product
          </button>
          
          {/* Call Button */}
          <a
            href="tel:+442033704057"
            className="flex items-center justify-center gap-2 w-full py-4 border border-light-grey text-warm-grey text-[13px] tracking-[0.15em] uppercase hover:border-primary-black hover:text-primary-black transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call: 020 3370 4057
          </a>
        </div>

        {/* Collapsible Sections */}
        <div className="border-t border-light-grey">
          {/* Description */}
          <div className="border-b border-light-grey">
            <button
              onClick={() => toggleSection("description")}
              className="w-full flex items-center justify-between py-5 text-left"
            >
              <span className="text-[13px] tracking-[0.1em] uppercase">
                Description
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  openSection === "description" ? "rotate-180" : ""
                }`}
              />
            </button>
            {openSection === "description" && (
              <div className="pb-6 text-[14px] leading-relaxed text-warm-grey">
                <p>{product.description}</p>
              </div>
            )}
          </div>

          {/* Specification */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="border-b border-light-grey">
              <button
                onClick={() => toggleSection("specification")}
                className="w-full flex items-center justify-between py-5 text-left"
              >
                <span className="text-[13px] tracking-[0.1em] uppercase">
                  Specification
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openSection === "specification" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openSection === "specification" && (
                <div className="pb-6 text-[14px] text-warm-grey">
                  <ul className="space-y-2">
                    {product.specifications.map((spec, index) => (
                      <li key={index} className="flex">
                        <span className="w-40 text-warm-grey">{spec.label}</span>
                        <span className="text-primary-black">{spec.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Shipping & Returns */}
          <div className="border-b border-light-grey">
            <button
              onClick={() => toggleSection("shipping")}
              className="w-full flex items-center justify-between py-5 text-left"
            >
              <span className="text-[13px] tracking-[0.1em] uppercase">
                Shipping & Returns
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  openSection === "shipping" ? "rotate-180" : ""
                }`}
              />
            </button>
            {openSection === "shipping" && (
              <div className="pb-6 text-[14px] leading-relaxed text-warm-grey space-y-4">
                <div>
                  <p className="font-medium text-primary-black mb-2">
                    Delivery
                  </p>
                  <p>
                    Delivery costs and timelines will be provided with your personalised quote.
                    We offer nationwide delivery across the UK.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-primary-black mb-2">Returns</p>
                  <p>
                    You have 14 days from the date of receiving your order to
                    initiate a return. Please contact us to arrange.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enquiry Slide-out Panel */}
      <EnquiryPanel
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        productName={product.name}
      />
    </>
  );
}
