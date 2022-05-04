import { useContext } from "react";
import { MachineContext, MachineDispatchContext } from "../contexts/Machine";
export default function QuizFound() {
  const send = useContext(MachineDispatchContext);
  const state = useContext(MachineContext);

  return (
    <div className="QuizFound">
      <h1>{state.context.quiz.title}</h1>
    </div>
  );
}
