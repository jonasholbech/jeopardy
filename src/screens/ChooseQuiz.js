import { useContext } from "react";
import { MachineDispatchContext } from "../contexts/Machine";
export default function ChooseQuiz() {
  const send = useContext(MachineDispatchContext);
  function submit(e) {
    e.preventDefault();
    send("SEARCH");
  }
  return (
    <div className="ChooseQuiz">
      <h1>Choose a Quiz</h1>
      <form onSubmit={submit}>
        <label htmlFor="form_filename">Quiz name</label>
        <input
          type="text"
          name="filename"
          id="form_filename"
          onChange={(e) => send(e)}
        />
        <button>Find quiz</button>
      </form>
    </div>
  );
}
