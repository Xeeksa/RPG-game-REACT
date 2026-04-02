import { useGame } from "../contexts/GameContext.jsx";
import { locations } from "../data/locations.js";
import { createEnemy } from "../data/enemies.js";
import { getRandomPositiveInteger } from "../utils/helpers.js";
import { ENEMY_DAMAGE_PER_LEVEL } from "../classes/Enemy.js";
import { mobCries } from "../data/dialogs.js";
import { items } from "../data/items";

// Проверка наличия врага на локации
export const useCombat = () => {
  const {
    player,
    setPlayer,
    currentEnemy,
    setCurrentEnemy,
    inCombat,
    setScreen,
    setInCombat,
    addLog,
    defeatedQuestMobs,
    setDefeatedQuestMobs,
  } = useGame();

  const checkForEnemy = (currentLocation) => {
    const enemiesArr = locations[currentLocation].enemies;

    if (!enemiesArr || enemiesArr.length == 0) return;
    let randomNum = Math.random();
    let randomMob = getRandomPositiveInteger(0, enemiesArr.length - 1);
    let enemyKey = enemiesArr[randomMob];
    if (randomNum > 0.5) {
      let enemy = createEnemy(enemyKey, currentLocation);

      if (!defeatedQuestMobs.includes(enemyKey)) {
        const cries = mobCries[enemy.key];
        const cry = cries[Math.floor(Math.random() * cries.length)];
        setCurrentEnemy(enemy);
        setInCombat(true);
        addLog(
          `Тебя атакует ${enemy.name.toLowerCase()} (здоровье: ${enemy.health})`,
          "mob-log",
        );
        addLog(`${enemy.name}: ${cry}`, "mob-log");
      }
    } else {
      return;
    }
  };

  // Атака игрока
  function playerAttack() {
    let damage = player.attack(currentEnemy);
    let newEnemyHealth = currentEnemy.health - damage;
    setCurrentEnemy({ ...currentEnemy, health: newEnemyHealth });

    if (newEnemyHealth > 0) {
      addLog(
        `Ты наносишь ${damage} урона! У врага осталось ${newEnemyHealth} здоровья`,
        "system-log",
      );
      enemyTurn();
    } else {
      player.addExp(currentEnemy.expReward);
      addLog(
        `Ты наносишь ${currentEnemy.health} урона! Темный дух ${currentEnemy.name} повержен. Твоя награда: ${currentEnemy.expReward} опыта.`,
        "system-log",
      );
      setPlayer(player);

      if (currentEnemy.itemDrop) {
        let itemKey = currentEnemy.itemDrop;
        console.log("itemKey:", itemKey, "items[itemKey]:", items[itemKey]);
        let maxCount = items[itemKey].maxInInventory;
        let currentCountItemsInInventory = player.inventory.filter(
          (i) => i === itemKey,
        ).length;

        if (currentEnemy.isQuestMob) {
          setDefeatedQuestMobs((prev) => [...prev, currentEnemy.key]);
        }

        if (maxCount === undefined || currentCountItemsInInventory < maxCount) {
          player.inventory.push(currentEnemy.itemDrop);
          setPlayer(player);
          addLog(
            `Ты подбираешь ${items[currentEnemy.itemDrop].name}.`,
            "system-log",
          );
        } else {
          addLog(
            `${items[currentEnemy.itemDrop].name} остается лежать на земле. Ты не можешь унести так много.`,
            "system-log",
          );
        }
      } else {
        setPlayer(player);
      }

      setCurrentEnemy(null);
      setInCombat(false);
    }
  }

  // Ход врага
  function enemyTurn() {
    let damage = currentEnemy.level * ENEMY_DAMAGE_PER_LEVEL;
    let newPlayerHealth = Math.max(0, player.health - damage);
    player.health = newPlayerHealth;
    setPlayer(player);
    addLog(
      `Ты получил ${damage} урона! У тебя осталось ${newPlayerHealth} здоровья.`,
      "system-log",
    );

    if (newPlayerHealth == 0) {
      setScreen("gameOver");
      setInCombat(false);
    }
  }

  // Защита игрока (пока) 100%
  function handlePlayerDefend() {
    player.defend();
    enemyTurn();
    addLog("Ты сдержал атаку!", "system-log");
  }

  // Использование предмета игроком
  function handleUseItem(itemKey) {
    let item = items[itemKey];
    if (!player.inventory.includes(itemKey)) {
      addLog("Такого предмета нет в твоем инвентаре!", "system-log");
    }
    if (item.canUse && item.canUse(player)) {
      player.useItem(itemKey);
      setPlayer(player);
      // ПРОПИСАТЬ ЭФФЕКТ ИСПОЛЬЗОВАНИЯ ИТЕМА
      addLog(`Вы использовали ${items[itemKey].name}`, "system-log");
    } else {
      addLog(`Ты не можешь использовать ${items[itemKey].name}`, "system-log");
    }
  }

  return {
    checkForEnemy,
    playerAttack,
    enemyTurn,
    handlePlayerDefend,
    handleUseItem,
  };
};
