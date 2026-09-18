import { create } from "zustand";
import { items, Item } from '../data/items';
import { useInventoryStore } from "./useInventoryStore";
import { PlayerSnapshot } from "../data/items";

// const BASE_DAMAGE_PER_LEVEL = 80;

interface PlayerState {
    name: string;
    health: number;
    maxHealth: number;
    defense: number;
    level: number;
    experience: number;
    expTable: number[];

    addExp: (points: number) => void;
    takeDamage: (damage: number) => void;
    heal: () => void;
    levelUp: () => void;
}

const expTable = [49, 129, 239, 349, 499, 539, 689, 849, 999];

export const usePlayerStore = create<PlayerState>((set, get) => ({
  name: 'Кто я?',
  health: 20,
  maxHealth: 20,
  defense: 0,
  level: 1,
  experience: 0,
  expTable,

  addExp: (points) => {
    set((state) => {
      let newExp = state.experience + points;
      let newLevel = state.level;
      while (newLevel < 10 && newExp >= state.expTable[newLevel - 1]) {
        newExp -= state.expTable[newLevel - 1];
        newLevel++;
      }
      return {
        experience: newExp,
        level: newLevel,
      }
    })
  },

  takeDamage: (damage) => {
    set((state) => {
      const actualDamage = Math.max(0, damage - state.defense);
      const newHealth = Math.max(0, state.health - actualDamage);
      return { health: newHealth }
    })
  },

  heal: () => {
    set((state) => ({ health: state.maxHealth }))
  },

  levelUp: () => {},

  useItem(itemKey: string) {
    let item = items[itemKey] as Item;
  
    if (item.effect) {
        const current = get();
        const snapshot: PlayerSnapshot = {
          health: current.health,
          maxHealth: current.maxHealth,
        };
        const changes = item.effect(snapshot);
        set(changes);
    }
  
      useInventoryStore.getState().removeItem(itemKey)
  },

  attak: () => {},

  defend: () => {},

}))
