import { useGame } from "../../contexts/GameContext";
import { PlayerStats } from "../Player/PlayerStats";
import { GameActions } from "../GameActions/GameActions";
import { LocationInfo } from "../Location/LocationInfo";
import { GameLog } from "../UI/GameLog";

export const GameContainer = () => {
  const {
    screen,
    setScreen,
    player,
    victory,
    restartGame,
    inDialog,
    setInDialog,
  } = useGame();

  const changeScreen = (newScreen) => {
    setScreen(newScreen);
  };

  // if (screen === "start") {
  //   return (
  //     <section className="start-screen">
  //       <h2>Текстовая RPG Игра</h2>
  //       <p>Добро пожаловать в игру!</p>
  //       <button onClick={() => changeScreen("intro")}>
  //         Начать приключение!
  //       </button>
  //     </section>
  //   );
  // }

  // if (screen === "intro") {
  //   return (
  //     <section className="introduction">
  //       <h2 className="intro-title">Пробуждение</h2>
  //       <p className="intro-text">
  //         Вы открываете глаза и видите голубое небо, от которого исходит
  //         ощущение неестественности, искаженности. Вы не помните ни свое имя, ни
  //         свое прошлое. Воздух, касающийся вашей кожи, как будто утрированно
  //         сух. Вы поднимаетесь на локтях и ощущаете руками землю. Оглядываясь,
  //         вы видите костер, странно горящий средь бела дня и явно не служащий ни
  //         для освещения, ни для согревания путников. Продолжая переводить свой
  //         взгляд, вы видите человека... существо? Сильно зажмурившись и открыв
  //         глаза, вы снова смотрите в том же направлении и понимаете, что видите
  //         перед собой живое существо, похожее на человека, чей облик как будто
  //         беспрестанно смазывается и меняется: от человеческого старца до юноши,
  //         от юноши до странного вида лесного эльфа. Вы встаете, чтобы начать
  //         диалог.
  //       </p>
  //       <button onClick={() => changeScreen("game")}>Встать на ноги</button>
  //     </section>
  //   );
  // }

  // if (screen === "gameOver") {
  //   return (
  //     <section className="game-over-screen">
  //       <h2 className="game-over-title">
  //         {victory ? "Поздравляю. Ты одолел тьму." : "Игра окончена. Ты погиб"}
  //       </h2>
  //       <button onClick={() => restartGame()}>
  //         Начать новое путешествие...
  //       </button>
  //     </section>
  //   );
  // }

  if (screen === "game") {
    return (
      <section className="container">
        <section className="game-area">
          <h2 className="game-area-title">Хроники Запустения</h2>
          <div className="stats">
            <PlayerStats player={player} />
          </div>
          <GameActions />
        </section>

        {inDialog ? null : <LocationInfo />}

        <GameLog />
      </section>
    );
  }
};
