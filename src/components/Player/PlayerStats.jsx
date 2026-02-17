import React from "react";
import { Character } from "../../classes/Character";

const PlayerStats = ({ player }) => {
  return (
    <div className="player-stats">
      <h2>{player.name}</h2>
      <div>Здоровье: {player.health}</div>
      <div>Защита: {player.defense}</div>
      <div>Уровень: {player.level}</div>
      <div>Опыт: {player.experience}</div>
      <div>
        Инвентарь: {player.inventory.join(", ") || "твои карманы пусты"}
      </div>
    </div>
  );
};

export default PlayerStats;

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
