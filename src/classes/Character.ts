
const BASE_DAMAGE_PER_LEVEL = 80;

class Character {
  isAlive: boolean;
  name: string;
  health: number;
  maxHealth: number;
  defense: number;
  isDefending: boolean;
  level: number;
  experience: number;
  inventory: string[];
  expTable: number[];

  constructor(
    name: string = 'Странник',
    health: number = 20,
    defense: number = 0,
    level: number = 1,
    experience: number = 0,
    inventory: string[] = ['healthPotion'],
  ) {
    this.isAlive = true;
    this.name = name;
    this.health = health;
    this.maxHealth = health;
    this.defense = defense;
    this.isDefending = false;
    this.level = level;
    this.experience = experience;
    this.inventory = inventory;
    this.expTable = [49, 129, 239, 349, 499, 539, 689, 849, 999];
  }

  useItem(itemKey: string) {
    let item = items[itemKey] as Item;

    if (item.effect) {
      const current = get();
      const changes = item.effect({
        health: current.health,
        maxHealth: current.maxHealth,
      });
      set(changes);
    }

    useInventoryStore.getState().removeItem(itemKey)
  }

  attack(target: Character): number {
    let damage = this.level * BASE_DAMAGE_PER_LEVEL;
    let totalDamage = Math.max(1, damage - target.defense);
    return totalDamage;
  }

  defend() {
    this.isDefending = true;
  }

  takeDamage(damage: number) {
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

  addExp(points: number) {
    if(this.level === 10) return;
    this.experience += points;
    while (this.experience >= this.expTable[this.level - 1]) this.levelUp();
  }

  levelUp() {
    this.level += 1;
    this.maxHealth += 2;
    this.health = this.maxHealth;
    this.defense += 1;
  }
}
