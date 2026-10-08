import { useState, createContext, useContext, ReactNode } from 'react';
import { Enemy } from '../data/enemies';
import { usePlayerStore } from '../stores/usePlayerStore';
import { useInventoryStore } from '../stores/useInventoryStore';

const GameContext = createContext<GameContextValue | null>(null);

interface LogEntry {
  text: string;
  type: string;
  id: string;
}

interface GameContextValue {
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
}

export const GameProvider = ({ children }: { children: ReactNode }) => {
  // Состояния
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

  const addLog = (text: string, type: string): void => {
    setLogs((prev: LogEntry[]) => {
      const lastLog = prev[prev.length - 1];

      if (lastLog && lastLog.text === text) return prev;

      return [...prev, { text, type, id: crypto.randomUUID() }];
    });
  };

  const clearSystemLog = (): void => {
    setLogs((prev: LogEntry[]) =>
      prev.filter((log) => log.type === 'npc-log' || log.type === 'boss-logs'),
    );
  };

  const restartGame = (): void => {
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
    setHasSaidGoodbye(false);
    setDialogCompleted(false);
    usePlayerStore.getState().reset();
    useInventoryStore.getState().reset();
  };

  return (
    <GameContext.Provider
      value={{
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
