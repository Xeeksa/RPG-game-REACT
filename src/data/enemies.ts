import { Enemy } from '../classes/Enemy';

export interface EnemyTemplate {
  name: string;
  status: string;
  health: number;
  defense: number;
  level: number;
  expReward: number;
  isQuestMob?: boolean;
  itemDrop?: string;
}

export const enemyTemplates: Record<string, EnemyTemplate> = {
  orc: {
    name: 'Орк',
    status: 'mob',
    health: 110,
    defense: 8,
    level: 2,
    expReward: 15,
  },
  ogre: {
    name: 'Огр',
    status: 'mob',
    health: 130,
    defense: 12,
    level: 3,
    expReward: 20,
  },
  goblin: {
    name: 'Гоблин',
    status: 'mob',
    health: 45,
    defense: 2,
    level: 1,
    expReward: 15,
  },
  lostLittleDragon: {
    name: 'Заблудившийся дракончик',
    status: 'mob',
    health: 95,
    defense: 7,
    level: 3,
    expReward: 25,
    isQuestMob: true,
    itemDrop: 'blackMagickStaff',
  },
  littleDragon: {
    name: 'Дракончик',
    status: 'mob',
    health: 120,
    defense: 10,
    level: 4,
    expReward: 30,
    isQuestMob: true,
    itemDrop: 'blackMagickShield',
  },
  lostWoodcutteer: {
    name: 'Заплутавший дровосек',
    status: 'mob',
    health: 65,
    defense: 3,
    level: 2,
    expReward: 20,
  },
  shadowOfRaven: {
    name: 'Тень ворона',
    status: 'mob',
    health: 70,
    defense: 4,
    level: 3,
    expReward: 25,
  },
  mermaid: {
    name: 'Русалка',
    status: 'mob',
    health: 50,
    defense: 1,
    level: 3,
    expReward: 25,
    itemDrop: 'healthPotion',
  },
  leshy: {
    name: 'Леший',
    status: 'mob',
    health: 85,
    defense: 5,
    level: 4,
    expReward: 30,
  },
  feralDog: {
    name: 'Одичавший пес',
    status: 'mob',
    health: 55,
    defense: 2,
    level: 1,
    expReward: 15,
  },
  theif: {
    name: 'Вор',
    status: 'mob',
    health: 40,
    defense: 3,
    level: 2,
    expReward: 20,
  },
  ancientDragon: {
    name: 'Древний дракон',
    status: 'boss',
    health: 250,
    defense: 18,
    level: 10,
    expReward: 999,
  },
};

export function createEnemy(enemyKey: string): Enemy {
  let template = enemyTemplates[enemyKey];
  let enemy = new Enemy(
    template.name,
    template.status,
    template.health,
    template.defense,
    template.level,
    template.expReward,
    enemyKey,
    template.itemDrop || null,
    template.isQuestMob,
  );

  enemy.key = enemyKey;

  return enemy;
}
