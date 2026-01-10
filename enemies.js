//Ответственность: Противники
//Типы врагов (гоблин, орк, дракон и т.д.)
//Их характеристики (здоровье, урон, защита)
//Шаблоны для создания врагов
//Боссы и особые враги

export class Enemy {
    constructor(name, status, health, defense, mana, stamina, level, expReward) {
        this.name = name;
        this.status = status;
        this.health = health;
        this.defense = defense;
        this.mana = mana;
        this.stamina = stamina;
        this.expReward = expReward;
        this.level = level;
        this.isAlive = true;
    }
}

//export const enemyTemplates = {
//    orc: {name: 'Орк', status: 'mob', health: 100, defense: 0, mana: 0, stamina: 50, level: 2},
//    ogre: {name: 'Огр', status: 'mob', health: 80, defense: 0, mana: 0, stamina: 50, level: 2},
//    goblin: {name: 'Гоблин', status: 'mob', health: 80, defense: 0, mana: 0, stamina: 50, level: 2},
//    lostLittleDragon: {name: 'Заблудившийся дракончик', status: 'mob', health: 80, defense: 0, mana: 0, stamina: 50, level: 2},
//    littleDragon: {name: 'Дракончик', status: 'mob', health: 80, defense: 0, mana: 0, stamina: 50, level: 2},
//    lostWoodcutteer: {name: 'Заплутавший дровосек', status: 'mob', health: 80, defense: 0, mana: 0, stamina: 50, level: 2},
//    shadowOfRaven: {name: 'Тень ворона', status: 'mob', health: 80, defense: 0, mana: 0, stamina: 50, level: 2},
//    mermaid: {name: 'Русалка', status: 'mob', health: 80, defense: 0, mana: 0, stamina: 50, level: 2},
//    leshy: {name: 'Леший', status: 'mob', health: 80, defense: 0, mana: 0, stamina: 50, level: 2},
//    feralDog: {name: 'Одичавший пес', status: 'mob', health: 80, defense: 0, mana: 0, stamina: 50, level: 2},
//    theif: {name: 'Вор', status: 'mob', health: 80, defense: 0, mana: 0, stamina: 50, level: 2},
//    ancientDragon: {name: 'Древний дракон', status: 'boss', health: 80, defense: 0, mana: 0, stamina: 50, level: 10}
//};

export const enemyTemplates = {
    orc: {
        name: "Орк",
        status: "mob",
        health: 110,
        defense: 8,
        mana: 5,
        stamina: 65,
        level: 2,
        expReward: 15
    },
    ogre: {
        name: "Огр",
        status: "mob",
        health: 130,
        defense: 12,
        mana: 0,
        stamina: 70,
        level: 3,
        expReward: 20
    },
    goblin: {
        name: "Гоблин",
        status: "mob",
        health: 45,
        defense: 2,
        mana: 20,
        stamina: 75,
        level: 1,
        expReward: 15
    },
    lostLittleDragon: {
        name: "Заблудившийся дракончик",
        status: "mob",
        health: 95,
        defense: 7,
        mana: 40,
        stamina: 50,
        level: 3,
        expReward: 25
    },
    littleDragon: {
        name: "Дракончик",
        status: "mob",
        health: 120,
        defense: 10,
        mana: 60,
        stamina: 55,
        level: 4,
        expReward: 30
    },
    lostWoodcutteer: {
        name: "Заплутавший дровосек",
        status: "mob",
        health: 65,
        defense: 3,
        mana: 0,
        stamina: 60,
        level: 2,
        expReward: 20
    },
    shadowOfRaven: {
        name: "Тень ворона",
        status: "mob",
        health: 70,
        defense: 4,
        mana: 55,
        stamina: 45,
        level: 3,
        expReward: 25
    },
    mermaid: {
        name: "Русалка",
        status: "mob",
        health: 50,
        defense: 1,
        mana: 70,
        stamina: 35,
        level: 3,
        expReward: 25
    },
    leshy: {
        name: "Леший",
        status: "mob",
        health: 85,
        defense: 5,
        mana: 65,
        stamina: 40,
        level: 4,
        expReward: 30
    },
    feralDog: {
        name: "Одичавший пес",
        status: "mob",
        health: 55,
        defense: 2,
        mana: 0,
        stamina: 80,
        level: 1,
        expReward: 15
    },
    theif: {
        name: "Вор",
        status: "mob",
        health: 40,
        defense: 3,
        mana: 25,
        stamina: 85,
        level: 2,
        expReward: 20
    },
    ancientDragon: {
        name: "Древний дракон",
        status: "boss",
        health: 250,
        defense: 18,
        mana: 120,
        stamina: 80,
        level: 10,
        expReward: 999
    }
};
