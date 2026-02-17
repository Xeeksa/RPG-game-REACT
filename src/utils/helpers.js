// addLog(
//   "Хранитель Поляны: Добро пожаловать, путник. Ты на Райской Поляне (далее текст будет продолжен позднее)",
//   "npc-log",
// );

// Для рандомных событий
export function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

// Лог
const logGame = document.getElementById("log-content");
export function addLog(text, className = "") {
  let entry = document.createElement("div");
  entry.textContent = text;
  if (className) entry.classList.add(className);
  logGame.appendChild(entry);
  logGame.scrollTop = logGame.scrollHeight;
}

// Очистка лога
export function clearSystemLog() {
  let entries = logGame.querySelectorAll(".system-log, .mob-log");
  entries.forEach((entry) => entry.remove());
}
