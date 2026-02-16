// Различные предметы в игре, которые можно залутать
export const items = {
  healthPotion: {
    name: "Отвар целебных трав",
    type: "consumable",
    effect: { health: "fullRestore" },
  },

  // manaPotion: {
  //   name: "Отвар магических трав",
  //   type: "consumable",
  //   effect: { mana: "fullRestore" },
  // },

  // Два предмета, без которых не пройти босса.
  blackMagickStaff: {
    name: "Посох черной магии",
    type: "weapon",
    effect: {},
  },

  blackMagickShield: {
    name: "Щит черной магии",
    type: "shield",
    effect: {},
  },
};
