import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, Product, ProductVariant } from "@/types/product";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (product, variant, quantity = 1) => {
        const items = get().items;
        const variantId = variant?.id;
        const existingItemIndex = items.findIndex(
          (item) => item.product.id === product.id && item.variant?.id === variantId
        );

        if (existingItemIndex > -1) {
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems });
        } else {
          set({
            items: [...items, { product, variant, quantity }],
          });
        }
      },
      removeItem: (productId, variantId) => {
        set({
          items: get().items.filter(
            (item) => !(item.product.id === productId && item.variant?.id === variantId)
          ),
        });
      },
      updateQuantity: (productId, variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }
        const items = get().items;
        const itemIndex = items.findIndex(
          (item) => item.product.id === productId && item.variant?.id === variantId
        );
        if (itemIndex > -1) {
          const updatedItems = [...items];
          updatedItems[itemIndex].quantity = quantity;
          set({ items: updatedItems });
        }
      },
      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      getTotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.variant?.salePrice || item.variant?.price || item.product.pricing.salePrice || item.product.pricing.price;
          return total + price * item.quantity;
        }, 0);
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "house-of-clarence-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

