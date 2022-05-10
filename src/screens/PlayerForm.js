import { useContext, useRef } from "react";
import { MachineContext, MachineDispatchContext } from "../contexts/Machine";
export default function PlayerForm() {
  const state = useContext(MachineContext);
  const send = useContext(MachineDispatchContext);
  const formEl = useRef(null);
  function addPlayer(e) {
    e.preventDefault();
    formEl.current.reset();
    send(e);
  }
  return (
    <div className="PlayerForm boxed">
      <h1>Who's playing?</h1>
      <form onSubmit={addPlayer} ref={formEl}>
        <label htmlFor="form_name">Name</label>
        <input
          type="text"
          name="name"
          id="form_name"
          onChange={(e) => {
            send(e);
          }}
        />
        <button>Add player</button>
      </form>
      <ol>
        {state.context.players.map((player) => (
          <li key={player}>{player}</li>
        ))}
      </ol>
      <button
        disabled={state.context.players.length < 2}
        onClick={() =>
          send({ type: "PLAYERS_CHOSEN", players: state.context.players })
        }
      >
        Save Players
      </button>
    </div>
  );
}
