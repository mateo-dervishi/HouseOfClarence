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
  customOptions?: {
    color?: string;
    dimensions?: string;
    sourceUrl?: string; // For bespoke items - where the item was found
    description?: string; // For bespoke items - detailed description
  };
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
  
  // Sync state
  isSyncing: boolean;
  lastSyncedAt: number | null;
  isLoggedIn: boolean;
  
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
  
  // Sync Actions
  setLoggedIn: (isLoggedIn: boolean) => void;
  loadFromServer: () => Promise<void>;
  syncToServer: () => Promise<void>;
  setSelection: (items: SelectionItem[], labels: SelectionLabel[]) => void;
  
  // Getters
  getItemCount: () => number;
  isInSelection: (id: string) => boolean;
  getItemsByLabel: (labelId: string | undefined) => SelectionItem[];
  getUnlabeledItems: () => SelectionItem[];
  getTotalByLabel: (labelId: string) => number;
}

// Debounce helper
let syncTimeout: NodeJS.Timeout | null = null;
const debouncedSync = (syncFn: () => Promise<void>, delay: number = 2000) => {
  if (syncTimeout) {
    clearTimeout(syncTimeout);
  }
  syncTimeout = setTimeout(() => {
    syncFn();
  }, delay);
};

export const useSelectionStore = create<SelectionStore>()(
  persist(
    (set, get) => ({
      items: [],
      labels: [],
      isOpen: false,
      isSyncing: false,
      lastSyncedAt: null,
      isLoggedIn: false,

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
        
        // Auto-sync if logged in
        if (get().isLoggedIn) {
          debouncedSync(() => get().syncToServer());
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
        
        // Auto-sync if logged in
        if (get().isLoggedIn) {
          debouncedSync(() => get().syncToServer());
        }
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
        
        // Auto-sync if logged in
        if (get().isLoggedIn) {
          debouncedSync(() => get().syncToServer());
        }
      },

      updateItemLabel: (itemId, labelId) => {
        set({
          items: get().items.map((item) =>
            item.id === itemId ? { ...item, labelId } : item
          ),
        });
        
        // Auto-sync if logged in
        if (get().isLoggedIn) {
          debouncedSync(() => get().syncToServer());
        }
      },

      updateItemNotes: (itemId, notes) => {
        set({
          items: get().items.map((item) =>
            item.id === itemId ? { ...item, notes } : item
          ),
        });
        
        // Auto-sync if logged in
        if (get().isLoggedIn) {
          debouncedSync(() => get().syncToServer());
        }
      },

      clearSelection: () => {
        set({ items: [], labels: [] });
        
        // Auto-sync if logged in
        if (get().isLoggedIn) {
          debouncedSync(() => get().syncToServer());
        }
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
        
        // Auto-sync if logged in
        if (get().isLoggedIn) {
          debouncedSync(() => get().syncToServer());
        }
      },

      removeLabel: (id) => {
        // Remove label and unassign items
        set({
          labels: get().labels.filter((label) => label.id !== id),
          items: get().items.map((item) =>
            item.labelId === id ? { ...item, labelId: undefined } : item
          ),
        });
        
        // Auto-sync if logged in
        if (get().isLoggedIn) {
          debouncedSync(() => get().syncToServer());
        }
      },

      updateLabel: (id, name, color) => {
        set({
          labels: get().labels.map((label) =>
            label.id === id
              ? { ...label, name, color: color || label.color }
              : label
          ),
        });
        
        // Auto-sync if logged in
        if (get().isLoggedIn) {
          debouncedSync(() => get().syncToServer());
        }
      },

      // Drawer Actions
      openSelection: () => set({ isOpen: true }),
      closeSelection: () => set({ isOpen: false }),
      toggleSelection: () => set({ isOpen: !get().isOpen }),

      // Sync Actions
      setLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
      
      setSelection: (items, labels) => {
        set({ items, labels });
      },

      loadFromServer: async () => {
        try {
          set({ isSyncing: true });
          
          const response = await fetch('/api/selection');
          
          if (!response.ok) {
            if (response.status === 401) {
              // Not logged in, that's fine
              set({ isLoggedIn: false, isSyncing: false });
              return;
            }
            throw new Error('Failed to load selection');
          }
          
          const data = await response.json();
          const serverItems = data.items || [];
          const serverLabels = data.labels || [];
          const localItems = get().items;
          const localLabels = get().labels;
          
          // Merge strategy: If server has data, use it. If empty and local has data, sync local to server.
          if (serverItems.length > 0 || serverLabels.length > 0) {
            // Server has data - use server data
            set({ 
              items: serverItems, 
              labels: serverLabels,
              isLoggedIn: true,
              isSyncing: false,
              lastSyncedAt: Date.now(),
            });
          } else if (localItems.length > 0 || localLabels.length > 0) {
            // Server empty but local has data - push local to server
            set({ isLoggedIn: true, isSyncing: false });
            await get().syncToServer();
          } else {
            // Both empty
            set({ 
              isLoggedIn: true, 
              isSyncing: false,
              lastSyncedAt: Date.now(),
            });
          }
        } catch (error) {
          console.error('Error loading selection from server:', error);
          set({ isSyncing: false });
        }
      },

      syncToServer: async () => {
        if (!get().isLoggedIn) return;
        
        try {
          set({ isSyncing: true });
          
          const response = await fetch('/api/selection', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              items: get().items,
              labels: get().labels,
            }),
          });
          
          if (!response.ok) {
            throw new Error('Failed to sync selection');
          }
          
          set({ 
            isSyncing: false, 
            lastSyncedAt: Date.now(),
          });
        } catch (error) {
          console.error('Error syncing selection to server:', error);
          set({ isSyncing: false });
        }
      },

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
      partialize: (state) => ({
        items: state.items,
        labels: state.labels,
        // Don't persist sync state
      }),
    }
  )
);
