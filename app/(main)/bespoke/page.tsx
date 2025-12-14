"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Upload, X, Link as LinkIcon, FileText, Check, Plus, Instagram, Globe } from "lucide-react";
import { useSelectionStore } from "@/stores/selectionStore";

interface BespokeRequest {
  id: string;
  imageFile: File | null;
  imagePreview: string | null;
  sourceUrl: string;
  description: string;
}

export default function BespokePage() {
  const [requests, setRequests] = useState<BespokeRequest[]>([
    { id: "1", imageFile: null, imagePreview: null, sourceUrl: "", description: "" }
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const { addItem } = useSelectionStore();

  const handleImageUpload = (requestId: string, file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRequests((prev) =>
          prev.map((req) =>
            req.id === requestId
              ? { ...req, imageFile: file, imagePreview: reader.result as string }
              : req
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (requestId: string, e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(requestId, file);
  };

  const removeImage = (requestId: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, imageFile: null, imagePreview: null } : req
      )
    );
  };

  const updateRequest = (requestId: string, field: keyof BespokeRequest, value: string) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, [field]: value } : req))
    );
  };

  const addNewRequest = () => {
    const newId = Date.now().toString();
    setRequests((prev) => [
      ...prev,
      { id: newId, imageFile: null, imagePreview: null, sourceUrl: "", description: "" },
    ]);
  };

  const removeRequest = (requestId: string) => {
    if (requests.length > 1) {
      setRequests((prev) => prev.filter((req) => req.id !== requestId));
    }
  };

  const handleAddToSelection = () => {
    setIsLoading(true);
    
    // Add each bespoke request to the selection as an unassigned item
    let itemsAdded = 0;
    requests.forEach((request, index) => {
      // Only add if the request has some content
      if (request.imagePreview || request.sourceUrl || request.description) {
        const itemName = request.description 
          ? request.description.slice(0, 50) + (request.description.length > 50 ? "..." : "")
          : `Bespoke Item ${index + 1}`;
        
        addItem({
          id: `bespoke-${Date.now()}-${index}`,
          slug: `bespoke-item-${Date.now()}-${index}`,
          name: itemName,
          price: 0,
          priceExVat: 0,
          image: request.imagePreview || "/bespoke-placeholder.png",
          category: "Bespoke",
          // No labelId - item will be unassigned
          customOptions: {
            sourceUrl: request.sourceUrl,
            description: request.description,
          },
        });
        itemsAdded++;
      }
    });
    
    // Small delay for UX feedback
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 500);
  };

  const isValidRequest = requests.some(
    (req) => req.imagePreview || req.sourceUrl || req.description
  );

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-off-white pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto px-6 text-center"
        >
          <div className="bg-white p-12 shadow-sm">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-10 h-10 text-white" strokeWidth={2} />
            </motion.div>
            <h1 className="text-3xl tracking-[0.15em] font-light mb-4">ADDED TO SELECTION</h1>
            <p className="text-warm-grey leading-relaxed mb-8">
              Your bespoke items have been added to your selection. 
              Now assign them to a room or area to organize your project.
            </p>
            <div className="space-y-3">
              <Link
                href="/selection"
                className="block w-full py-4 bg-primary-black text-white text-sm uppercase tracking-wider hover:bg-charcoal transition-colors"
              >
                View Selection & Assign Rooms
              </Link>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setRequests([{ id: "1", imageFile: null, imagePreview: null, sourceUrl: "", description: "" }]);
                }}
                className="block w-full py-4 border border-primary-black text-primary-black text-sm uppercase tracking-wider hover:bg-primary-black hover:text-white transition-colors"
              >
                Add More Bespoke Items
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-off-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/bespoke-hero.png"
          alt="Bespoke luxury interior"
          fill
          className="object-cover object-[center_40%]"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl tracking-[0.2em] font-light mb-4"
          >
            BESPOKE SOURCING
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg tracking-wide opacity-90 max-w-2xl mx-auto"
          >
            Found something you love? Share it with us and we&apos;ll source it for you.
          </motion.p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl tracking-[0.1em] font-light mb-6">HOW IT WORKS</h2>
          <p className="text-warm-grey leading-relaxed mb-10">
            Discovered a stunning piece on Instagram, Pinterest, or elsewhere that you can&apos;t find 
            in our catalogue? Our bespoke sourcing service is designed to help you acquire exactly 
            what you&apos;re looking for. Simply upload an image, share the link, and tell us about it.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 border border-light-grey rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-primary-black" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm tracking-[0.1em] uppercase mb-2">1. Upload</h3>
              <p className="text-sm text-warm-grey">
                Share an image or screenshot of the product you&apos;ve found
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 border border-light-grey rounded-full flex items-center justify-center mx-auto mb-4">
                <LinkIcon className="w-6 h-6 text-primary-black" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm tracking-[0.1em] uppercase mb-2">2. Link</h3>
              <p className="text-sm text-warm-grey">
                Add the source URL where you discovered the item
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 border border-light-grey rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-primary-black" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm tracking-[0.1em] uppercase mb-2">3. Describe</h3>
              <p className="text-sm text-warm-grey">
                Tell us any specific details or requirements
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bespoke Requests */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div>
            {/* Product Requests */}
            <div className="space-y-8 mb-12">
              <h2 className="text-xl tracking-[0.1em] font-light text-center mb-8">
                YOUR BESPOKE REQUESTS
              </h2>

              <AnimatePresence>
                {requests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white p-8 shadow-sm relative"
                  >
                    {requests.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRequest(request.id)}
                        className="absolute top-4 right-4 p-2 text-warm-grey hover:text-primary-black transition-colors"
                        aria-label="Remove request"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}

                    <h3 className="text-sm tracking-[0.15em] uppercase text-warm-grey mb-6">
                      Item {index + 1}
                    </h3>

                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Image Upload */}
                      <div>
                        <label className="block text-xs tracking-wider uppercase text-warm-grey mb-3">
                          Product Image
                        </label>
                        {request.imagePreview ? (
                          <div className="relative aspect-square bg-off-white">
                            <Image
                              src={request.imagePreview}
                              alt="Uploaded preview"
                              fill
                              className="object-contain"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(request.id)}
                              className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white rounded-full shadow-sm transition-colors"
                              aria-label="Remove image"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div
                            onDrop={(e) => handleDrop(request.id, e)}
                            onDragOver={(e) => e.preventDefault()}
                            onClick={() => fileInputRefs.current[request.id]?.click()}
                            className="aspect-square border-2 border-dashed border-light-grey hover:border-warm-grey bg-off-white flex flex-col items-center justify-center cursor-pointer transition-colors group"
                          >
                            <Upload className="w-10 h-10 text-light-grey group-hover:text-warm-grey transition-colors mb-3" strokeWidth={1.5} />
                            <p className="text-sm text-warm-grey text-center px-4">
                              Drag & drop or click to upload
                            </p>
                            <p className="text-xs text-light-grey mt-2">
                              PNG, JPG, WEBP up to 10MB
                            </p>
                            <input
                              ref={(el) => { fileInputRefs.current[request.id] = el; }}
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload(request.id, file);
                              }}
                              className="hidden"
                            />
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="space-y-5">
                        {/* Source URL */}
                        <div>
                          <label className="block text-xs tracking-wider uppercase text-warm-grey mb-2">
                            Source Link
                          </label>
                          <div className="relative">
                            <input
                              type="url"
                              value={request.sourceUrl}
                              onChange={(e) => updateRequest(request.id, "sourceUrl", e.target.value)}
                              placeholder="https://instagram.com/... or product URL"
                              className="w-full border border-light-grey p-4 pl-12 text-sm focus:border-primary-black outline-none transition-colors"
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-grey">
                              <Globe className="w-4 h-4" strokeWidth={1.5} />
                            </div>
                          </div>
                          <p className="text-xs text-warm-grey mt-2 flex items-center gap-2">
                            <Instagram className="w-3 h-3" /> Instagram, Pinterest, website, etc.
                          </p>
                        </div>

                        {/* Description */}
                        <div>
                          <label className="block text-xs tracking-wider uppercase text-warm-grey mb-2">
                            Description & Requirements
                          </label>
                          <textarea
                            value={request.description}
                            onChange={(e) => updateRequest(request.id, "description", e.target.value)}
                            placeholder="Tell us about this item - brand, model, dimensions, finish, colour, quantity needed, or any other details..."
                            rows={6}
                            className="w-full border border-light-grey p-4 text-sm focus:border-primary-black outline-none resize-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Add Another Item */}
              <button
                type="button"
                onClick={addNewRequest}
                className="w-full py-4 border-2 border-dashed border-light-grey text-warm-grey hover:border-primary-black hover:text-primary-black transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                <span className="text-sm tracking-wider uppercase">Add Another Item</span>
              </button>
            </div>

            {/* Add to Selection Button */}
            <div className="space-y-4">
              <button
                type="button"
                onClick={handleAddToSelection}
                disabled={isLoading || !isValidRequest}
                className="w-full py-5 bg-primary-black text-white text-sm uppercase tracking-[0.15em] hover:bg-charcoal transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding to Selection...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Add to My Selection
                  </>
                )}
              </button>
              
              <p className="text-center text-xs text-warm-grey">
                Items will be added to your selection as unassigned. You can then assign them to rooms or areas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white border-t border-light-grey">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-xl tracking-[0.1em] font-light mb-6">WHY BESPOKE?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div>
              <h3 className="text-sm tracking-[0.1em] uppercase mb-3">Expert Sourcing</h3>
              <p className="text-sm text-warm-grey leading-relaxed">
                Our team has extensive connections with manufacturers, artisans, and suppliers 
                worldwide to find exactly what you need.
              </p>
            </div>
            <div>
              <h3 className="text-sm tracking-[0.1em] uppercase mb-3">Quality Assured</h3>
              <p className="text-sm text-warm-grey leading-relaxed">
                Every item we source goes through our rigorous quality checks to ensure it 
                meets the House of Clarence standard.
              </p>
            </div>
            <div>
              <h3 className="text-sm tracking-[0.1em] uppercase mb-3">White Glove Service</h3>
              <p className="text-sm text-warm-grey leading-relaxed">
                From sourcing to delivery, we handle everything so you can focus on 
                bringing your vision to life.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

