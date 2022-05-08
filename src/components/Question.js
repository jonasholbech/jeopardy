import { useContext } from "react";
import { MachineContext, MachineDispatchContext } from "../contexts/Machine";

export default function Question({ index, answer, question, colID, qID }) {
  const state = useContext(MachineContext);
  const send = useContext(MachineDispatchContext);

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
    <div className={`Question ${getState() > 1 ? "active" : ""}`}>
      <button onClick={() => send({ type: "click", q: { colID, qID } })}>
        {getText()}
      </button>
    </div>
  );
}
