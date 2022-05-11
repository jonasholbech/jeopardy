import { useContext } from "react";
import { MachineContext } from "../contexts/Machine";
import styles from "./ScoreBoard.module.css";
import PlayerScore from "./PlayerScore";
export default function ScoreBoard(props) {
  const state = useContext(MachineContext);

  return (
    <section id="ScoreBoard" className={styles.ScoreBoard}>
      {state.context.players.map((player, index) => {
        return (
          <PlayerScore key={player.player} index={index} player={player} />
        );
      })}
    </section>
  );
}
