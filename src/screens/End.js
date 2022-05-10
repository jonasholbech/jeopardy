import { useContext } from "react";
import { MachineContext, MachineDispatchContext } from "../contexts/Machine";
import styles from "./End.module.css";
import clone from "just-clone";
import ScoreGraph from "../components/ScoreGraph";
export default function End() {
  const state = useContext(MachineContext);
  const send = useContext(MachineDispatchContext);

  let sorted = clone(state.context.players);
  sorted
    .sort((a, b) => {
      if (a.score > b.score) {
        return -1;
      }
      if (a.score < b.score) {
        return 1;
      }
      return 0;
    })
    .reverse();
  let highest = sorted.at(-1).score;

  return (
    <div className="End boxed">
      <h1>Results</h1>
      <div className={styles.graph}>
        {sorted.map((player, index) => {
          console.log((player.score / highest) * 500);
          return (
            <ScoreGraph
              {...player}
              index={index}
              key={player.player}
              highest={highest}
            />
          );
        })}
      </div>
    </div>
  );
}
