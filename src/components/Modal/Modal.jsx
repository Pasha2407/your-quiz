import css from "./Modal.module.css";
import { Quiz } from "components/Quiz/Quiz";

export const Modal = ({
  background,
  name,
  amount,
  quizEasy,
  quizMiddle,
  quizHard,
  closeModal,
}) => {
  return (
    <div className={css.Wrapper}>
      <div
        className={css.ContainerBackground}
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <div className={css.Container}>
          <div>
            <button onClick={closeModal}>EXIT</button>
          </div>
          <header>
            <span>Вікторина по фільму</span>
            <h3>{name}</h3>
          </header>
          {quizEasy ? (
            <Quiz
              name={name}
              quizEasy={quizEasy}
              quizMiddle={quizMiddle}
              quizHard={quizHard}
              amount={amount}
            />
          ) : (
            <i>Тест не готовий</i>
          )}
        </div>
      </div>
    </div>
  );
};
