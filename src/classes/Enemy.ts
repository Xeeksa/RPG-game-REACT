import { Character } from './Character';

export const ENEMY_DAMAGE_PER_LEVEL = 2;

export class Enemy extends Character {
  status: string;
  expReward: number;
  itemDrop: string | null;
  isQuestMob: boolean;
  key: string;

  constructor(
    name: string,
    status: string,
    health: number,
    defense: number,
    level: number,
    expReward: number,
    key: string,
    itemDrop: string | null = null,
    isQuestMob: boolean = false,
  ) {
    super(name, health, defense, level, 0, []);
    this.status = status;
    this.expReward = expReward;
    this.itemDrop = itemDrop;
    this.key = key;
    this.isQuestMob = isQuestMob;
  }

  attack(target: Character): number {
    let damage = this.level * ENEMY_DAMAGE_PER_LEVEL;

    if (target.isDefending) return 0;

    let totalDamage = damage - target.defense;

    if (totalDamage < 1) {
      totalDamage = 1;
    }
    target.takeDamage(totalDamage);
    return totalDamage;
  }

  takeDamage(damage: number): number {
    let actualDamage = Math.min(damage, this.health);
    this.health -= actualDamage;
    if (this.health <= 0) {
      this.isAlive = false;
      return actualDamage;
    }
    return actualDamage;
  }
}
