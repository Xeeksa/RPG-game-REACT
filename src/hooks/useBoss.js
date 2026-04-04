import { useGame } from "../contexts/GameContext";
import { createEnemy } from "../data/enemies";

// Битва с боссом доступна только при наличии черных щита и посоха. Нет в инвентаре одного И второго, то при входе к боссу - смерть.
function checkBossAccess() {
  if (
    player.inventory.includes("blackMagickStaff") &&
    player.inventory.includes("blackMagickShield")
  ) {
    return true;
  }
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

// Победа над боссом - геймОвер Вин
function handleBossVictory() {}

// Взаимодействия с боссом + финал игры

/* 
В ЮИ.
- клик на локацию с боссом - предупреждение по типу "ты подходишь к местности, где свет практически исчезает. Воздух кажется спертым и мертвым, голова кружится от нехватки кислорода. Впереди тебя ждет что-то зловещее. Возможно, тебе не суждено вернуться и стоит тщательнее обдумать свое решение и подготовиться.
Точно хочешь идти дальше?"
*/
