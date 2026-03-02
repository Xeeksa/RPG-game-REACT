import { useRef, useEffect } from "react";
import { useGame } from "../../contexts/GameContext";

export const GameLog = () => {
  const { logs } = useGame();
  const logRef = useRef();
  useEffect(() => {
    logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs]);

  return (
    <section className="log">
      <h2>Лог событий</h2>
      <div id="log-content" ref={logRef}>
        {logs.map((log) => (
          <div key={log.id} className={log.type}>
            {log.text}
          </div>
        ))}
      </div>
    </section>
  );
};

// Реализовать массив сообщений для рандомного вывода в коноль при любом действии
