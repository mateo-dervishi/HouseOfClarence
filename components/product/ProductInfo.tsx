"use client";

import { useState } from "react";
import { ChevronDown, Phone, Plus, Check, Ruler, X, Mail, MessageCircle } from "lucide-react";
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
    material?: string;
    finish?: string;
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
  
  const { addItem } = useSelectionStore();

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
      return `${bespokeDimensions.width || "—"} × ${bespokeDimensions.height || "—"} × ${bespokeDimensions.depth || "—"}mm`;
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
      <div className="lg:sticky lg:top-28 lg:self-start">
        {/* Product Header */}
        <div className="mb-8">
          {/* Collection Label */}
          <div className="mb-4">
            <span className="inline-block text-[10px] tracking-[0.25em] uppercase text-warm-grey border-b border-warm-grey pb-1">
              House of Clarence
            </span>
          </div>

          {/* Product Name */}
          <h1 className="text-3xl lg:text-4xl tracking-[0.02em] font-light mb-3 leading-tight">
            {product.name}
          </h1>

          {/* SKU & Quick Specs */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-warm-grey tracking-wide">
            <span>SKU: {product.sku}</span>
            {product.material && (
              <>
                <span className="text-light-grey">|</span>
                <span>{product.material}</span>
              </>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="w-12 h-px bg-primary-black mb-8" />

        {/* Short Description */}
        <p className="text-[14px] leading-[1.8] text-warm-grey mb-8">
          {product.description.substring(0, 150)}
          {product.description.length > 150 ? "..." : ""}
        </p>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* COLOR SELECTOR */}
        {/* ════════════════════════════════════════════════════════════ */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] tracking-[0.15em] uppercase">
              Colour
            </span>
            <span className="text-[12px] text-warm-grey">
              {getSelectedColorName()}
            </span>
          </div>
          <div className="flex gap-4">
            {COLOR_OPTIONS.map((color) => (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color.id)}
                className="group relative"
                title={color.name}
              >
                <div
                  className={`w-14 h-14 rounded-full transition-all duration-300 ${
                    selectedColor === color.id
                      ? "ring-2 ring-offset-4 ring-primary-black"
                      : "ring-1 ring-light-grey hover:ring-warm-grey"
                  }`}
                  style={{ 
                    backgroundColor: color.hex,
                  }}
                />
                {selectedColor === color.id && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Check className={`w-5 h-5 ${color.id === "white" ? "text-primary-black" : "text-white"}`} />
                  </motion.div>
                )}
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-warm-grey opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {color.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* DIMENSION SELECTOR */}
        {/* ════════════════════════════════════════════════════════════ */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] tracking-[0.15em] uppercase">
              Size
            </span>
            <span className="text-[12px] text-warm-grey">
              {getSelectedDimensionLabel()}
            </span>
          </div>
          
          {/* Preset Dimensions */}
          <div className="space-y-2 mb-4">
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
                  className={`w-full p-4 flex items-center justify-between transition-all duration-300 ${
                    isActive
                      ? "bg-primary-black text-white"
                      : "bg-[#FAFAFA] hover:bg-[#F0F0F0]"
                  }`}
                >
                  <span className="text-[12px] tracking-[0.1em] uppercase font-medium">
                    {dim.label}
                  </span>
                  <span className={`text-[12px] ${isActive ? "text-white/70" : "text-warm-grey"}`}>
                    {w} × {h} × {d}mm
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bespoke Button */}
          {bespokeMode ? (
            <div className="flex items-center justify-between p-4 bg-off-white border-l-2 border-primary-black">
              <div>
                <span className="text-[12px] tracking-[0.1em] uppercase font-medium">Bespoke</span>
                <span className="block text-[11px] text-warm-grey mt-1">
                  {bespokeDimensions.width} × {bespokeDimensions.height} × {bespokeDimensions.depth}mm
                </span>
              </div>
              <button 
                onClick={clearBespoke}
                className="p-2 hover:bg-light-grey/50 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsBespokeOpen(true)}
              className="w-full p-4 border-2 border-dashed border-light-grey text-center hover:border-primary-black transition-all duration-300 group"
            >
              <div className="flex items-center justify-center gap-2">
                <Ruler className="w-4 h-4 text-warm-grey group-hover:text-primary-black transition-colors" />
                <span className="text-[12px] tracking-[0.1em] uppercase text-warm-grey group-hover:text-primary-black transition-colors">
                  Create Bespoke Size
                </span>
              </div>
            </button>
          )}
        </div>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* ACTION BUTTONS */}
        {/* ════════════════════════════════════════════════════════════ */}
        <div className="space-y-3 mb-10">
          {/* Add to Selection Button */}
          <motion.button
            onClick={handleAddToSelection}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`flex items-center justify-center gap-3 w-full py-5 text-[12px] tracking-[0.2em] uppercase font-medium transition-all duration-300 ${
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
          </motion.button>
          
          {/* Enquire Button */}
          <motion.button
            onClick={() => setIsEnquiryOpen(true)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="flex items-center justify-center gap-3 w-full py-5 border-2 border-primary-black text-[12px] tracking-[0.2em] uppercase font-medium hover:bg-primary-black hover:text-white transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4" />
            Enquire About This Product
          </motion.button>
        </div>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* GET IN TOUCH BOX */}
        {/* ════════════════════════════════════════════════════════════ */}
        <div className="bg-[#FAFAFA] p-6 mb-10">
          <h3 className="text-[11px] tracking-[0.2em] uppercase mb-4">
            Need Assistance?
          </h3>
          <p className="text-[13px] text-warm-grey leading-relaxed mb-5">
            Our team is here to help with product enquiries, bespoke requirements, and trade pricing.
          </p>
          <div className="space-y-3">
            <a
              href="tel:+442033704057"
              className="flex items-center gap-3 text-[13px] text-primary-black hover:text-charcoal transition-colors group"
            >
              <div className="w-8 h-8 bg-white flex items-center justify-center group-hover:bg-primary-black group-hover:text-white transition-all">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span>020 3370 4057</span>
            </a>
            <a
              href="mailto:sales@houseofclarence.com"
              className="flex items-center gap-3 text-[13px] text-primary-black hover:text-charcoal transition-colors group"
            >
              <div className="w-8 h-8 bg-white flex items-center justify-center group-hover:bg-primary-black group-hover:text-white transition-all">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <span>sales@houseofclarence.com</span>
            </a>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* COLLAPSIBLE SECTIONS */}
        {/* ════════════════════════════════════════════════════════════ */}
        <div className="border-t border-light-grey">
          {/* Description */}
          <div className="border-b border-light-grey">
            <button
              onClick={() => toggleSection("description")}
              className="w-full flex items-center justify-between py-5 text-left group"
            >
              <span className="text-[12px] tracking-[0.15em] uppercase group-hover:text-charcoal transition-colors">
                Full Description
              </span>
              <motion.div
                animate={{ rotate: openSection === "description" ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4 text-warm-grey" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openSection === "description" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 text-[14px] leading-[1.8] text-warm-grey">
                    <p>{product.description}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Specification */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="border-b border-light-grey">
              <button
                onClick={() => toggleSection("specification")}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span className="text-[12px] tracking-[0.15em] uppercase group-hover:text-charcoal transition-colors">
                  Specifications
                </span>
                <motion.div
                  animate={{ rotate: openSection === "specification" ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4 text-warm-grey" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openSection === "specification" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6">
                      <table className="w-full text-[13px]">
                        <tbody>
                          {product.specifications.map((spec, index) => (
                            <tr key={index} className="border-b border-light-grey/50 last:border-0">
                              <td className="py-3 text-warm-grey w-2/5">{spec.label}</td>
                              <td className="py-3 text-primary-black">{spec.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Shipping & Returns */}
          <div className="border-b border-light-grey">
            <button
              onClick={() => toggleSection("shipping")}
              className="w-full flex items-center justify-between py-5 text-left group"
            >
              <span className="text-[12px] tracking-[0.15em] uppercase group-hover:text-charcoal transition-colors">
                Delivery & Returns
              </span>
              <motion.div
                animate={{ rotate: openSection === "shipping" ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4 text-warm-grey" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openSection === "shipping" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 text-[14px] leading-[1.8] text-warm-grey space-y-4">
                    <div>
                      <p className="font-medium text-primary-black mb-2">
                        Delivery
                      </p>
                      <p>
                        Delivery costs and timelines will be provided with your personalised quote.
                        We offer nationwide delivery across the UK with white-glove service available.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-primary-black mb-2">Returns</p>
                      <p>
                        You have 14 days from the date of receiving your order to
                        initiate a return. Items must be unused and in original packaging.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Guarantee */}
          <div>
            <button
              onClick={() => toggleSection("guarantee")}
              className="w-full flex items-center justify-between py-5 text-left group"
            >
              <span className="text-[12px] tracking-[0.15em] uppercase group-hover:text-charcoal transition-colors">
                Guarantee
              </span>
              <motion.div
                animate={{ rotate: openSection === "guarantee" ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4 text-warm-grey" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openSection === "guarantee" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 text-[14px] leading-[1.8] text-warm-grey">
                    <p>
                      All House of Clarence products come with a comprehensive guarantee 
                      covering manufacturing defects. Our premium materials are crafted 
                      to the highest standards for lasting quality.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* BESPOKE MEASUREMENT MODAL */}
      {/* ════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isBespokeOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBespokeOpen(false)}
              className="fixed inset-0 bg-black/60 z-50"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white z-50 shadow-2xl"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-warm-grey">
                    Bespoke Service
                  </span>
                  <button 
                    onClick={() => setIsBespokeOpen(false)}
                    className="p-1 hover:bg-light-grey/50 rounded transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <h3 className="text-2xl tracking-wide font-light mb-6">Custom Dimensions</h3>
                
                <p className="text-[13px] text-warm-grey mb-8 leading-relaxed">
                  Enter your custom dimensions in millimetres. Our team will review your 
                  specifications and provide a tailored quote within 24 hours.
                </p>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] uppercase text-warm-grey mb-2">
                      Width
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={bespokeDimensions.width}
                        onChange={(e) => setBespokeDimensions(prev => ({ ...prev, width: e.target.value }))}
                        placeholder={String(baseDimensions.width)}
                        className="w-full px-4 py-3 pr-12 border border-light-grey focus:border-primary-black outline-none transition-colors text-[14px]"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] text-warm-grey">
                        mm
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] uppercase text-warm-grey mb-2">
                      Height
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={bespokeDimensions.height}
                        onChange={(e) => setBespokeDimensions(prev => ({ ...prev, height: e.target.value }))}
                        placeholder={String(baseDimensions.height)}
                        className="w-full px-4 py-3 pr-12 border border-light-grey focus:border-primary-black outline-none transition-colors text-[14px]"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] text-warm-grey">
                        mm
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] uppercase text-warm-grey mb-2">
                      Depth
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={bespokeDimensions.depth}
                        onChange={(e) => setBespokeDimensions(prev => ({ ...prev, depth: e.target.value }))}
                        placeholder={String(baseDimensions.depth)}
                        className="w-full px-4 py-3 pr-12 border border-light-grey focus:border-primary-black outline-none transition-colors text-[14px]"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] text-warm-grey">
                        mm
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsBespokeOpen(false)}
                    className="flex-1 py-4 border border-light-grey text-[11px] tracking-[0.15em] uppercase hover:border-primary-black transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBespokeSave}
                    disabled={!bespokeDimensions.width || !bespokeDimensions.height || !bespokeDimensions.depth}
                    className="flex-1 py-4 bg-primary-black text-white text-[11px] tracking-[0.15em] uppercase hover:bg-charcoal transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Apply Dimensions
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Enquiry Slide-out Panel */}
      <EnquiryPanel
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        productName={product.name}
      />
    </>
  );
}
