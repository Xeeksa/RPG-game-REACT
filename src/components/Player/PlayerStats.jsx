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
        <p>Инвентарь:</p>
        <ul>
          {player.inventory.map((itemKey) => (
            <li key={itemKey}>
              <button
                onClick={() => handleItemClick(itemKey)}
                className="button-item-icon"
              >
                <img
                  src={`/RPG-game-REACT/images/${itemKey}.png`}
                  alt={items[itemKey].name}
                  title={items[itemKey].name}
                  className="item-icon"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
