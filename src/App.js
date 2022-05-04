import "./App.css";
import { useContext } from "react";
import { MachineContext, MachineDispatchContext } from "./contexts/Machine";
import PlayerForm from "./screens/PlayerForm";
import ChooseQuiz from "./screens/ChooseQuiz";
import QuizFound from "./screens/QuizFound";
export default function App() {
  const state = useContext(MachineContext);
  //const send = useContext(MachineDispatchContext);
  //const active = state.matches("active");
  //const { count } = state.context;

  return (
    <div className="App">
      {state.value === "idle" && <PlayerForm />}
      {state.value === "chooseQuiz" && <ChooseQuiz />}
      {state.value === "quizFound" && <QuizFound />}
      <Debugger />
    </div>
  );
}

function Debugger() {
  const state = useContext(MachineContext);
  const send = useContext(MachineDispatchContext);
  return (
    <details>
      <summary>Debugger</summary>
      <div>
        <pre>State: {JSON.stringify(state, null, 2)}</pre>
      </div>
      <button onClick={() => send("NEXT")}>NEXT</button>
    </details>
  );
}
