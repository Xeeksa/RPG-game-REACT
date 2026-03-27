import React from "react";
import { Character } from "../../classes/Character";
import { useCombat } from "../../hooks/useCombat";
import { items } from "../../data/items";

export const PlayerStats = ({ player }) => {
  const { handleUseItem } = useCombat();
  function handleItemClick(itemKey) {
    handleUseItem(itemKey);
  }
  return (
    <section className="player-stats">
      <h2>{player.name}</h2>
      <div>Здоровье: {player.health}</div>
      <div>Защита: {player.defense}</div>
      <div>Уровень: {player.level}</div>
      <div>Опыт: {player.experience}</div>
      <div>
        <h2>Инвентарь</h2>
        <ul>
          {player.inventory.map((itemKey) => (
            <li key={itemKey}>
              <button onClick={() => handleItemClick(itemKey)}>
                {items[itemKey].name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
