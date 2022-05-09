import { useContext } from "react";
import { MachineContext } from "../contexts/Machine";
import CategoryColumn from "../components/CategoryColumn";
import ScoreBoard from "../components/ScoreBoard";
export default function Game() {
  const state = useContext(MachineContext);

  return (
    <div className="Game">
      <h1>{state.context.quiz.title}</h1>
      <section id="gameBoard">
        {state.context.quiz.categories.map((category) => (
          <CategoryColumn key={category.category} {...category} />
        ))}
      </section>
      <ScoreBoard />
    </div>
  );
}
