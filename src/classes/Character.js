import { items } from "../data/items";

const BASE_DAMAGE_PER_LEVEL = 80;

export class Character {
  constructor(
    name = "Странник",
    health = 20,
    // mana = 20,
    defense = 0,
    level = 1,
    experience = 0,
    inventory = ["healthPotion"],
  ) {
    this.isAlive = true;
    this.name = name;
    this.health = health;
    this.maxHealth = health;
    // this.mana = mana;
    // this.maxMana = mana;
    this.defense = defense;
    this.isDefending = false;
    this.level = level;
    this.experience = experience;
    this.inventory = inventory;
    this.expTable = [49, 79, 139, 239, 349, 499, 539, 689, 849, 999];
  }

  useItem(itemKey) {
    const index = this.inventory.indexOf(itemKey);
    let item = items[itemKey];
    item.effect(this);
    this.inventory.splice(index, 1);
  }

  attack(target) {
    let damage = this.level * BASE_DAMAGE_PER_LEVEL;
    let totalDamage = Math.max(1, damage - target.defense);

    // if (this.mana < 5) {
    //   return 0;
    // } else {
    //   this.mana -= 5;

    return totalDamage;
  }
  // }

  defend() {
    this.isDefending = true;
  }

  takeDamage(damage) {
    if (this.isDefending) {
      this.isDefending = false;
      return 0;
    }

    let actualDamage = damage - this.defense;
    if (actualDamage < 0) actualDamage = 0;
    this.health -= actualDamage;
    if (this.health <= 0) {
      this.isAlive = false;
    }
    return actualDamage;
  }

  addExp(points) {
    this.experience += points;
    while (this.experience >= this.expTable[this.level - 1]) this.levelUp();
  }

  levelUp() {
    this.level += 1;
    this.maxHealth += 2;
    this.health = this.maxHealth;
    // this.maxMana += 2;
    // this.mana = this.maxMana;
    this.defense += 1;
  }
}
