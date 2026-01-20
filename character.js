import { items } from "./items.js";
const BASE_DAMAGE_PER_LEVEL = 60;

export class Character {
  constructor(
    name = "Странник",
    health = 20,
    // mana = 20,
    defense = 0,
    level = 1,
    experience = 0,
    inventory = [],
  ) {
    this.isAlive = true;
    this.name = name;
    this.health = health;
    this.maxHealth = health;
    // this.mana = mana;
    // this.maxMana = mana;
    this.defense = defense;
    this.tempDefense = 0;
    this.level = level;
    this.experience = experience;
    this.inventory = inventory;
    this.expTable = [49, 79, 139, 239, 349, 499, 539, 689, 849, 999];
  }

  useItem(itemIndex) {
    if (itemIndex >= this.inventory.length || itemIndex < 0) {
      addLog("Такого предмета нет в твоем инвентаре", "system-log");
      return;
    }
    let itemKey = this.inventory[itemIndex];
    let itemName = items[itemKey].name;
    if (itemKey === "healthPotion") {
      this.health = this.maxHealth;
    }
    // if (itemKey === "manaPotion") {
    //   this.mana = this.maxMana;
    // }
    this.inventory.splice(itemIndex, 1);
    let message = `Вы использовали ${itemName}`;
    addLog(message, "system-log");
  }

  attack(target) {
    let damage = this.level * BASE_DAMAGE_PER_LEVEL;
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
  }
  // }

  defend() {
    this.tempDefense = 2;
  }

  takeDamage(damage) {
    let actualDamage = damage - this.tempDefense;
    this.tempDefense = 0;
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
