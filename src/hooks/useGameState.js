import { locations } from "./locations.js";
import { checkForEnemy } from "./combat.js";
import { addLog, clearSystemLog } from "./util.js";
import { gameState } from "./gameState.js";
import { items } from "./items.js";

//Ответственность: Взаимодействие с пользователем
//Обновление статистики на экране
//Лог событий (что произошло)
//Отображение кнопок действий
//Реакция на действия игрока

// Контейнеры
const startGamecontainer = document.querySelector(".start-screen");
const introContainer = document.querySelector(".introduction");
const gameContainer = document.querySelector(".container");
export const locationButtonsContainer =
  document.getElementById("location-buttons");
const gameOverContainer = document.querySelector(".game-over-screen");

// Перемещения игрока
const currentLocationInContainer = document.getElementById("current-location");
const locationDescription = document.querySelector(".location-description");

// Кнопки
const buttonStartGame = document.getElementById("start-button");
const introButton = document.getElementById("intro-button");
// const attackButton = document.querySelector(".attack");
// const protectionButton = document.querySelector(".protection");
const useItemButton = document.querySelector(".useItem");
const restartButton = document.querySelector(".restart-button");

// Статы
const charName = document.getElementById("char-name");
const charHealth = document.getElementById("char-health");
// const charMana = document.getElementById("char-mana");
const charDefense = document.getElementById("char-defense");
const charLevel = document.getElementById("char-level");
const charExperience = document.getElementById("char-exp");
const charInventory = document.getElementById("char-inventory");

// Переход от старта к интро

buttonStartGame.addEventListener("click", () => {
  introContainer.style.display = "block";
  startGamecontainer.style.display = "none";
});

// Переход от интро к контейнеру игры
introButton.addEventListener("click", () => {
  introContainer.style.display = "none";
  gameContainer.style.display = "block";
  renderStats(gameState.player);
  renderLocation();
  addLog(
    "Хранитель Поляны: Добро пожаловать, путник. Ты на Райской Поляне (далее текст будет продолжен позднее)",
    "npc-log",
  );
});

// Показываем текущую локацию и доступные переходы
function renderLocation() {
  currentLocationInContainer.textContent =
    locations[gameState.currentLocation].locationName;
  locationDescription.textContent =
    locations[gameState.currentLocation].description;
  locationButtonsContainer.innerHTML = "";

  let arrConnections = locations[gameState.currentLocation].connections;

  for (let locationConnections of arrConnections) {
    let nameLocationButton = locations[locationConnections].locationName;
    const locationButton = document.createElement("button");
    locationButton.textContent = nameLocationButton;
    locationButton.addEventListener("click", () => {
      gameState.currentLocation = locationConnections;
      renderLocation();
      checkForEnemy(gameState.currentLocation, gameState.player);
    });
    clearSystemLog();
    locationButtonsContainer.append(locationButton);
  }
}

// Клик на копку использования предмета
// Реализовано пока что под один предмет - зелье здоровья

useItemButton.addEventListener("click", () => {
  let player = gameState.player;
  let index = player.inventory.indexOf("healthPotion");

  if (index === -1) {
    addLog("Твой инвентаь пуст!", "system-log");
  } else {
    player.useItem(index);
    renderStats(player);
  }
});

//Всплывающие пояснялки к предметам

// Обновляем характеристики в интерфейсе
export function renderStats(player) {
  charName.textContent = player.name;
  charHealth.textContent = player.health;
  // charMana.textContent = player.mana;
  charDefense.textContent = player.defense;
  charLevel.textContent = player.level;
  charExperience.textContent = player.experience;
  charInventory.textContent = player.inventory
    .map((key) => items[key].name)
    .join(", ");
}

// export const items = {
//   healthPotion: {
//     name: "Отвар целебных трав",
//     type: "consumable",
//     effect: { health: "fullRestore" },
//   },

// Блокировка, разблокировка кнопок перехода по локациям во время боя
export function setLocationButtonState(disabled) {
  let locationButtons = document.querySelectorAll(".location-buttons button");
  locationButtons.forEach((button) => (button.disabled = disabled));
}

// Конец игры
export function gameOver(isVictory) {
  gameContainer.style.display = "none";
  gameOverContainer.style.display = "block";
  const title = document.querySelector(".game-over-title");
  title.textContent = isVictory
    ? "Поздравляю! Ты одолел тьму!"
    : "Игра окончена. Ты погиб.";
}

// Перезапуск игры после окончания
restartButton.addEventListener("click", () => {
  location.reload();
});

// Вкрутить предупреждающее сообщение при входе на локацию босса, т.к. вход без предметов = смерть
