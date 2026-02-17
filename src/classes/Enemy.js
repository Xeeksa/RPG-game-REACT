const ENEMY_DAMAGE_PER_LEVEL = 2;

export class Enemy {
  constructor(name, status, health, defense, stamina, level, expReward) {
    this.name = name;
    this.status = status;
    this.health = health;
    this.defense = defense;
    // this.mana = mana;
    this.stamina = stamina;
    this.expReward = expReward;
    this.level = level;
  }

  attack(target) {
    let damage = this.level * ENEMY_DAMAGE_PER_LEVEL;

    if (target.isDefending) return 0;

    let totalDamage = damage - target.defense;

    // if (this.mana < 5) {
    //   return 0;
    // } else {
    //   this.mana -= 5;
    if (totalDamage < 1) {
      totalDamage = 1;
    }
    target.takeDamage(totalDamage);
    return totalDamage;
    // }
  }

  takeDamage(damage) {
    let actualDamage = Math.min(damage, this.health);
    this.health -= actualDamage;
    if (this.health <= 0) {
      this.isAlive = false;
      return actualDamage;
    }
    return actualDamage;
  }
}
