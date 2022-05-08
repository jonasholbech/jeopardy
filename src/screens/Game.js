import { useContext, useState, useRef } from "react";
import { MachineContext, MachineDispatchContext } from "../contexts/Machine";
import CategoryColumn from "../components/CategoryColumn";
import ScoreBoard from "../components/ScoreBoard";
export default function Game() {
  const state = useContext(MachineContext);
  const send = useContext(MachineDispatchContext);

  return (
    <div className="Game">
      <h1>{state.context.quiz.title}</h1>
      <section id="gameBoard">
        {state.context.quiz.categories.map((category, index) => (
          <CategoryColumn key={category.category} {...category} colID={index} />
        ))}
      </section>
      <ScoreBoard />
    </div>
  );
}
