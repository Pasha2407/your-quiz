import css from "./Home.module.css";
import dataQuizzes from "data/quizzes.json";
import { Quizzes } from "components/Quizzes/Quizzes";

export const Home = () => {
  return (
    <div className={css.Container}>
      <h2>Вікторини</h2>
      <ul>
        {dataQuizzes.map((item) => (
          <Quizzes
            key={item.id}
            image={item.image}
            name={item.name}
            amount={item.amount}
            amountLevel={item.amountLevel}
            quizEasy={item.quizEasy}
            quizMiddle={item.quizMiddle}
            quizHard={item.quizHard}
            background={item.background}
          />
        ))}
      </ul>
    </div>
  );
};
