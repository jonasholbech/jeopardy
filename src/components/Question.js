import { useContext } from "react";
import { MachineContext, MachineDispatchContext } from "../contexts/Machine";
import { useBbox } from "../hooks/useBbox";
export default function Question({ answer, question, id, points, completed }) {
  const state = useContext(MachineContext);
  const send = useContext(MachineDispatchContext);
  const [bbox, ref] = useBbox();
  function getState() {
    if (
      state.matches("game.answerShown") &&
      state.context.activeQuestion === id
    ) {
      return 2;
    }
    if (
      state.matches("game.questionShown") &&
      state.context.activeQuestion === id
    ) {
      return 3;
    }
    return 1;
  }
  function getText() {
    switch (getState()) {
      case 2:
        return answer;
      case 3:
        return question;
      default:
        return points;
    }
  }
  const center = window.innerWidth / 2;
  const x = bbox.x;
  /* const scaledWidth = bbox.width * 2; */
  const newX = center - bbox.width / 2;
  const diff = newX - x;
  const scaled = diff / 2;
  return (
    <div
      ref={ref}
      className={`Question ${getState() > 1 ? "active" : ""}`}
      style={{ transform: getState() > 1 ? `translateX(${scaled}px)` : "" }}
    >
      <button
        disabled={completed}
        onClick={() =>
          send({
            type: "click",
            q: id,
            pool: points,
          })
        }
      >
        {getText()}
      </button>
    </div>
  );
}
/*
//TODO: Update completed on "click"
*/
