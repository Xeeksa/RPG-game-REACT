import { create } from 'zustand';

interface InventoryState {
  items: string[];
  addItem: (item: string) => void;
  removeItem: (item: string) => void;
  reset: () => void;
}

export const useInventoryStore = create<InventoryState>((set) => ({
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
}));
