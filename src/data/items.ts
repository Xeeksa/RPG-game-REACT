import { Character } from "../classes/Character";

export interface Items {
  healthPotion: {
      name: string;
      type: string;
      maxInInventory?: number;
      effect?: (player: Character) => void;
      canUse?: (player: Character) => boolean;
    };
    blackMagickStaff: { name: string; type: string };
    blackMagickShield: {name: string; type: string };
}

export const items: Items = { 
  healthPotion: {
    name: "Отвар целебных трав",
    type: "consumable",
    maxInInventory: 2,
    effect: (player: Character) => {
      player.health = player.maxHealth;
    },
    canUse: (player: Character) => player.health < player.maxHealth,
  },

  blackMagickStaff: {
    name: "Посох черной магии",
    type: "weapon",
  },

  blackMagickShield: {
    name: "Щит черной магии",
    type: "shield",
  },
};
