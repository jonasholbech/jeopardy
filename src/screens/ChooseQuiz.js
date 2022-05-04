import { useState, useContext } from "react";
import { MachineContext, MachineDispatchContext } from "../contexts/Machine";
export default function ChooseQuiz() {
  const [filename, setFilename] = useState("");
  const send = useContext(MachineDispatchContext);
  function submit(e) {
    e.preventDefault();
    send({ type: "SEARCH", filename });
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
          onChange={(e) => setFilename(e.target.value)}
        />
        <button>Find quiz</button>
      </form>
    </div>
  );
}
