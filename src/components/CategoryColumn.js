import Question from "./Question";
export default function CategoryColumn({ category, questions, colID }) {
  return (
    <div className="CategoryColumn">
      <h2>{category}</h2>
      {questions.map((question, index) => (
        <Question
          key={index}
          {...question}
          index={index}
          colID={colID}
          qID={index}
        ></Question>
      ))}
    </div>
  );
}
