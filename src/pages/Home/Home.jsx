import css from "./Home.module.css";
import dataQuizzes from "data/quizzes.json";
import { Quizzes } from "components/Quizzes/Quizzes";

export const Home = () => {
  return (
    <div className={css.Container}>
      Home
      <ul>
        {dataQuizzes.map((item) => (
          <Quizzes
            key={item.id}
            image={item.image}
            name={item.name}
            amount={item.amount}
            quiz={item.quiz}
          />
        ))}
      </ul>
    </div>
  );
};
