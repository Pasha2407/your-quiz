import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import css from "./Quiz.module.css";

export const Quiz = ({ name, quiz, amount }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [message, setMessage] = useState("");
  const [finishQuiz, setFinishQuiz] = useState(false);
  const [result, setResult] = useState(0);
  const [colorAnswer, setColorAnswer] = useState("");
  const [active, setActive] = useState("");
  console.log(active);

  const [resultData, setResultData] = useState(
    () => JSON.parse(localStorage.getItem("results")) ?? []
  );

  const rightAnswerId = quiz[activeQuestion].rightAnswerId;

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
    name: name,
    date: currentDate,
    result: result,
    amount: amount,
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
      {!finishQuiz && (
        <>
          <i>
            Питання {activeQuestion + 1} з {amount}
          </i>
          <b>{quiz[activeQuestion].question}</b>
          <ul className={css.List}>
            {quiz[activeQuestion].answers.map((item) => (
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

      {quiz && message && activeQuestion < amount - 1 && (
        <div className={css.Next}>
          <button onClick={nextQuestion}>NEXT</button>
        </div>
      )}

      {!finishQuiz && message && activeQuestion >= amount - 1 && (
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
