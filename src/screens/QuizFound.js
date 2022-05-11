import { useContext } from "react";
import { MachineContext } from "../contexts/Machine";
export default function QuizFound() {
  const state = useContext(MachineContext);

  return (
    <div className="QuizFound">
      <h1>{state.context.quiz.title}</h1>
    </div>
  );
}
