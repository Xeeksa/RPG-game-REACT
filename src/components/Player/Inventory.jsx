// Клик на копку использования предмета
// Реализовано пока что под один предмет - зелье здоровья
useItemButton.addEventListener("click", () => {
  let player = gameState.player;
  let index = player.inventory.indexOf("healthPotion");

  if (index === -1) {
    addLog("Твой инвентаь пуст!", "system-log");
  } else {
    player.useItem(index);
  }
});

//Всплывающие пояснялки к предметам
