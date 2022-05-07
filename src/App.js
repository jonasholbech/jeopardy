import "./App.css";
import { useContext } from "react";
import { MachineContext, MachineDispatchContext } from "./contexts/Machine";
import PlayerForm from "./screens/PlayerForm";
import ChooseQuiz from "./screens/ChooseQuiz";
import QuizFound from "./screens/QuizFound";
import Quiz404 from "./screens/Quiz404";
import Game from "./screens/Game";
export default function App() {
  const state = useContext(MachineContext);
  //const send = useContext(MachineDispatchContext);
  //const active = state.matches("active");
  //const { count } = state.context;

  return (
    <div className="App">
      {state.matches("players") && <PlayerForm />}
      {state.matches("chooseQuiz") && <ChooseQuiz />}
      {state.matches("quiz404") && <Quiz404 />}
      {state.matches("quizFound") && <QuizFound />}
      {state.matches("game") && <Game />}
      <Debugger />
    </div>
  );
}

function Debugger() {
  const state = useContext(MachineContext);
  const send = useContext(MachineDispatchContext);
  console.log(state);

  return (
    <details>
      <summary>Debugger</summary>
      <div>
        {state.nextEvents.map((ne) => (
          <button key={ne} onClick={() => send(ne)}>
            {ne}
          </button>
        ))}
      </div>
      <div>
        <pre>State: {JSON.stringify(state.value, null, 2)}</pre>
      </div>
      <div>
        <pre>Context: {JSON.stringify(state.context, null, 2)}</pre>
      </div>
      <button onClick={() => send("NEXT")}>NEXT</button>
    </details>
  );
}
