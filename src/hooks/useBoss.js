import { useGame } from "../contexts/GameContext";
import { createEnemy } from "../data/enemies";
import { lostBossDialog } from "../data/dialogs";

export const useBoss = () => {
  const {
    player,
    setCurrentEnemy,
    setInCombat,
    setVictory,
    setScreen,
    addLog,
  } = useGame();

  // Битва с боссом доступна только при наличии черных щита и посоха. Нет в инвентаре одного И второго, то при входе к боссу - смерть.
  function checkBossAccess() {
    if (
      player.inventory.includes("blackMagickStaff") &&
      player.inventory.includes("blackMagickShield")
    ) {
      return true;
    }

    return false;
  }

  // Запускбоя с боссом
  function startBossFight() {
    if (checkBossAccess()) {
      let boss = createEnemy("ancientDragon");
      setCurrentEnemy(boss);
      setInCombat(true);
    } else {
      handleNoItems();
    }
  }

  // Логика смерти и геймОвер если предметов нет
  function handleNoItems() {
    showPhrase(0);
  }

  // Взаимодействия с боссом + финал игры

  // Победа над боссом - геймОвер Вин
  function handleBossDefeat() {
    setVictory(true);
    setScreen("gameOver");
    setInCombat(false);
    return;
  }

  // Монолог босса перед поражением
  function showPhrase(index) {
    console.log("вызов showPhrase с индексом", index);
    if (index < lostBossDialog.length) {
      addLog(lostBossDialog[index], "boss-log");
      setTimeout(() => showPhrase(index + 1), 2000);
    } else {
      addLog(
        "Чудовище, скрипя чешуей, медленно поползло твою сторону. Ничем хорошим это не обернется...",
        "system-log",
      );
      setTimeout(() => setScreen("gameOver"), 5000);
    }
  }

  return {
    checkBossAccess,
    startBossFight,
    handleBossDefeat,
  };
};

/* 
В ЮИ.
- клик на локацию с боссом - предупреждение по типу "ты подходишь к местности, где свет практически исчезает. Воздух кажется спертым и мертвым, голова кружится от нехватки кислорода. Впереди тебя ждет что-то зловещее. Возможно, тебе не суждено вернуться и стоит тщательнее обдумать свое решение и подготовиться.
Точно хочешь идти дальше?"
*/
