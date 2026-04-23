import { useRef, useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';

export const GameLog = () => {
  const { logs } = useGame();
  const logRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
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
