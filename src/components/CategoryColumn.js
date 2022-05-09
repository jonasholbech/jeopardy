import Question from "./Question";
export default function CategoryColumn({ category, questions }) {
  return (
    <div className="CategoryColumn">
      <h2>{category}</h2>
      {questions.map((question) => (
        <Question key={question.id} {...question}></Question>
      ))}
    </div>
  );
}
