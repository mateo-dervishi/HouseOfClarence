import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SelectionItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  priceExVat: number;
  image: string;
  colour?: string;
  category: string;
  quantity: number;
}

interface SelectionStore {
  items: SelectionItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (item: Omit<SelectionItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearSelection: () => void;
  openSelection: () => void;
  closeSelection: () => void;
  toggleSelection: () => void;
  
  // Getters
  getItemCount: () => number;
  isInSelection: (id: string) => boolean;
}

export const useSelectionStore = create<SelectionStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const items = get().items;
        const existingItem = items.find((i) => i.id === item.id);

        if (existingItem) {
          // Increment quantity if already in selection
          set({
            items: items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          // Add new item with quantity 1
          set({ items: [...items, { ...item, quantity: 1 }] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },

      clearSelection: () => {
        set({ items: [] });
      },

      openSelection: () => set({ isOpen: true }),
      closeSelection: () => set({ isOpen: false }),
      toggleSelection: () => set({ isOpen: !get().isOpen }),

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      isInSelection: (id) => {
        return get().items.some((item) => item.id === id);
      },
    }),
    {
      name: "house-of-clarence-selection",
    }
  )
);

