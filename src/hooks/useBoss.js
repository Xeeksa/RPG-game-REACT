import { useGame } from "../contexts/GameContext";
import { createEnemy } from "../data/enemies";

export const useBoss = () => {
  const { player, setCurrentEnemy, setInCombat, setVictory, setScreen } =
    useGame();

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
    }
  }

  // Логика смерти и геймОвер если предметов нет

  // Взаимодействия с боссом + финал игры

  // Победа над боссом - геймОвер Вин
  function handleBossDefeat() {
    setVictory(true);
    setScreen("gameOver");
    setInCombat(false);
    return;
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
