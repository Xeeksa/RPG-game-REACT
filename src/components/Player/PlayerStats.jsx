import React from 'react';
import { useCombat } from '../../hooks/useCombat';
import { items } from '../../data/items';
import { useInventoryStore } from '../../stores/useInventoryStore';
import { usePlayerStore } from '../../stores/usePlayerStore';

export const PlayerStats = () => {
  const { handleUseItem } = useCombat();
  const name = usePlayerStore((state) => state.name);
  const health = usePlayerStore((state) => state.health);
  const defense = usePlayerStore((state) => state.defense);
  const level = usePlayerStore((state) => state.level);
  const experience = usePlayerStore((state) => state.experience);

  const inventoryItems = useInventoryStore((state) => state.items)

  function handleItemClick(itemKey) {
    handleUseItem(itemKey);
  }

  return (
    <section className="player-stats">
      <h2>{name}</h2>
      <div>Здоровье: {health}</div>
      <div>Защита: {defense}</div>
      <div>Уровень: {level}</div>
      <div>Опыт: {experience}</div>
      <div className="inventory-section">
        <p>Инвентарь:</p>
        <ul className="inventory-list">
          {inventoryItems.map((itemKey) => (
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
