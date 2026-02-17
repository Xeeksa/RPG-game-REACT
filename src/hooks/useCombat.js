import { useGame } from "../contexts/GameContext.jsx";
import { locations } from "../data/locations.js";
import { createEnemy } from "../data/enemies.js";
import { getRandomPositiveInteger } from "../utils/helpers.jsx";

// Проверка наличия врага на локации
export const useCombat = () => {
  const { state, dispatch } = useGame;

  const checkForEnemy = (currentLocation) => {
    const enemiesArr = locations[currentLocation].enemies;

    if (!enemiesArr || enemiesArr.length == 0) return;

    let randomNum = Math.random();
    let randomMob = getRandomPositiveInteger(0, enemiesArr.length - 1);

    if (randomNum > 0.5) {
      let enemyKey = enemiesArr[randomMob];
      let enemy = createEnemy(enemyKey, currentLocation);

      dispatch({
        type: "START_COMBAT",
        payload: { enemy, location: currentLocation },
      });
    }
  };

  return checkForEnemy;
};

// Проверка здоровья и статуса игры во время боя
function processEnemyTurn() {
  if (currentEnemy.health <= 0) {
    addLog("Темный дух " + currentEnemy.name + " побежден", "system-log");
    currentPlayer.addExp(currentEnemy.expReward);
    renderStats(currentPlayer);
    addLog(`Ты получил ${currentEnemy.expReward} опыта!`, "system-log");

    if (currentEnemy.itemDrop) {
      // берем текущий инвентарь
      // добавляем новый предмет
      // обновляем стейт
      // currentPlayer.inventory.push(currentEnemy.itemDrop);
      // addLog(`Получен ${items[currentEnemy.itemDrop].name}`);
    }
    return;
  }

  let damage = currentEnemy.attack(currentPlayer);

  if (currentPlayer.health <= 0) {
    gameOver();
    return;
  }

  addLog(
    `${currentEnemy.name} наносит вам ${damage} Урона! У вас осталось ${currentPlayer.health} здоровья!`,
    "mob-log",
  );
}

// Обработка кликов по кнопкам боя

export function combatAction(action) {
  if (action == "attack") {
    let damageDealt = currentPlayer.attack(currentEnemy);
    addLog(
      `Вы нанесли ${damageDealt} урона! Оставшееся здоровье врага: ${currentEnemy.health}`,
      "system-log",
    );
  }
  if (action == "protection") {
    currentPlayer.defend();
    addLog(
      `Вы защитились от атаки, не получив урона. У вас осталось ${currentPlayer.health} здоровья!`,
      "system-log",
    );
  }
  if (action == "useItem") {
    // обработчик клика на выбраный предмет => useItem(index)
    // ЕСЛИ инвентарь не пуст, ТО добавляем специальный класс с подсветкой
    // ЕСЛИ инвентарь пуст - окно с ошибкой.
    // Щит и посох НЕ считаются используемыми предметами
  }
  processEnemyTurn();
}
