import { useContext } from "react";
import { MachineContext, MachineDispatchContext } from "../contexts/Machine";
import styles from "./ScoreBoard.module.css";
export default function ScoreBoard(props) {
  const state = useContext(MachineContext);
  const send = useContext(MachineDispatchContext);
  return (
    <section id="ScoreBoard" className={styles.ScoreBoard}>
      {state.context.players.map((player, index) => {
        return (
          <div
            key={player.player}
            className={
              index === state.context.currentPlayer ? styles.active : null
            }
          >
            <h3>{player.player}</h3>
            <p>{player.score}</p>
            {state.matches("game.questionShown") && (
              <button
                onClick={() =>
                  send({
                    type: "awardPoints",
                    player: player.player,
                  })
                }
              >
                Correct Answer
              </button>
            )}
          </div>
        );
      })}
    </section>
  );
}
