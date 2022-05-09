import { useContext } from "react";
import { MachineContext, MachineDispatchContext } from "../contexts/Machine";
import { useBbox } from "../hooks/useBbox";
export default function Question({ index, answer, question, colID, qID }) {
  const state = useContext(MachineContext);
  const send = useContext(MachineDispatchContext);
  const [bbox, ref] = useBbox();
  function getState() {
    if (
      state.matches("game.answerShown") &&
      state.context.activeQuestion.qID === qID &&
      state.context.activeQuestion.colID === colID
    ) {
      return 2;
    }
    if (
      state.matches("game.questionShown") &&
      state.context.activeQuestion.qID === qID &&
      state.context.activeQuestion.colID === colID
    ) {
      return 3;
    }
    return 1;
  }
  function getText() {
    switch (getState()) {
      case 2:
        return state.context.quiz.categories[colID].questions[qID].answer;
      case 3:
        return state.context.quiz.categories[colID].questions[qID].question;
      default:
        return state.context.quiz.categories[colID].questions[qID].points;
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
        disabled={state.context.quiz.categories[colID].questions[qID].completed}
        onClick={() =>
          send({
            type: "click",
            q: { colID, qID },
            pool: state.context.quiz.categories[colID].questions[qID].points,
          })
        }
      >
        {getText()}
      </button>
    </div>
  );
}
/*
//Update completed on "click"

*/
/*
 style={{
        transform: `translateX(${
          getState() > 1
            ? `${window.innerWidth / 2 - bbox.x - bbox.width / 4}px`
            : "0px"
        })`,
      }}
*/
