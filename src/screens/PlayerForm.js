import { useContext, useState, useRef } from "react";
import { MachineContext, MachineDispatchContext } from "../contexts/Machine";
export default function PlayerForm() {
  const state = useContext(MachineContext);
  const send = useContext(MachineDispatchContext);
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const formEl = useRef(null);
  function addPlayer(e) {
    e.preventDefault();
    setPlayers((old) => old.concat(name));
    formEl.current.reset();
  }
  return (
    <div className="PlayerForm">
      <form onSubmit={addPlayer} ref={formEl}>
        <label htmlFor="form_name">Name</label>
        <input
          type="text"
          name="name"
          id="form_name"
          onChange={(e) => setName(e.target.value)}
        />
        <button>Add player</button>
      </form>
      <ol>
        {players.map((player) => (
          <li key={player}>{player}</li>
        ))}
      </ol>
      <button
        disabled={players.length < 2}
        onClick={() => send({ type: "PLAYERS_CHOSEN", players })}
      >
        Save Players
      </button>
    </div>
  );
}
