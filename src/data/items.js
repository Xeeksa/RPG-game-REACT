// Различные предметы в игре, которые можно залутать
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

  // manaPotion: {
  //   name: "Отвар магических трав",
  //   type: "consumable",

  // },

  // Два предмета, без которых не пройти босса. Как прописать в реакте
  // что без них не пройти босса? мож свойством по типу use?
  blackMagickStaff: {
    name: "Посох черной магии",
    type: "weapon",
  },

  blackMagickShield: {
    name: "Щит черной магии",
    type: "shield",
  },
};
