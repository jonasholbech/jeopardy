import { useContext } from "react";
import { MachineDispatchContext } from "../contexts/Machine";
export default function Quiz404() {
  const send = useContext(MachineDispatchContext);
  return (
    <div id="Quiz404">
      <h2>Quiz not found</h2>
      <button onClick={() => send("NEXT")}>Search again</button>
    </div>
  );
}
