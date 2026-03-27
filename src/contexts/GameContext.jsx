import React, { useState, createContext, useContext } from "react";
import { Character } from "../classes/Character";

const GameContext = createContext();

// Реализуем выводы в консоль?
export const GameProvider = ({ children }) => {
  // Состояния
  const [player, setPlayer] = useState(new Character("Кто я?"));
  const [gameStarted, setGameStarted] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("paradiseGlade");
  const [inCombat, setInCombat] = useState(false);
  const [inDialog, setInDialog] = useState(false);
  const [dialogIndex, setDialogIndex] = useState(0);
  const [currentEnemy, setCurrentEnemy] = useState(null);
  const [screen, setScreen] = useState("start");
  const [logs, setLogs] = useState([]);
  const [victory, setVictory] = useState(false);

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
