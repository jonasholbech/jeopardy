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
        return (qID + 1) * 100;
    }
  }
  return (
    <div ref={ref} className={`Question ${getState() > 1 ? "active" : ""}`}>
      <button onClick={() => send({ type: "click", q: { colID, qID } })}>
        {getText()}
        <br />
        {bbox.x}
      </button>
    </div>
  );
}
/*
 style={{
        transform: `translateX(${
          getState() > 1
            ? `${window.innerWidth / 2 - bbox.x - bbox.width / 4}px`
            : "0px"
        })`,
      }}
*/
