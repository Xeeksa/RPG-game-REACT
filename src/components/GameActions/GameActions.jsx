import { useGame } from "../../contexts/GameContext";
import { useCombat } from "../../hooks/useCombat";
import { locations } from "../../data/locations";
import { npcDialog } from "../../data/dialogs";
import { items } from "../../data/items";
import { useEffect, useState } from "react";

export const GameActions = () => {
  const [selectedItem, setSelectedItem] = useState();
  const {
    player,
    setPlayer,
    inCombat,
    inDialog,
    setInDialog,
    currentLocation,
    setDialogIndex,
    dialogIndex,
    addLog,
    hasSaidGoodbye,
    setHasSaidGoodbye,
    setDialogCompleted,
    setScreen,
  } = useGame();

  const { playerAttack, handlePlayerDefend, handleUseItem, checkForEnemy } =
    useCombat();

  const consumableItems = player.inventory.filter(
    (itemKey) => items[itemKey].type === "consumable",
  );

  const location = locations[currentLocation];
  const npc = location.npc?.name;

  const handleExplore = () => {
    checkForEnemy(currentLocation);
  };

  const handleNextStory = () => {
    setDialogIndex((prev) => prev + 1);
  };

  useEffect(() => {
    if (!inDialog) return;
    if (dialogIndex < npcDialog.length) {
      // Начинается сначала, если выйти из диалога на середине, а надо, чтобы продолжал!
      addLog(`${npc}: ${npcDialog[dialogIndex]}`, "npc-log");
    } else {
      if (!hasSaidGoodbye) {
        addLog(
          `${npc}: Ступай прочь. Я устал. Мне больше нечего сказать...`,
          "npc-log",
        );
        setHasSaidGoodbye(true);
        setDialogCompleted(true);
      }
    }
  }, [dialogIndex, inDialog]);

  // v Масштабировать под разные зелья! Пока только лечилка
  const handleTakePotion = () => {
    if (!player.inventory.includes("healthPotion")) {
      player.inventory.push("healthPotion");
      setPlayer(player);
      addLog(`Зелье получено!`, "system-log");
    } else {
      addLog(
        `${npc}: Твоя жадность обескураживает, Путник. Сначала используй свои зелья, а потом оббирай старика!`,
        "npc-log",
      );
    }
  };

  const handleLeave = () => {
    setInDialog(false);
  };

  return (
    <section className="actions">
      <h2>Действия</h2>
      <div className="action-buttons">
        {!inCombat && !inDialog && location?.npc && (
          <button
            onClick={() => {
              setInDialog(true);
            }}
            title="Поговорить с Хранителем поляны"
          >
            Поговорить
          </button>
        )}

        {!inCombat && !inCombat && !location?.npc && (
          <button onClick={handleExplore}>Исследовать</button>
        )}

        {inCombat && (
          <>
            <button disabled={!inCombat} onClick={playerAttack}>
              Атаковать
            </button>
            <button disabled={!inCombat} onClick={handlePlayerDefend}>
              Защищаться
            </button>

            <select onChange={(e) => setSelectedItem(e.target.value)}>
              {consumableItems.map((itemKey) => (
                <option value={itemKey} key={itemKey}>
                  {items[itemKey].name}
                </option>
              ))}
            </select>

            <button
              disabled={!inCombat}
              onClick={() => handleUseItem(selectedItem)}
            >
              Использовать предмет
            </button>
          </>
        )}

        {inDialog && (
          <>
            <button onClick={handleNextStory}>Выслушать</button>
            <button onClick={handleTakePotion}>Взять зелье</button>
            <button onClick={handleLeave}>Продолжить путь</button>
          </>
        )}
      </div>
    </section>
  );
};
