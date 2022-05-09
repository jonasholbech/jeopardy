import { useState, useContext } from "react";
import { MachineContext, MachineDispatchContext } from "../contexts/Machine";
import CountUp from "react-countup";
import styles from "./ScoreBoard.module.css";
export default function PlayerScore({ player, index }) {
  const state = useContext(MachineContext);
  const send = useContext(MachineDispatchContext);
  const [oldScore, setOldScore] = useState(0);

  function localScore() {
    setOldScore(state.context.players[index].score);
  }
  function callback() {
    setOldScore(state.context.players[index].score);
    send({
      type: "awardPoints",
      player: player.player,
    });
  }

  return (
    <div
      className={index === state.context.currentPlayer ? styles.active : null}
    >
      <h3>{player.player}</h3>
      <p>
        <CountUp
          start={oldScore}
          end={player.score}
          duration={1}
          onEnd={localScore}
        />
      </p>
      {state.matches("game.questionShown") && (
        <button onClick={callback}>Correct Answer</button>
      )}
    </div>
  );
}
