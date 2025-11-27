import { create } from "zustand";
import { persist } from "zustand/middleware";

// Room/Area Labels
export interface SelectionLabel {
  id: string;
  name: string;
  color: string; // For visual distinction
  createdAt: number;
}

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
  labelId?: string; // Which room/area this item belongs to
  notes?: string; // Optional notes for the item
}

// Preset colors for labels
export const LABEL_COLORS = [
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#06B6D4", // Cyan
  "#84CC16", // Lime
  "#F97316", // Orange
  "#6366F1", // Indigo
];

interface SelectionStore {
  items: SelectionItem[];
  labels: SelectionLabel[];
  isOpen: boolean;
  
  // Item Actions
  addItem: (item: Omit<SelectionItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateItemLabel: (itemId: string, labelId: string | undefined) => void;
  updateItemNotes: (itemId: string, notes: string) => void;
  clearSelection: () => void;
  
  // Label Actions
  addLabel: (name: string) => void;
  removeLabel: (id: string) => void;
  updateLabel: (id: string, name: string, color?: string) => void;
  
  // Drawer Actions
  openSelection: () => void;
  closeSelection: () => void;
  toggleSelection: () => void;
  
  // Getters
  getItemCount: () => number;
  isInSelection: (id: string) => boolean;
  getItemsByLabel: (labelId: string | undefined) => SelectionItem[];
  getUnlabeledItems: () => SelectionItem[];
  getTotalByLabel: (labelId: string) => number;
}

export const useSelectionStore = create<SelectionStore>()(
  persist(
    (set, get) => ({
      items: [],
      labels: [],
      isOpen: false,

      // Item Actions
      addItem: (item) => {
        const items = get().items;
        const existingItem = items.find((i) => i.id === item.id);

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
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

      updateItemLabel: (itemId, labelId) => {
        set({
          items: get().items.map((item) =>
            item.id === itemId ? { ...item, labelId } : item
          ),
        });
      },

      updateItemNotes: (itemId, notes) => {
        set({
          items: get().items.map((item) =>
            item.id === itemId ? { ...item, notes } : item
          ),
        });
      },

      clearSelection: () => {
        set({ items: [], labels: [] });
      },

      // Label Actions
      addLabel: (name) => {
        const labels = get().labels;
        const usedColors = labels.map((l) => l.color);
        const availableColor = LABEL_COLORS.find((c) => !usedColors.includes(c)) || LABEL_COLORS[0];
        
        const newLabel: SelectionLabel = {
          id: `label-${Date.now()}`,
          name,
          color: availableColor,
          createdAt: Date.now(),
        };
        set({ labels: [...labels, newLabel] });
      },

      removeLabel: (id) => {
        // Remove label and unassign items
        set({
          labels: get().labels.filter((label) => label.id !== id),
          items: get().items.map((item) =>
            item.labelId === id ? { ...item, labelId: undefined } : item
          ),
        });
      },

      updateLabel: (id, name, color) => {
        set({
          labels: get().labels.map((label) =>
            label.id === id
              ? { ...label, name, color: color || label.color }
              : label
          ),
        });
      },

      // Drawer Actions
      openSelection: () => set({ isOpen: true }),
      closeSelection: () => set({ isOpen: false }),
      toggleSelection: () => set({ isOpen: !get().isOpen }),

      // Getters
      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      isInSelection: (id) => {
        return get().items.some((item) => item.id === id);
      },

      getItemsByLabel: (labelId) => {
        return get().items.filter((item) => item.labelId === labelId);
      },

      getUnlabeledItems: () => {
        return get().items.filter((item) => !item.labelId);
      },

      getTotalByLabel: (labelId) => {
        return get()
          .items.filter((item) => item.labelId === labelId)
          .reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: "house-of-clarence-selection",
    }
  )
);
