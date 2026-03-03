import { useGame } from "../contexts/GameContext.jsx";
import { locations } from "../data/locations.js";
import { createEnemy } from "../data/enemies.js";
import { getRandomPositiveInteger } from "../utils/helpers.js";
import { ENEMY_DAMAGE_PER_LEVEL } from "../classes/Enemy.js";

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
  } = useGame();

  const checkForEnemy = (currentLocation) => {
    const enemiesArr = locations[currentLocation].enemies;
    if (!enemiesArr || enemiesArr.length == 0) return;
    let randomNum = Math.random();
    let randomMob = getRandomPositiveInteger(0, enemiesArr.length - 1);
    if (randomNum > 0.5) {
      let enemyKey = enemiesArr[randomMob];
      let enemy = createEnemy(enemyKey, currentLocation);
      setCurrentEnemy(enemy);
      setInCombat(true);
      addLog(
        `Тебя атакует ${enemy.name.toLowerCase()} (здоровье: ${enemy.health})`,
        "mob-log",
      );
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
        `Ты наносишь ${damage} урона! Темный дух ${currentEnemy.name} повержен. Твоя награда: ${currentEnemy.expReward} опыта.`,
        "system-log",
      );
      setPlayer(player);

      if (currentEnemy.itemDrop) {
        player.inventory.push(currentEnemy.itemDrop);
        setPlayer(player);
        addLog(`Ты подбираешь ${currentEnemy.itemDrop}.`, "system-log");
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
      `Ты получил ${newPlayerHealth} урона! У тебя осталось ${newPlayerHealth} здоровья.`,
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
    if (!player.inventory.includes(itemKey)) {
      (addLog("Такого предмета нет в твоем инвентаре!"), "system-log");
    }
    player.useItem(itemKey);
    setPlayer(player);
    addLog(`Вы использовали ${item[itemsKey].name}`, "system-log");
  }

  return {
    checkForEnemy,
    playerAttack,
    enemyTurn,
    handlePlayerDefend,
    handleUseItem,
  };
};
