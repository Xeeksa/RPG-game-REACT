import { create } from "zustand";

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
      let newExpTable = state.expTable;
      while (newLevel < 10 && newExp >= newExpTable[newLevel - 1]) {
        newExp -= newExpTable[newLevel - 1];
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

  levelUp: () => {}
}))

export class Character {
  isAlive: boolean;
  name: string;
  health: number;
  maxHealth: number;
  defense: number;
  isDefending: boolean;
  level: number;
  experience: number;
  inventory: string[];
  expTable: number[];

  constructor(
    name: string = 'Странник',
    health: number = 20,
    defense: number = 0,
    level: number = 1,
    experience: number = 0,
    inventory: string[] = ['healthPotion'],
  ) {
    this.isAlive = true;
    this.name = name;
    this.health = health;
    this.maxHealth = health;
    this.defense = defense;
    this.isDefending = false;
    this.level = level;
    this.experience = experience;
    this.inventory = inventory;
    this.expTable = [49, 129, 239, 349, 499, 539, 689, 849, 999];
  }

//   useItem(itemKey: string) {
//     const index = this.inventory.indexOf(itemKey);
//     let item = items[itemKey] as Item;
//     if (item.effect) {
//       item.effect(this);
//     }
//     this.inventory.splice(index, 1);
//   }

//   attack(target: Character): number {
//     let damage = this.level * BASE_DAMAGE_PER_LEVEL;
//     let totalDamage = Math.max(1, damage - target.defense);
//     return totalDamage;
//   }

//   defend() {
//     this.isDefending = true;
//   }

//   takeDamage(damage: number) {
//     if (this.isDefending) {
//       this.isDefending = false;
//       return 0;
//     }

//     let actualDamage = damage - this.defense;
//     if (actualDamage < 0) actualDamage = 0;
//     this.health -= actualDamage;
//     if (this.health <= 0) {
//       this.isAlive = false;
//     }
//     return actualDamage;
//   }

//   addExp(points: number) {
//     if(this.level === 10) return;
//     this.experience += points;
//     while (this.experience >= this.expTable[this.level - 1]) this.levelUp();
//   }

//   levelUp() {
//     this.level += 1;
//     this.maxHealth += 2;
//     this.health = this.maxHealth;
//     this.defense += 1;
//   }
}
