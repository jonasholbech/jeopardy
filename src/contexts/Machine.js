import { createContext } from "react";
import { useMachine } from "@xstate/react";
import { jeopardyMachine } from "../machines/main";
export const MachineContext = createContext(null);
export const MachineDispatchContext = createContext(null);

export default function Machine({ children }) {
  const [state, send] = useMachine(jeopardyMachine);
  //const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  // ...
  return (
    <MachineContext.Provider value={state}>
      <MachineDispatchContext.Provider value={send}>
        {children}
      </MachineDispatchContext.Provider>
    </MachineContext.Provider>
  );
}
