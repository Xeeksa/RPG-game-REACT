import { useGame } from "../../contexts/GameContext";
import { locations } from "../../data/locations";
import { useCombat } from "../../hooks/useCombat";
import { addLog } from "../../utils/helpers";
import { npcDialog } from "../../data/dialogs";

export const LocationInfo = () => {
  const {
    currentLocation,
    setCurrentLocation,
    inCombat,
    clearSystemLog,
    setInDialog,
    dialogIndex,
    inDialog,
    setDialogIndex,
    addLog,
  } = useGame();
  const { checkForEnemy } = useCombat();
  const location = locations[currentLocation];

  const handleMove = (newLocation) => {
    setCurrentLocation(newLocation);
    clearSystemLog();
    setInDialog(false);
    if (!inCombat) {
      checkForEnemy(newLocation);
    }
  };

  return (
    <section className="location">
      <h2>Текущая локация: {location.locationName}</h2>
      <p className="location-description">{location.description}</p>
      <div className="location-buttons">
        {locations[currentLocation].connections.map((dest) => (
          <button
            key={dest}
            onClick={() => handleMove(dest)}
            disabled={inCombat}
          >
            {locations[dest].locationName}
          </button>
        ))}
      </div>
    </section>
  );
};
