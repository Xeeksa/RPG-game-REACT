import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface InventoryState {
  items: string[];
  addItem: (item: string) => void;
  removeItem: (item: string) => void;
  reset: () => void;
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set) => ({
      items: ['healthPotion'],
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),
      removeItem: (item) =>
        set((state) => ({
          items: state.items.filter((i) => i !== item),
        })),
      reset: () => set({ items: ['healthPotion'] }),
    }),
    {
      name: 'inventorySave',
      partialize: (state) => ({
        items: state.items,
      }),
    },
  ),
);
