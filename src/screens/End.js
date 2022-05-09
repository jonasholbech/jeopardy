import { useContext } from "react";
import { MachineContext, MachineDispatchContext } from "../contexts/Machine";
export default function End() {
  const state = useContext(MachineContext);
  const send = useContext(MachineDispatchContext);

  return (
    <div className="End">
      <pre>{JSON.stringify(state.context.players, null, 2)}</pre>
    </div>
  );
}
