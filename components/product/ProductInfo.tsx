"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Phone, Plus, Check, Ruler, Palette, X } from "lucide-react";
import { EnquiryPanel } from "./EnquiryPanel";
import { useSelectionStore } from "@/stores/selectionStore";
import { motion, AnimatePresence } from "framer-motion";

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
    dimensions?: {
      width: number;
      height: number;
      depth: number;
    };
  };
}

// Preset dimension options (multipliers for base dimensions)
const DIMENSION_OPTIONS = [
  { id: "standard", label: "Standard", multiplier: 1 },
  { id: "compact", label: "Compact", multiplier: 0.85 },
  { id: "large", label: "Large", multiplier: 1.2 },
];

// Color options for all products
const COLOR_OPTIONS = [
  { id: "white", name: "White", hex: "#FFFFFF" },
  { id: "black", name: "Matt Black", hex: "#1A1A1A" },
  { id: "brass", name: "Brushed Brass", hex: "#C9A962" },
];

export function ProductInfo({ product }: Props) {
  const [openSection, setOpenSection] = useState<string | null>("description");
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  
  // Selection states
  const [selectedDimension, setSelectedDimension] = useState<string>("standard");
  const [selectedColor, setSelectedColor] = useState<string>(COLOR_OPTIONS[0].id);
  const [isBespokeOpen, setIsBespokeOpen] = useState(false);
  const [bespokeMode, setBespokeMode] = useState(false);
  const [bespokeDimensions, setBespokeDimensions] = useState({
    width: "",
    height: "",
    depth: "",
  });
  
  const { addItem, isInSelection } = useSelectionStore();
  const isSelected = isInSelection(product.id);

  // Extract base dimensions from specifications
  const baseDimensions = product.dimensions || { width: 600, height: 400, depth: 300 };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const getSelectedColorName = () => {
    const color = COLOR_OPTIONS.find(c => c.id === selectedColor);
    return color?.name || COLOR_OPTIONS[0].name;
  };

  const getSelectedDimensionLabel = () => {
    if (bespokeMode) {
      return `${bespokeDimensions.width || "—"} × ${bespokeDimensions.height || "—"} × ${bespokeDimensions.depth || "—"}mm (Bespoke)`;
    }
    const dim = DIMENSION_OPTIONS.find(d => d.id === selectedDimension);
    if (!dim) return "";
    const w = Math.round(baseDimensions.width * dim.multiplier);
    const h = Math.round(baseDimensions.height * dim.multiplier);
    const d = Math.round(baseDimensions.depth * dim.multiplier);
    return `${w} × ${h} × ${d}mm`;
  };

  const handleAddToSelection = () => {
    const dimensionInfo = bespokeMode 
      ? `Bespoke: ${bespokeDimensions.width}×${bespokeDimensions.height}×${bespokeDimensions.depth}mm`
      : `${DIMENSION_OPTIONS.find(d => d.id === selectedDimension)?.label}: ${getSelectedDimensionLabel()}`;
    
    addItem({
      id: `${product.id}-${selectedColor}-${bespokeMode ? 'bespoke' : selectedDimension}`,
      slug: product.slug,
      name: product.name,
      price: 0,
      priceExVat: 0,
      image: product.image,
      colour: getSelectedColorName(),
      category: product.category,
      customOptions: {
        color: getSelectedColorName(),
        dimensions: dimensionInfo,
      },
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleBespokeSave = () => {
    if (bespokeDimensions.width && bespokeDimensions.height && bespokeDimensions.depth) {
      setBespokeMode(true);
      setIsBespokeOpen(false);
    }
  };

  const clearBespoke = () => {
    setBespokeMode(false);
    setBespokeDimensions({ width: "", height: "", depth: "" });
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

        {/* ════════════════════════════════════════════════════════════ */}
        {/* COLOR SELECTOR */}
        {/* ════════════════════════════════════════════════════════════ */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Palette className="w-4 h-4 text-warm-grey" />
            <p className="text-[12px] tracking-[0.1em] uppercase text-warm-grey">
              Colour: <span className="text-primary-black">{getSelectedColorName()}</span>
            </p>
          </div>
          <div className="flex gap-3">
            {COLOR_OPTIONS.map((color) => (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color.id)}
                className={`relative w-12 h-12 rounded-full transition-all duration-200 ${
                  selectedColor === color.id
                    ? "ring-2 ring-primary-black ring-offset-2"
                    : "hover:ring-2 hover:ring-warm-grey hover:ring-offset-2"
                }`}
                style={{ 
                  backgroundColor: color.hex,
                  border: color.id === "white" ? "1px solid #E5E5E5" : "none"
                }}
                title={color.name}
              >
                {selectedColor === color.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Check className={`w-5 h-5 ${color.id === "white" ? "text-primary-black" : "text-white"}`} />
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* DIMENSION SELECTOR */}
        {/* ════════════════════════════════════════════════════════════ */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Ruler className="w-4 h-4 text-warm-grey" />
            <p className="text-[12px] tracking-[0.1em] uppercase text-warm-grey">
              Dimensions: <span className="text-primary-black">{getSelectedDimensionLabel()}</span>
            </p>
          </div>
          
          {/* Preset Dimensions */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {DIMENSION_OPTIONS.map((dim) => {
              const w = Math.round(baseDimensions.width * dim.multiplier);
              const h = Math.round(baseDimensions.height * dim.multiplier);
              const d = Math.round(baseDimensions.depth * dim.multiplier);
              const isActive = !bespokeMode && selectedDimension === dim.id;
              
              return (
                <button
                  key={dim.id}
                  onClick={() => {
                    setSelectedDimension(dim.id);
                    setBespokeMode(false);
                  }}
                  className={`p-3 border text-center transition-all duration-200 ${
                    isActive
                      ? "border-primary-black bg-primary-black text-white"
                      : "border-light-grey hover:border-primary-black"
                  }`}
                >
                  <span className="block text-[12px] tracking-[0.1em] uppercase font-medium mb-1">
                    {dim.label}
                  </span>
                  <span className={`block text-[10px] ${isActive ? "text-white/80" : "text-warm-grey"}`}>
                    {w}×{h}×{d}mm
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bespoke Button */}
          {bespokeMode ? (
            <div className="flex items-center justify-between p-3 border border-primary-black bg-off-white">
              <div>
                <span className="text-[12px] tracking-[0.1em] uppercase font-medium">Bespoke</span>
                <span className="block text-[10px] text-warm-grey mt-1">
                  {bespokeDimensions.width}×{bespokeDimensions.height}×{bespokeDimensions.depth}mm
                </span>
              </div>
              <button 
                onClick={clearBespoke}
                className="p-1 hover:bg-light-grey rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsBespokeOpen(true)}
              className="w-full p-3 border border-dashed border-warm-grey text-center hover:border-primary-black transition-all duration-200 group"
            >
              <span className="text-[12px] tracking-[0.1em] uppercase text-warm-grey group-hover:text-primary-black">
                + Create Bespoke Measurement
              </span>
            </button>
          )}
        </div>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* BESPOKE MEASUREMENT MODAL */}
        {/* ════════════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {isBespokeOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsBespokeOpen(false)}
                className="fixed inset-0 bg-black/50 z-50"
              />
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white z-50 p-8 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg tracking-[0.1em] uppercase">Bespoke Measurements</h3>
                  <button 
                    onClick={() => setIsBespokeOpen(false)}
                    className="p-1 hover:bg-light-grey rounded transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <p className="text-[13px] text-warm-grey mb-6 leading-relaxed">
                  Enter your custom dimensions in millimetres. Our team will review your specifications and provide a tailored quote.
                </p>

                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-2">
                      Width (mm)
                    </label>
                    <input
                      type="number"
                      value={bespokeDimensions.width}
                      onChange={(e) => setBespokeDimensions(prev => ({ ...prev, width: e.target.value }))}
                      placeholder={`e.g. ${baseDimensions.width}`}
                      className="w-full px-4 py-3 border border-light-grey focus:border-primary-black outline-none transition-colors text-[14px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-2">
                      Height (mm)
                    </label>
                    <input
                      type="number"
                      value={bespokeDimensions.height}
                      onChange={(e) => setBespokeDimensions(prev => ({ ...prev, height: e.target.value }))}
                      placeholder={`e.g. ${baseDimensions.height}`}
                      className="w-full px-4 py-3 border border-light-grey focus:border-primary-black outline-none transition-colors text-[14px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-2">
                      Depth (mm)
                    </label>
                    <input
                      type="number"
                      value={bespokeDimensions.depth}
                      onChange={(e) => setBespokeDimensions(prev => ({ ...prev, depth: e.target.value }))}
                      placeholder={`e.g. ${baseDimensions.depth}`}
                      className="w-full px-4 py-3 border border-light-grey focus:border-primary-black outline-none transition-colors text-[14px]"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsBespokeOpen(false)}
                    className="flex-1 py-3 border border-light-grey text-[12px] tracking-[0.1em] uppercase hover:border-primary-black transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBespokeSave}
                    disabled={!bespokeDimensions.width || !bespokeDimensions.height || !bespokeDimensions.depth}
                    className="flex-1 py-3 bg-primary-black text-white text-[12px] tracking-[0.1em] uppercase hover:bg-charcoal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Apply
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

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
