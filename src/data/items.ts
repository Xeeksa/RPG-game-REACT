interface PlayerSnapshot {
  health: number;
  maxHealth: number;
}

export interface Item {
  name: string;
  type: string;
  maxInInventory?: number;
  effect?: (player: PlayerSnapshot) => Partial<PlayerSnapshot>;
  canUse?: (player: PlayerSnapshot) => boolean;
}

export const items: Record<string, Item> = {
  healthPotion: {
    name: 'Отвар целебных трав',
    type: 'consumable',
    maxInInventory: 2,
    effect: (player) => ({
      health: player.maxHealth
    }),
    canUse: (player) => player.health < player.maxHealth,
  },

  blackMagickStaff: {
    name: 'Посох черной магии',
    type: 'weapon',
  },

  blackMagickShield: {
    name: 'Щит черной магии',
    type: 'shield',
  },
};
