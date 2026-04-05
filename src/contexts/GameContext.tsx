import { useState, createContext, useContext, ReactNode } from "react";
import { Character } from "../classes/Character";
import { Enemy } from '../classes/Enemy';


const GameContext = createContext<GameContextValue | null>(null);

interface GameState {
  player: Character | null;
  currentLocation: string;
  inCombat: boolean;
  inDialog: boolean;
  dialogIndex: number;
  currentEnemy: Enemy | null;
  screen: 'start' | 'intro' | 'game' | 'gameOver';
  logs: LogEntry[]; 
  victory: boolean;
  dialogCompleted: boolean;
  hasSaidGoodbye: boolean;
  defeatedQuestMobs: string[];
}

interface LogEntry {
text: string;
type: string;
id: string;
}

interface GameContextValue { // ЗАМЕНИТЬ ANY! 
          player: Character;
        setPlayer: any;
        currentLocation: any;
        setCurrentLocation: any;
        inCombat: any;
        setInCombat: any;
        currentEnemy: any;
        setCurrentEnemy: any;
        screen: any;
        setScreen: any;
        logs: any;
        addLog: any;
        clearSystemLog: any;
        victory: any;
        setInDialog: any;
        dialogIndex: any;
        setDialogIndex: any;
        inDialog: any;
        restartGame: any;
        dialogCompleted: any;
        setDialogCompleted: any;
        hasSaidGoodbye: any;
        setHasSaidGoodbye: any;
        defeatedQuestMobs: any;
        setDefeatedQuestMobs: any;
        setVictory: any;
}

export const GameProvider = ({ children }: {children: ReactNode}) => {
  // Состояния
  const [player, setPlayer] = useState(new Character("Кто я?"));
  const [currentLocation, setCurrentLocation] = useState("paradiseGlade");
  const [inCombat, setInCombat] = useState(false);
  const [inDialog, setInDialog] = useState(false);
  const [dialogIndex, setDialogIndex] = useState(0);
  const [currentEnemy, setCurrentEnemy] = useState(null);
  const [screen, setScreen] = useState("start");
  const [logs, setLogs] = useState([]);
  const [victory, setVictory] = useState(false);
  const [dialogCompleted, setDialogCompleted] = useState(false);
  const [hasSaidGoodbye, setHasSaidGoodbye] = useState(false);
  const [defeatedQuestMobs, setDefeatedQuestMobs] = useState([]);

  const addLog = (text, type) => {
    setLogs((prev) => [...prev, { text, type, id: crypto.randomUUID() }]);
  };

  const clearSystemLog = () => {
    setLogs((prev) =>
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

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame должен использоваться в GameProvider");
  }

  return context;
};
