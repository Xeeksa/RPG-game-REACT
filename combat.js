import { getRandomPositiveInteger, addLog } from "./util.js";
import { createEnemy } from "./enemies.js";
import { locations } from "./locations.js";
import { setLocationButtonState } from "./ui.js";

//Ответственность: Механика сражений
//Логика атаки/защиты
//Расчёт урона с учётом защиты
//Последовательность ходов
//Использование предметов в бою
//Победа/поражение

let currentPlayer, currentEnemy;
let listenersAttached = false;
export let combatButtons;

// Проверка наличия врага на локации
export function checkForEnemy(currentLocation, player) {
  let enemiesArr = locations[currentLocation].enemies;
  let randomNum = Math.random();
  let randomMob = getRandomPositiveInteger(0, enemiesArr.length - 1);
  if (!enemiesArr || enemiesArr.length == 0) return;
  if (randomNum <= 0.5) {
    return;
  } else if (randomNum > 0.5) {
    let enemyKey = enemiesArr[randomMob];
    let enemy = createEnemy(enemyKey);

    startCombat(player, enemy);
  }
}

// // Бой
export function startCombat(player, enemy) {
  currentPlayer = player;
  currentEnemy = enemy;
  setLocationButtonState(true);
  combatButtons = document.querySelectorAll(".action-buttons button");
  if (!listenersAttached) {
    combatButtons.forEach((button) => {
      button.addEventListener("click", () => {
        let action = button.dataset.action;
        combatAction(action);
      });
    });
    listenersAttached = true;
  }
  combatButtons.forEach((button) => (button.disabled = false));
  addLog(
    `Тебя атакует ${enemy.name.toLowerCase()} (здоровье: ${currentEnemy.health})`,
    "mob-log",
  );
}

// Проверка здоровья и статуса игры во время боя
function processEnemyTurn() {
  let damage = currentEnemy.attack(currentPlayer);
  if (currentEnemy.health <= 0) {
    addLog("Темный дух " + currentEnemy.name + " побежден", "system-log");
    currentPlayer.addExp(currentEnemy.expReward);
    if (combatButtons) {
      combatButtons.forEach((button) => {
        button.disabled = true;
      });
      setLocationButtonState(false);
    }
    if (currentEnemy.itemDrop) {
      currentPlayer.inventory.push(currentEnemy.itemDrop);
    }
  } else {
    addLog(`${currentEnemy.name} наносит вам ${damage} урона!`, "mob-log");
  }
  renderStarts(currentPlayer);

  if (currentPlayer.health <= 0) {
    gameOver();
  }
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
    addLog("Вы защитились от атаки!");
  }
  if (action == "useItem") {
    // обработчик клика на выбраный предмет => useItem(index)
    // ЕСЛИ инвентарь не пуст, ТО добавляем специальный класс с подсветкой
    // ЕСЛИ инвентарь пуст - окно с ошибкой.
    // Щит и посох НЕ считаются используемыми предметами
  }
  processEnemyTurn();
}
