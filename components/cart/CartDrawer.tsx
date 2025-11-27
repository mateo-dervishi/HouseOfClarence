"use client";

import { useCartStore } from "@/stores/cartStore";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function CartDrawer() {
  const { isOpen, closeCart, items, updateQuantity, removeItem, getTotal } = useCartStore();
  const total = getTotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <header className="p-6 border-b border-light-grey flex items-center justify-between">
              <h2 className="tracking-widest text-sm uppercase font-display">YOUR BASKET</h2>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-off-white transition-colors"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="text-warm-grey mb-4">Your basket is empty</p>
                  <Button onClick={closeCart} variant="outline">
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => {
                    const product = item.product;
                    const variant = item.variant;
                    const price = variant?.salePrice || variant?.price || product.pricing.salePrice || product.pricing.price;
                    const image = product.images[0];

                    return (
                      <li key={`${product.id}-${variant?.id || "default"}`} className="flex gap-4">
                        {image && (
                          <Link
                            href={`/${product.category.slug}/${product.slug}`}
                            onClick={closeCart}
                            className="relative w-24 h-24 flex-shrink-0 bg-off-white"
                          >
                            <Image
                              src={image.url}
                              alt={image.alt || product.name}
                              fill
                              className="object-cover"
                              sizes="96px"
                            />
                          </Link>
                        )}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/${product.category.slug}/${product.slug}`}
                            onClick={closeCart}
                            className="block"
                          >
                            <h3 className="text-sm font-light mb-1">{product.name}</h3>
                            {variant && (
                              <p className="text-xs text-warm-grey mb-2">
                                {Object.values(variant.attributes).join(", ")}
                              </p>
                            )}
                          </Link>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    product.id,
                                    variant?.id,
                                    item.quantity - 1
                                  )
                                }
                                className="p-1 hover:bg-off-white transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="text-sm w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    product.id,
                                    variant?.id,
                                    item.quantity + 1
                                  )
                                }
                                className="p-1 hover:bg-off-white transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="text-right">
                              <p className="text-sm">{formatPrice(price * item.quantity)}</p>
                              <button
                                onClick={() => removeItem(product.id, variant?.id)}
                                className="mt-1 text-xs text-warm-grey hover:text-primary-black transition-colors flex items-center gap-1"
                              >
                                <Trash2 className="h-3 w-3" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <footer className="border-t border-light-grey p-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-warm-grey">Subtotal</span>
                  <span className="font-medium">{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-warm-grey">
                  Shipping calculated at checkout
                </p>
                <Button className="w-full" onClick={closeCart} asChild>
                  <Link href="/checkout">PROCEED TO CHECKOUT</Link>
                </Button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

