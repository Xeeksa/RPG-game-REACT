import { Character } from "../classes/Character.js";

export const gameState = {
  player: null,
  currentLocation: "paradiseGlade",
  inCombat: false,
  currentEnemy: null,
};

export function initGame() {
  gameState.player = new Character("Путник");
}
