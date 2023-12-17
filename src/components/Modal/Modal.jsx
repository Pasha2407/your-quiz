import { useEffect, useRef } from "react";
import css from "./Modal.module.css";
import { Quiz } from "components/Quiz/Quiz";

export const Modal = ({
  image,
  audio,
  name,
  amount,
  quizEasy,
  quizMiddle,
  quizHard,
  closeModal,
}) => {
  const audioRef = useRef();
  useEffect(() => {
    audioRef.current.volume = 0.3;
  });

  return (
    <div className={css.Wrapper}>
      <div
        className={css.ContainerBackground}
        style={{
          backgroundImage: `url(${require(`data/images/${image}/background.PNG`)})`,
        }}
      >
        <div className={css.Container}>
          <div>
            <button onClick={closeModal}>Вийти</button>
          </div>
          <header>
            <span>Вікторина</span>
            <h3>{name}</h3>
            <audio
              ref={audioRef}
              style={{ opacity: 0.5 }}
              controls
              autoPlay
              loop
            >
              <source src={require(`data/audio/${audio}`)} />
            </audio>
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
