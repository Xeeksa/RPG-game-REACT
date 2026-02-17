// Состояния
const [player, setPlayer] = useState(null);
const [currentLocation, setCurrentLocation] = useState("paradiseGlade");
const [isCombat, setInCombat] = useState(false);
const [currentEnemy, setCurrentEnemy] = useState(null);
const [screen, steScreen] = useState("start");

// Функции
const moveToLocation = (locationKey) => {};
const startCombat = (enemy) => {};
const endCombat = (victory) => {};
const gameOver = (isVictory) => {};
const restart = () => {};

const GameContext = createContext();

// Реализуем выводы в консоль?
export const GameProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);

  const addLog = (text, type) => {
    setLogs((prev) => [...prev, { text, type, id: Date.now() }]);
  };

  return (
    <GameContext.Provider
      value={{ logs, addLog, player, currentLocation, inCombat, currentEnemy }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Бой
export function startCombat(player, enemy) {
  currentPlayer = player;
  currentEnemy = enemy;
  setLocationButtonState(true);
  combatButtons = document.querySelectorAll(".action-buttons button");
  if (!listenersAttached) {
    combatButtons.forEach((button) => {
      button.addEventListener("click", () => {
        let action = button.dataset.action;
        combatAction(action);
      });
    });
    listenersAttached = true;
  }
  combatButtons.forEach((button) => (button.disabled = false));
  addLog(
    `Тебя атакует ${enemy.name.toLowerCase()} (здоровье: ${currentEnemy.health})`,
    "mob-log",
  );
}

// Конец игры
export function gameOver(isVictory) {
  gameContainer.style.display = "none";
  gameOverContainer.style.display = "block";
  const title = document.querySelector(".game-over-title");
  title.textContent = isVictory
    ? "Поздравляю! Ты одолел тьму!"
    : "Игра окончена. Ты погиб.";
}

// Переключение состояний
const reducer = (state, action) => {
  switch (action.type) {
    case "ENEMY_DEFEATED":
      const updatedPlayer = { ...state.player };
      updatedPlayer.addExp(action.payload.exp);
      if (action.payload.itemDrop) {
        updatedPlayer.inventory = [
          ...updatedPlayer.inventory,
          action.payload.itemDrop,
        ];
      }

      return {
        ...state,
        player: updatedPlayer,
        inCombat: false,
        currentEnemy: null,
      };

    default:
      break;
  }
};

// MOVE_TO_LOCATION — переход
// START_COMBAT — начало боя
// ENEMY_DEFEATED — враг умер (опыт + лут)
// PLAYER_DAMAGE — игрок получил урон
// USE_ITEM — использование предмета
// PLAYER_DIED — смерть игрока
// GAME_RESTART — рестарт
