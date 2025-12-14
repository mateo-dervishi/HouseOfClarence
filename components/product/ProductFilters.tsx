"use client";

import { useState, useMemo } from "react";
import { ChevronDown, X, SlidersHorizontal } from "lucide-react";
import { Product } from "@/types/product";
import { motion, AnimatePresence } from "framer-motion";

export interface FilterState {
  materials: string[];
  colours: string[];
  finishes: string[];
  isNew: boolean;
  isFeatured: boolean;
}

interface ProductFiltersProps {
  products: Product[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  variant?: "mobile" | "desktop"; // mobile = button only, desktop = sidebar only
}


export function ProductFilters({
  products,
  filters,
  onFiltersChange,
  onClearFilters,
  variant,
}: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Extract unique filter values from products
  const filterOptions = useMemo(() => {
    const materials = new Set<string>();
    const colours = new Set<string>();
    const finishes = new Set<string>();

    products.forEach((product) => {
      if (product.specifications?.material) {
        materials.add(product.specifications.material);
      }
      if (product.specifications?.colour) {
        colours.add(product.specifications.colour);
      }
      if (product.specifications?.finish) {
        finishes.add(product.specifications.finish);
      }
    });

    return {
      materials: Array.from(materials).sort(),
      colours: Array.from(colours).sort(),
      finishes: Array.from(finishes).sort(),
    };
  }, [products]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const toggleArrayFilter = (
    key: "materials" | "colours" | "finishes",
    value: string
  ) => {
    const currentValues = filters[key];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    onFiltersChange({ ...filters, [key]: newValues });
  };

  const activeFilterCount =
    filters.materials.length +
    filters.colours.length +
    filters.finishes.length +
    (filters.isNew ? 1 : 0) +
    (filters.isFeatured ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* New & Featured Toggles */}
      <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div
            className={`w-5 h-5 border flex items-center justify-center transition-colors ${
              filters.isNew
                ? "bg-primary-black border-primary-black"
                : "border-light-grey group-hover:border-warm-grey"
            }`}
          >
            {filters.isNew && (
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
          <span className="text-[13px] text-primary-black">New Arrivals</span>
        </label>
        <input
          type="checkbox"
          className="sr-only"
          checked={filters.isNew}
          onChange={() => onFiltersChange({ ...filters, isNew: !filters.isNew })}
        />

        <label className="flex items-center gap-3 cursor-pointer group">
          <div
            className={`w-5 h-5 border flex items-center justify-center transition-colors ${
              filters.isFeatured
                ? "bg-primary-black border-primary-black"
                : "border-light-grey group-hover:border-warm-grey"
            }`}
            onClick={() =>
              onFiltersChange({ ...filters, isFeatured: !filters.isFeatured })
            }
          >
            {filters.isFeatured && (
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
          <span className="text-[13px] text-primary-black">Featured</span>
        </label>
      </div>

      <div className="border-t border-light-grey" />

      {/* Material Filter */}
      {filterOptions.materials.length > 0 && (
        <div>
          <button
            onClick={() => toggleSection("material")}
            className="w-full flex items-center justify-between py-2 text-left"
          >
            <span className="text-[12px] tracking-[0.1em] uppercase font-medium text-primary-black">
              Material
            </span>
            <ChevronDown
              className={`w-4 h-4 text-warm-grey transition-transform ${
                expandedSections.includes("material") ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence>
            {expandedSections.includes("material") && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="space-y-2 pt-2 pb-4">
                  {filterOptions.materials.map((material) => (
                    <label
                      key={material}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div
                        className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                          filters.materials.includes(material)
                            ? "bg-primary-black border-primary-black"
                            : "border-light-grey group-hover:border-warm-grey"
                        }`}
                        onClick={() => toggleArrayFilter("materials", material)}
                      >
                        {filters.materials.includes(material) && (
                          <svg
                            className="w-2.5 h-2.5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-[13px] text-warm-grey group-hover:text-primary-black transition-colors">
                        {material}
                      </span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Colour Filter */}
      {filterOptions.colours.length > 0 && (
        <div>
          <button
            onClick={() => toggleSection("colour")}
            className="w-full flex items-center justify-between py-2 text-left"
          >
            <span className="text-[12px] tracking-[0.1em] uppercase font-medium text-primary-black">
              Colour
            </span>
            <ChevronDown
              className={`w-4 h-4 text-warm-grey transition-transform ${
                expandedSections.includes("colour") ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence>
            {expandedSections.includes("colour") && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="space-y-2 pt-2 pb-4">
                  {filterOptions.colours.map((colour) => (
                    <label
                      key={colour}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div
                        className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                          filters.colours.includes(colour)
                            ? "bg-primary-black border-primary-black"
                            : "border-light-grey group-hover:border-warm-grey"
                        }`}
                        onClick={() => toggleArrayFilter("colours", colour)}
                      >
                        {filters.colours.includes(colour) && (
                          <svg
                            className="w-2.5 h-2.5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-[13px] text-warm-grey group-hover:text-primary-black transition-colors">
                        {colour}
                      </span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Finish Filter */}
      {filterOptions.finishes.length > 0 && (
        <div>
          <button
            onClick={() => toggleSection("finish")}
            className="w-full flex items-center justify-between py-2 text-left"
          >
            <span className="text-[12px] tracking-[0.1em] uppercase font-medium text-primary-black">
              Finish
            </span>
            <ChevronDown
              className={`w-4 h-4 text-warm-grey transition-transform ${
                expandedSections.includes("finish") ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence>
            {expandedSections.includes("finish") && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="space-y-2 pt-2 pb-4">
                  {filterOptions.finishes.map((finish) => (
                    <label
                      key={finish}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div
                        className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                          filters.finishes.includes(finish)
                            ? "bg-primary-black border-primary-black"
                            : "border-light-grey group-hover:border-warm-grey"
                        }`}
                        onClick={() => toggleArrayFilter("finishes", finish)}
                      >
                        {filters.finishes.includes(finish) && (
                          <svg
                            className="w-2.5 h-2.5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-[13px] text-warm-grey group-hover:text-primary-black transition-colors">
                        {finish}
                      </span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}


      {/* Clear Filters Button */}
      {activeFilterCount > 0 && (
        <button
          onClick={onClearFilters}
          className="w-full py-3 border border-primary-black text-primary-black text-[12px] tracking-[0.1em] uppercase hover:bg-primary-black hover:text-white transition-colors"
        >
          Clear All Filters ({activeFilterCount})
        </button>
      )}
    </div>
  );

  // Desktop sidebar only
  if (variant === "desktop") {
    return (
      <div className="w-64 flex-shrink-0">
        <div className="sticky top-28">
          <h3 className="text-[12px] tracking-[0.15em] uppercase font-medium text-primary-black mb-6">
            Filter By
          </h3>
          <FilterContent />
        </div>
      </div>
    );
  }

  // Mobile button + slide-out panel only
  if (variant === "mobile") {
    return (
      <>
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-2 text-[13px] tracking-[0.05em] text-primary-black"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-primary-black text-white text-[10px] px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Mobile Filter Panel */}
        <AnimatePresence>
          {mobileFiltersOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/30 z-50"
                onClick={() => setMobileFiltersOpen(false)}
              />

              {/* Panel */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed left-0 top-0 bottom-0 w-[300px] bg-white z-50 overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-[14px] tracking-[0.15em] uppercase font-medium text-primary-black">
                      Filters
                    </h3>
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="p-2 hover:bg-light-grey rounded-full transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <FilterContent />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Default: both (for backwards compatibility)
  return (
    <>
      {/* Desktop Sidebar Filters */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-28">
          <h3 className="text-[12px] tracking-[0.15em] uppercase font-medium text-primary-black mb-6">
            Filter By
          </h3>
          <FilterContent />
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-2 text-[13px] tracking-[0.05em] text-primary-black"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-primary-black text-white text-[10px] px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Filter Panel */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-50 lg:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 w-[300px] bg-white z-50 overflow-y-auto lg:hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-[14px] tracking-[0.15em] uppercase font-medium text-primary-black">
                    Filters
                  </h3>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-2 hover:bg-light-grey rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FilterContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Utility function to apply filters to products
export function applyFilters(products: Product[], filters: FilterState): Product[] {
  return products.filter((product) => {
    // Material filter
    if (
      filters.materials.length > 0 &&
      !filters.materials.includes(product.specifications?.material || "")
    ) {
      return false;
    }

    // Colour filter
    if (
      filters.colours.length > 0 &&
      !filters.colours.includes(product.specifications?.colour || "")
    ) {
      return false;
    }

    // Finish filter
    if (
      filters.finishes.length > 0 &&
      !filters.finishes.includes(product.specifications?.finish || "")
    ) {
      return false;
    }

    // New arrivals filter
    if (filters.isNew && !product.isNew) {
      return false;
    }

    // Featured filter
    if (filters.isFeatured && !product.isFeatured) {
      return false;
    }

    return true;
  });
}

// Default empty filter state
export const defaultFilters: FilterState = {
  materials: [],
  colours: [],
  finishes: [],
  isNew: false,
  isFeatured: false,
};

