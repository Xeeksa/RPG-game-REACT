import React from 'react';
import { Character } from '../../classes/Character';
import { useCombat } from '../../hooks/useCombat';
import { items } from '../../data/items';
import { useInventoryStore } from '../../stores/useInventoryStore';

export const PlayerStats = ({ player }) => {
  const { handleUseItem } = useCombat();

  const items = useInventoryStore((state) => state.items)

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
      <div className="inventory-section">
        <p>Инвентарь:</p>
        <ul className="inventory-list">
          {items.map((itemKey) => (
            <li key={crypto.randomUUID()}>
              <button
              // handleItem позднее заменить на removeItem из стора!
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
