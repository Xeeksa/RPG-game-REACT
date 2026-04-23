import { useGame } from '../contexts/GameContext';
import { createEnemy } from '../data/enemies';
import { lostBossDialog } from '../data/dialogs';
import { Enemy } from '../classes/Enemy';

export const useBoss = () => {
  const {
    player,
    setCurrentEnemy,
    setInCombat,
    setVictory,
    setScreen,
    addLog,
  } = useGame();

  // Битва с боссом доступна только при наличии черных щита и посоха.
  function checkBossAccess(): boolean {
    if (
      player.inventory.includes('blackMagickStaff') &&
      player.inventory.includes('blackMagickShield')
    ) {
      return true;
    }

    return false;
  }

  // Запуск боя с боссом
  function startBossFight(): void {
    if (checkBossAccess()) {
      let boss: Enemy = createEnemy('ancientDragon');
      addLog(
        `${boss.name}: Ах ты отродье человеческое! Сегодня ты умрешь!`,
        'boss-log',
      );

      addLog(`Тебя атакует ${boss.name} (здоровье: ${boss.health})`, 'mob-log');
      setCurrentEnemy(boss);
      setInCombat(true);
    } else {
      showPhrase(0);
    }
  }

  // Победа над боссом - геймОвер Вин
  function handleBossDefeat(): void {
    setVictory(true);
    setScreen('gameOver');
    setInCombat(false);
    return;
  }

  // Монолог босса перед поражением
  function showPhrase(index: number): void {
    if (index < lostBossDialog.length) {
      addLog(lostBossDialog[index], 'boss-log');
      setTimeout(() => showPhrase(index + 1), 2000);
    } else {
      addLog(
        'Чудовище, скрипя чешуей, медленно поползло твою сторону. Ничем хорошим это не обернется...',
        'system-log',
      );
      setTimeout(() => setScreen('gameOver'), 5000);
    }
  }

  return {
    checkBossAccess,
    startBossFight,
    handleBossDefeat,
  };
};
