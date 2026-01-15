import { getRandomPositiveInteger, addLog } from "./util.js";
import { player } from "./ui.js";
import { createEnemy } from "./enemies.js";
import { locations } from "./locations.js";

//Ответственность: Механика сражений
//Логика атаки/защиты
//Расчёт урона с учётом защиты
//Последовательность ходов
//Использование предметов в бою
//Победа/поражение

let combatButton = document.querySelectorAll(".action-buttons");

// Проверка наличия врага на локации
export function checkForEnemy(currentLocation) {
  let enemiesArr = locations[currentLocation].enemies;
  let randomNum = Math.random();
  let randomMob = getRandomPositiveInteger(0, enemiesArr.length - 1);
  if (enemiesArr.length == 0) return;
  if (randomNum <= 0.5) {
    return;
  } else if (randomNum > 0.5) {
    let enemyKey = enemiesArr[randomMob];
    let enemy = createEnemy(enemyKey);

    startCombat(player, enemy);
  }
}

// Проверка здоровья и статуса игры во время боя
function processEnemyTurn(player, enemy) {
  if (enemy.health <= 0) {
    addLog("Темный дух " + enemy.name + " побежден", "system-log");
    player.addExp(enemy.expReward);
    combatButton.forEach((button) => {
      button.disabled = true;
    });
    if (enemy.itemDrop) {
      player.inventory.push(enemy.itemDrop);
    }
  } else {
    enemy.attack(player);
  }

  if (player.health < 0) {
    gameOver();
  }
}

// // Бой
export function startCombat(player, enemy) {
  addLog("Тебя атакует " + enemy.name, "system-log");
  combatButton.forEach((button) => {
    button.disabled = false;
    if (button.dataset.action == "attack") {
      button.addEventListener("click", () => {
        player.attack(enemy);
        processEnemyTurn(player, enemy);
      });
    } else if (button.dataset.action == "protection") {
      button.addEventListener("click", () => {
        player.defende();
        processEnemyTurn(player, enemy);
      });
    } else if (button.dataset.action == "useItem") {
      // обработчик клика на выбраный предмет => useItem(index)
      // ЕСЛИ инвентарь не пуст, ТО добавляем специальный класс с подсветкой
      // ЕСЛИ инвентарь пуст - окно с ошибкой.
      // Щит и посох НЕ считаются используемыми предметами
      processEnemyTurn(player, enemy);
    }
  });
}
