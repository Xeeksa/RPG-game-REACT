// Показываем текущую локацию и доступные переходы
function renderLocation() {
  currentLocationInContainer.textContent =
    locations[gameState.currentLocation].locationName;
  locationDescription.textContent =
    locations[gameState.currentLocation].description;
  locationButtonsContainer.innerHTML = "";

  let arrConnections = locations[gameState.currentLocation].connections;

  for (let locationConnections of arrConnections) {
    let nameLocationButton = locations[locationConnections].locationName;
    const locationButton = document.createElement("button");
    locationButton.textContent = nameLocationButton;
    locationButton.addEventListener("click", () => {
      gameState.currentLocation = locationConnections;
      renderLocation();
      checkForEnemy(gameState.currentLocation, gameState.player);
    });
    clearSystemLog();
    locationButtonsContainer.append(locationButton);
  }
}
