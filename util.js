//Ответственность: Вспомогательные функции
//Генерация случайных чисел
//Форматирование текста
//Работа с localStorage (если нужно сохранять прогресс)
//Общие хелперы

// Для рандомных событий
export function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

const logGame = document.getElementById("log-content");

export function addLog(text, className = "") {
  let entry = document.createElement("div");
  entry.textContent = text;
  if (className) entry.classList.add(className);
  logGame.appendChild(entry);
  logGame.scrollTop = logGame.scrollHeight;
}

// Распределить Лог по локациям: отображается только в той локации, где высветился.
