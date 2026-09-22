import { useGame } from '../contexts/GameContext.jsx';
import { locations } from '../data/locations.js';
import { createEnemy } from '../data/enemies.js';
import { getRandomPositiveInteger } from '../utils/helpers.js';
import { mobCries } from '../data/dialogs.js';
import { useBoss } from './useBoss.js';
import { Item, items } from '../data/items.js';
import { useInventoryStore } from '../stores/useInventoryStore.js';
import { usePlayerStore } from '../stores/usePlayerStore.js';

export const ENEMY_DAMAGE_PER_LEVEL = 2;

// Проверка наличия врага на локации
export const useCombat = () => {
  const { handleBossDefeat } = useBoss();

  const inventoryItems = useInventoryStore((state) => state.items);
  const addItem = useInventoryStore((state) => state.addItem);
  const removeItem = useInventoryStore((state) => state.removeItem);

  const {
    currentEnemy,
    setCurrentEnemy,
    setScreen,
    setInCombat,
    addLog,
    defeatedQuestMobs,
    setDefeatedQuestMobs,
  } = useGame(); 

  const checkForEnemy = (currentLocation: string) => {
    
    const enemiesArr = locations[currentLocation].enemies;

    if (!enemiesArr || enemiesArr.length == 0) return;
    let randomNum = Math.random();
    let randomMob = getRandomPositiveInteger(0, enemiesArr.length - 1);
    let enemyKey = enemiesArr[randomMob];
    if (randomNum > 0.5) {
      let enemy = createEnemy(enemyKey);

      if (!defeatedQuestMobs.includes(enemyKey)) {
        const cries = mobCries[enemy.key];
        const cry = cries[Math.floor(Math.random() * cries.length)];
        setCurrentEnemy(enemy);
        setInCombat(true);
        addLog(
          `Тебя атакует ${enemy.name.toLowerCase()} (здоровье: ${enemy.health})`,
          'mob-log',
        );
        addLog(`${enemy.name}: ${cry}`, 'mob-log');
      }
    } else {
      return;
    }
  };

  // Атака игрока
  function playerAttack() {
    const player = usePlayerStore.getState();

    if (!currentEnemy) return;
    let damage = player.attack(currentEnemy);
    let newEnemyHealth = currentEnemy.health - damage;
    currentEnemy.health = newEnemyHealth;
    setCurrentEnemy(currentEnemy);

    if (newEnemyHealth > 0) {
      addLog(
        `Ты наносишь ${damage} урона! У врага осталось ${newEnemyHealth} здоровья`,
        'system-log',
      );
      enemyTurn();
    } else {
      if (player.level < 10) {
      player.addExp(currentEnemy.expReward);
      addLog(
        `Темный дух ${currentEnemy.name} повержен. Твоя награда: ${currentEnemy.expReward} опыта.`,
        'system-log')
      } else {
        addLog(
        `Темный дух ${currentEnemy.name} повержен.`,
        'system-log',
      );
      }
      processLoot();
      if (currentEnemy.status === 'boss') {
        handleBossDefeat();
      }
      setCurrentEnemy(null);
      setInCombat(false);
    }
  }

  // Процесс получения лута
  function processLoot() {
    if (!currentEnemy) return;
    if (currentEnemy.itemDrop) {
      let itemKey = currentEnemy.itemDrop as keyof Item;
      let maxCount =
        'maxInInventory' in items[itemKey]
          ? items[itemKey].maxInInventory
          : undefined;
      let currentCountItemsInInventory = inventoryItems.filter(
        (i) => i === itemKey,
      ).length;

      if (currentEnemy.isQuestMob) {
        setDefeatedQuestMobs((prev) => [...prev, currentEnemy.key]);
      }

      if (maxCount === undefined) {
        addItem(currentEnemy.itemDrop)
        addLog(
          `Ты подбираешь ${items[currentEnemy.itemDrop as keyof Item].name}.`,
          'system-log',
        );
      } else if (
        typeof maxCount === 'number' &&
        currentCountItemsInInventory < maxCount
      ) {
        addItem(currentEnemy.itemDrop);
        addLog(
          `Ты подбираешь ${items[currentEnemy.itemDrop as keyof Item].name}.`,
          'system-log',
        );
      } else {
        addLog(
          `${items[currentEnemy.itemDrop as keyof Item].name} остается лежать на земле. Ты не можешь унести так много.`,
          'system-log',
        );
      }
    }
  }

  // Ход врага
  function enemyTurn() {
      const player = usePlayerStore.getState();

    if (!currentEnemy) return;
    let damage = currentEnemy.level * ENEMY_DAMAGE_PER_LEVEL;
    usePlayerStore.getState().takeDamage(damage);
    const newHealth = usePlayerStore.getState().health;
    addLog(
      `Ты получил ${damage} урона! У тебя осталось ${newHealth} здоровья.`,
      'system-log',
    );

    if (newHealth == 0) {
      setScreen('gameOver');
      setInCombat(false);
    }
  }

  // Защита игрока (пока) 100%
  function handlePlayerDefend() {
      const player = usePlayerStore.getState();

    player.defend();
    enemyTurn();
    addLog('Ты сдержал атаку!', 'system-log');
  }

  // Использование предмета игроком
  function handleUseItem(itemKey: string) {
    const player = usePlayerStore.getState();

    let item = items[itemKey as keyof Item];
    if (!inventoryItems.includes(itemKey)) {
      addLog('Такого предмета нет в твоем инвентаре!', 'system-log');
      return;
    }
    if ('canUse' in item && item.canUse && item.canUse(player)) {
      usePlayerStore.getState().useItem(itemKey);
      addLog(
        `Вы использовали ${items[itemKey as keyof Item].name}`,
        'system-log',
      );
    } else {
      addLog(
        `Ты не можешь использовать ${items[itemKey as keyof Item].name}`,
        'system-log',
      );
    }
  }

  return {
    checkForEnemy,
    playerAttack,
    enemyTurn,
    handlePlayerDefend,
    handleUseItem,
  };
};
