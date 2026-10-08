import { create } from 'zustand';
import { items, Item } from '../data/items';
import { useInventoryStore } from './useInventoryStore';
import { PlayerSnapshot, EnemySnapshot } from '../data/items';

const BASE_DAMAGE_PER_LEVEL = 80;
const LEVEL_UP_HEALTH_BONUS = 5;
const LEVEL_UP_DEFENSE_BONUS = 1;
const MAX_LEVEL = 10;
const MAX_EXP_POINTS = 1000;

interface PlayerState {
  name: string;
  health: number;
  maxHealth: number;
  defense: number;
  isDefending: boolean;
  level: number;
  experience: number;
  expTable: number[];

  addExp: (points: number) => void;
  takeDamage: (damage: number) => number;
  defend: () => void;
  attack: (target: EnemySnapshot) => number;
  heal: () => void;
  useItem: (itemKey: string) => void;
  reset: () => void;
}

const expTable = [49, 129, 239, 349, 499, 539, 689, 849, 999];

const applyExpAndLevel = (state: PlayerState, points: number) => {
  let newExp = state.experience + points;
  newExp = Math.min(newExp, MAX_EXP_POINTS);
  let newLevel = state.level;
  let leveledUp = false;

  if (newExp >= state.expTable[newLevel - 1] && newLevel < MAX_LEVEL) {
    newLevel++;
    leveledUp = true;
  }

  const newMaxHealth = leveledUp
    ? state.maxHealth + LEVEL_UP_HEALTH_BONUS
    : state.maxHealth;

  return {
    health: leveledUp ? newMaxHealth : state.health,
    maxHealth: newMaxHealth,
    defense: leveledUp ? state.defense + LEVEL_UP_DEFENSE_BONUS : state.defense,
    level: newLevel,
    experience: newExp,
  };
};

export const usePlayerStore = create<PlayerState>((set, get) => ({
  name: 'Кто я?',
  health: 20,
  maxHealth: 20,
  defense: 0,
  isDefending: false,
  level: 1,
  experience: 0,
  expTable,

  addExp: (points) => {
    set((state) => applyExpAndLevel(state, points));
  },

  takeDamage: (damage) => {
    const state = get();
    let isDefending = state.isDefending;

    if (isDefending) {
      set({ isDefending: false });
      return 0;
    } else {
      const actualDamage = Math.max(0, damage - state.defense);
      const newHealth = Math.max(0, state.health - actualDamage);
      set({ health: newHealth });
      return actualDamage;
    }
  },

  defend: () => {
    const isDefending = get().isDefending;
    if (!isDefending) set({ isDefending: true });
  },

  attack: (target: EnemySnapshot) => {
    const current = get();
    const damage = current.level * BASE_DAMAGE_PER_LEVEL;
    const totalDamage = Math.max(1, damage - target.defense);
    return totalDamage;
  },

  heal: () => {
    set((state) => ({ health: state.maxHealth }));
  },

  useItem: (itemKey: string) => {
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

    useInventoryStore.getState().removeItem(itemKey);
  },

  reset: () =>
    set({
      name: 'Кто я?',
      health: 20,
      maxHealth: 20,
      defense: 0,
      isDefending: false,
      level: 1,
      experience: 0,
    }),
}));
