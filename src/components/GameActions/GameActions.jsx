import { useGame } from "../../contexts/GameContext";
import { useCombat } from "../../hooks/useCombat";
import { locations } from "../../data/locations";
import { npcDialog } from "../../data/dialogs";
import { useState } from "react";

export const GameActions = () => {
  const [selectedItem, setSelectedItem] = useState();
  const {
    inCombat,
    inDialog,
    setInDialog,
    currentLocation,
    setDialogIndex,
    dialogIndex,
    addLog,
    setScreen,
  } = useGame();

  const { checkForEnemy } = useCombat();

  const { playerAttack, handlePlayerDefend, handleUseItem } = useCombat();

  const location = locations[currentLocation];

  const handleExplore = () => {
    checkForEnemy(currentLocation);
  };
  // // 4. Состояния
  // // Нужно отслеживать:
  // //     dialogIndex (текущая фраза)
  // //     hasTakenPotion (взято ли зелье)
  const handleNextStory = () => {
    setDialogIndex((prev) => prev + 1);

    if (dialogIndex < npcDialog.length) {
      addLog(npcDialog[dialogIndex], "npc-log");
    } else {
      addLog("Ступай прочь. Я устал. Мне больше нечего сказать...", "npc-log");
    }
  };

  const handleTakePotion = () => {
    // 2. Кнопка "Взять зелье"
    //     Проверяет, есть ли зелье у NPC (можно давать только один раз)
    //     Добавляет предмет в инвентарь игрока
    //     Выводит сообщение в лог
    //     Блокирует кнопку после использования
  };
  const handleLeave = () => {
    // 3. Кнопка "Вернуться"
    //     Просто закрывает диалог: setInDialog(false)
    //     Ничего больше не делает
  };

  return (
    <section className="actions">
      <h2>Действия</h2>
      <div className="action-buttons">
        {!inCombat && !inDialog && location?.npc && (
          <button
            onClick={() => {
              setInDialog(true);
              setDialogIndex(0);
              addLog(npcDialog[0], "npc-log");
            }}
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
            <button onClick={() => handleUseItem(selectedItem)}>
              Использовать предмет
            </button>
          </>
        )}

        {inDialog && (
          <>
            <button onClick={handleNextStory}>Выслушать</button>
            <button onClick={handleTakePotion}>Взять зелье</button>
            <button onClick={handleLeave}>Вернуться</button>
          </>
        )}
      </div>
    </section>
  );
};
