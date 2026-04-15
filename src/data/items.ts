export const items = {
  healthPotion: {
    name: "Отвар целебных трав",
    type: "consumable",
    maxInInventory: 2,
    effect: (player) => {
      player.health = player.maxHealth;
    },
    canUse: (player) => player.health < player.maxHealth,
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
