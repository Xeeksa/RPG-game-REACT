import { locations } from "./locations.js";
import { checkForEnemy } from "./combat.js";
import { Character } from "./character.js";
import { addLog } from "./util.js";
import { combatAction, combatButtons } from "./combat.js";

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

// Игрок
export const player = new Character("Путник");

// Перемещения игрока
export let currentLocation = "paradiseGlade";
const currentLocationInContainer = document.getElementById("current-location");
const locationDescription = document.querySelector(".location-description");

// Кнопки
const buttonStartGame = document.getElementById("start-button");
const introButton = document.getElementById("intro-button");
const attackButton = document.querySelector(".attack");
const protectionButton = document.querySelector(".protection");
const useItemButton = document.querySelector(".useItem");

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
  renderStarts(player);
  renderLocation();
  addLog(
    "Хранитель Поляны: Добро пожаловать, путник. Ты на Райской Поляне (далее текст будет продолжен позднее)",
    "npc-log",
  );
});

// Показываем текущую локацию и доступные переходы
function renderLocation() {
  currentLocationInContainer.textContent =
    locations[currentLocation].locationName;
  locationDescription.textContent = locations[currentLocation].description;
  locationButtonsContainer.innerHTML = "";

  let arrConnections = locations[currentLocation].connections;

  for (let locationConnections of arrConnections) {
    let nameLocationButton = locations[locationConnections].locationName;
    const locationButton = document.createElement("button");
    locationButton.textContent = nameLocationButton;
    locationButton.addEventListener("click", () => {
      currentLocation = locationConnections;
      renderLocation();
      checkForEnemy(currentLocation, player);
    });
    locationButtonsContainer.append(locationButton);
  }
}

// Обновляем характеристики в интерфейсе
export function renderStarts(player) {
  charName.textContent = player.name;
  charHealth.textContent = player.health;
  // charMana.textContent = player.mana;
  charDefense.textContent = player.defense;
  charLevel.textContent = player.level;
  charExperience.textContent = player.experience;
  charInventory.textContent = player.inventory.join(", ");
}

// Блокировка, разблокировка кнопок перехода по локациям во время боя

export function setLocationButtonState(disabled) {
  let locationButtons = document.querySelectorAll(".location-buttons button");
  locationButtons.forEach((button) => (button.disabled = disabled));
}

// Поражение

export function gameOver() {}

// Победа

export function victory() {}
