import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import css from "./Quiz.module.css";

export const Quiz = ({ name, quizEasy, quizMiddle, quizHard }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [message, setMessage] = useState("");
  const [finishQuiz, setFinishQuiz] = useState(false);
  const [result, setResult] = useState(0);
  const [resultColor, setResultColor] = useState("");
  const [colorAnswer, setColorAnswer] = useState("");
  const [active, setActive] = useState("");
  const [quizLevel, setQuizLevel] = useState([]);
  const [startQuiz, setStartQuiz] = useState(false);
  const [levelName, setLevelName] = useState("");
  const [startTime, setStartTime] = useState(0);

  const startEasy = () => {
    setQuizLevel(quizEasy);
    setStartQuiz(true);
    setResultColor("5px solid #72e300");
    setLevelName("Глядач");
    setStartTime(new Date().getMinutes() * 60 + new Date().getSeconds());
  };

  const startMiddle = () => {
    setQuizLevel(quizMiddle);
    setStartQuiz(true);
    setResultColor("5px solid #fcaa1c");
    setLevelName("Знавець");
    setStartTime(new Date().getMinutes() * 60 + new Date().getSeconds());
  };

  const startHard = () => {
    setQuizLevel(quizHard);
    setStartQuiz(true);
    setResultColor("5px solid #990e0e");
    setLevelName("Експерт");
    setStartTime(new Date().getMinutes() * 60 + new Date().getSeconds());
  };

  const [resultData, setResultData] = useState(
    () => JSON.parse(localStorage.getItem("results")) ?? []
  );

  const rightAnswerId = startQuiz && quizLevel[activeQuestion].rightAnswerId;

  useEffect(() => {
    const collectedResult = JSON.stringify(resultData);
    localStorage.setItem("results", collectedResult);
  }, [resultData]);

  const nextQuestion = () => {
    setActiveQuestion(activeQuestion + 1);
    setMessage("");
  };

  const clickAnswer = (id) => {
    setActive(id);
    if (id === rightAnswerId) {
      setColorAnswer("#52ff5d");
      setMessage("Чудово 😎");
      setResult(result + 1);
    } else {
      setMessage("Упс... 😔");
      setColorAnswer("#ff7a7f");
    }
  };

  let stopTime;
  if (activeQuestion >= quizLevel.length - 1) {
    stopTime = new Date().getMinutes() * 60 + new Date().getSeconds();
  }

  let time;
  if (stopTime <= startTime) time = stopTime + 3600 - startTime;
  else time = stopTime - startTime;

  const avgTime = Math.round(time / quizLevel.length);
  const countFalse = quizLevel.length - result;

  let fall = 0;
  if (countFalse > 0 && countFalse < 4) fall = 5;
  else if (countFalse >= 4 && countFalse < 6) fall = 10;
  else if (countFalse >= 6 && countFalse < 10) fall = 15;

  let timeFall = avgTime - 7;
  if (timeFall > 15) timeFall = 15;
  else if (timeFall <= 0) timeFall = 0;

  const points = 100 - countFalse * fall - timeFall;

  let CurrentMinutes;
  if (new Date().getMinutes() < 10) {
    CurrentMinutes = `0${new Date().getMinutes()})`;
  } else CurrentMinutes = `${new Date().getMinutes()})`;

  const currentMonth = new Date().getMonth() + 1;

  const currentDate = [
    `${new Date().getDate()} `,
    `${currentMonth} `,
    `${new Date().getFullYear()} `,
    `(${new Date().getHours()}:`,
    CurrentMinutes,
  ];

  const newResultData = {
    color: resultColor,
    date: currentDate,
    name: name,
    levelName: levelName,
    amount: quizLevel.length,
    time: time,
    avgTime: avgTime,
    result: result,
    points: points,
  };

  const clickFinish = () => {
    setFinishQuiz(true);
    const finalResultData = {
      id: nanoid(),
      ...newResultData,
    };
    setResultData([...resultData, finalResultData]);
  };

  return (
    <section className={css.Container}>
      {!startQuiz && (
        <>
          <div>
            <span>Виберіть рівень складності</span>
          </div>
          <div>
            <button className={css.EasyButton} onClick={startEasy}>
              Глядач
            </button>
            <button className={css.MiddleButton} onClick={startMiddle}>
              Знавець
            </button>
            <button className={css.HardButton} onClick={startHard}>
              Експерт
            </button>
          </div>
        </>
      )}
      {!finishQuiz && startQuiz && (
        <>
          <i>
            Питання {activeQuestion + 1} з {quizLevel.length}
          </i>
          <b>{quizLevel[activeQuestion].question}</b>
          <ul className={css.List}>
            {quizLevel[activeQuestion].answers.map((item) => (
              <li
                key={item.id}
                style={{
                  "--hover-cursor": !message && "pointer",
                  backgroundColor: message && active === item.id && colorAnswer,
                }}
                className={!message ? css.HoverItem : ""}
                onClick={() => !message && clickAnswer(item.id)}
              >
                {item.text}
              </li>
            ))}
          </ul>
          {message}
        </>
      )}

      {quizLevel && message && activeQuestion < quizLevel.length - 1 && (
        <div className={css.Next}>
          <button onClick={nextQuestion}>NEXT</button>
        </div>
      )}

      {!finishQuiz && message && activeQuestion >= quizLevel.length - 1 && (
        <div className={css.Finish}>
          <button onClick={clickFinish}>FINISH</button>
        </div>
      )}

      {finishQuiz && (
        <div>
          <span>
            Вітаю🥳 ти пройшов вікторину по фільму {name}, настав час побачити
            свій результат
          </span>
          <div className={css.Link}>
            <Link to="result">Перейти до результатів</Link>
          </div>
        </div>
      )}
    </section>
  );
};
