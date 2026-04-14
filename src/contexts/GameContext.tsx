import { useState, createContext, useContext, ReactNode } from 'react';
import { Character } from "../classes/Character";
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
        setCurrentLocation: any;
        inCombat: boolean;
        setInCombat: (value: boolean) => void;
        currentEnemy: Enemy | null;
        setCurrentEnemy: (enemy: Enemy | null) => void;
        screen: string;
        setScreen: (screen: 'start' | 'intro' | 'game' | 'gameOver') => void;
        logs: LogEntry[];
        addLog: (text: string, type: string) => void;
        clearSystemLog: any;
        victory: any;
        dialogIndex: number;
        setDialogIndex: (value: number | ((prev: number) => number)) => void;
        inDialog: boolean;
        setInDialog: (value: boolean) => void;
        restartGame: any;
        dialogCompleted: any;
        setDialogCompleted: (value: boolean) => void;
        hasSaidGoodbye: boolean;
        setHasSaidGoodbye: (value: boolean) => void;
        defeatedQuestMobs: string[];
        setDefeatedQuestMobs: (value: string[] | ((prev: string[]) => string[])) => void;
        setVictory: any;
}

export const GameProvider = ({ children }: {children: ReactNode}) => {
  // Состояния
  const [player, setPlayer] = useState(new Character("Кто я?"));
  const [currentLocation, setCurrentLocation] = useState("paradiseGlade");
  const [inCombat, setInCombat] = useState(false);
  const [inDialog, setInDialog] = useState(false);
  const [dialogIndex, setDialogIndex] = useState(0);
  const [currentEnemy, setCurrentEnemy] = useState<Enemy | null>(null);
  const [screen, setScreen] = useState("start");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [victory, setVictory] = useState(false);
  const [dialogCompleted, setDialogCompleted] = useState(false);
  const [hasSaidGoodbye, setHasSaidGoodbye] = useState(false);
  const [defeatedQuestMobs, setDefeatedQuestMobs] = useState<string[]>([]);

  const addLog = (text: string, type: string) => {
    setLogs((prev: LogEntry[]) => [...prev, { text, type, id: crypto.randomUUID() }]);
  };

  const clearSystemLog = () => {
    setLogs((prev: LogEntry[]) =>
      prev.filter((log) => log.type === "npc-log" || log.type === "boss-logs"),
    );
  };

  const restartGame = () => {
    setPlayer(new Character("Кто я?"));
    setCurrentLocation("paradiseGlade");
    setInCombat(false);
    setCurrentEnemy(null);
    setLogs([]);
    setInDialog(false);
    setDialogIndex(0);
    setVictory(false);
    setScreen("start");
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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextValue => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame должен использоваться в GameProvider");
  }

  return context;
};
