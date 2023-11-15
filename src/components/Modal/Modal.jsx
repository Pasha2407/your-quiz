import { useState } from "react";
import css from "./Modal.module.css";

export const Modal = ({ name, amount, quiz, exit }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);

  const nextQuestion = () => {
    setActiveQuestion(activeQuestion + 1);
  };

  return (
    <div className={css.Container}>
      <main>
        <button onClick={exit}>exit</button>
        Тест {name}
        {quiz ? (
          <section>
            <i>
              Питання {activeQuestion + 1} з {amount}
            </i>
            <b>{quiz[activeQuestion].question}</b>
            <ul>
              {quiz[activeQuestion].answers.map((itme) => (
                <li key={itme.id}>{itme.text}</li>
              ))}
            </ul>
            <i>Правельна відповідь = {quiz[activeQuestion].rightAnswerId}</i>
          </section>
        ) : (
          <i>Тест не готовий</i>
        )}
        {quiz && activeQuestion < 1 && (
          <button onClick={nextQuestion}>next</button>
        )}
      </main>
    </div>
  );
};
