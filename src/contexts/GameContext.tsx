import {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { Character } from '../classes/Character';
import { Enemy } from '../classes/Enemy';

const GameContext = createContext<GameContextValue | null>(null);

interface LogEntry {
  text: string;
  type: string;
  id: string;
}

interface GameContextValue {
  player: Character;
  setPlayer: (player: Character) => void;
  currentLocation: string;
  setCurrentLocation: (location: string) => void;
  inCombat: boolean;
  setInCombat: (value: boolean) => void;
  currentEnemy: Enemy | null;
  setCurrentEnemy: (enemy: Enemy | null) => void;
  screen: string;
  setScreen: (screen: 'start' | 'intro' | 'game' | 'gameOver') => void;
  logs: LogEntry[];
  addLog: (text: string, type: string) => void;
  clearSystemLog: () => void;
  victory: boolean;
  dialogIndex: number;
  setDialogIndex: (value: number | ((prev: number) => number)) => void;
  inDialog: boolean;
  setInDialog: (value: boolean) => void;
  restartGame: () => void;
  dialogCompleted: boolean;
  setDialogCompleted: (value: boolean) => void;
  hasSaidGoodbye: boolean;
  setHasSaidGoodbye: (value: boolean) => void;
  defeatedQuestMobs: string[];
  setDefeatedQuestMobs: (
    value: string[] | ((prev: string[]) => string[]),
  ) => void;
  setVictory: (value: boolean) => void;
  lastWarningMessage: string | null;
  setLastWarningMessage: (value: string | null) => void;
  saveGame: () => void;
  loadGame: () => void;
}

export const GameProvider = ({ children }: { children: ReactNode }) => {
  // Состояния
  const [player, setPlayer] = useState(new Character('Кто я?'));
  const [currentLocation, setCurrentLocation] = useState('paradiseGlade');
  const [inCombat, setInCombat] = useState(false);
  const [inDialog, setInDialog] = useState(false);
  const [dialogIndex, setDialogIndex] = useState(0);
  const [currentEnemy, setCurrentEnemy] = useState<Enemy | null>(null);
  const [screen, setScreen] = useState('start');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [victory, setVictory] = useState(false);
  const [dialogCompleted, setDialogCompleted] = useState(false);
  const [hasSaidGoodbye, setHasSaidGoodbye] = useState(false);
  const [defeatedQuestMobs, setDefeatedQuestMobs] = useState<string[]>([]);
  const [lastWarningMessage, setLastWarningMessage] = useState<string | null>(
    null,
  );

  function saveGame() {
    const data = {
      player: {
        name: player.name,
        health: player.health,
        defense: player.defense,
        level: player.level,
        experience: player.experience,
        inventory: player.inventory,
      },
      currentLocation,
      defeatedQuestMobs,
      dialogCompleted,
      hasSaidGoodbye,
      logs,
    };
    localStorage.setItem('rpgSave', JSON.stringify(data));
  }

  function loadGame() {
    const savedData = localStorage.getItem('rpgSave');
    if (savedData) {
      const data = JSON.parse(savedData);
      if (data.logs) setLogs(data.logs);
      setPlayer(
        new Character(
          data.player.name,
          data.player.health,
          data.player.defense,
          data.player.level,
          data.player.experience,
          data.player.inventory,
        ),
      );
      setCurrentLocation(data.currentLocation);
      setDefeatedQuestMobs(data.defeatedQuestMobs);
      setDialogCompleted(data.dialogCompleted);
      setHasSaidGoodbye(data.hasSaidGoodbye);
      setScreen('game');
    }
  }

  useEffect(() => {
    loadGame();
  }, []);

  const addLog = (text: string, type: string): void => {
    setLogs((prev: LogEntry[]) => [
      ...prev,
      { text, type, id: crypto.randomUUID() },
    ]);
  };

  const clearSystemLog = (): void => {
    setLogs((prev: LogEntry[]) =>
      prev.filter((log) => log.type === 'npc-log' || log.type === 'boss-logs'),
    );
  };

  const restartGame = (): void => {
    setPlayer(new Character('Кто я?'));
    setCurrentLocation('paradiseGlade');
    setInCombat(false);
    setCurrentEnemy(null);
    setLogs([]);
    setInDialog(false);
    setDialogIndex(0);
    setVictory(false);
    setScreen('start');
    setDefeatedQuestMobs([]);
    localStorage.removeItem('rpgSave');
  };

  return (
    <GameContext.Provider
      value={{
        player,
        setPlayer,
        currentLocation,
        setCurrentLocation,
        inCombat,
        setInCombat,
        currentEnemy,
        setCurrentEnemy,
        screen,
        setScreen,
        logs,
        addLog,
        clearSystemLog,
        victory,
        setInDialog,
        dialogIndex,
        setDialogIndex,
        inDialog,
        restartGame,
        dialogCompleted,
        setDialogCompleted,
        hasSaidGoodbye,
        setHasSaidGoodbye,
        defeatedQuestMobs,
        setDefeatedQuestMobs,
        setVictory,
        lastWarningMessage,
        setLastWarningMessage,
        saveGame,
        loadGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextValue => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame должен использоваться в GameProvider');
  }

  return context;
};
