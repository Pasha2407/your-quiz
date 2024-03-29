import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import css from "./Quiz.module.css";
import "index.css";

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
  const [multiplier, setMultiplier] = useState(1);
  const [points, setPoints] = useState(0);

  const startEasy = () => {
    setQuizLevel(quizEasy);
    setStartQuiz(true);
    setResultColor("5px solid #5afa9a");
    setLevelName("Глядач");
    setStartTime(new Date().getMinutes() * 60 + new Date().getSeconds());
  };

  const startMiddle = () => {
    setQuizLevel(quizMiddle);
    setStartQuiz(true);
    setResultColor("5px solid #facf5a");
    setLevelName("Знавець");
    setStartTime(new Date().getMinutes() * 60 + new Date().getSeconds());
  };

  const startHard = () => {
    setQuizLevel(quizHard);
    setStartQuiz(true);
    setResultColor("5px solid #fa6b6b");
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
    setMessage("");
    setActiveQuestion(activeQuestion + 1);
  };

  const clickAnswer = (id) => {
    setActive(id);
    if (id === rightAnswerId) {
      setColorAnswer("#52ff5d");
      setMessage("Чудово 😎");
      setResult(result + 1);
      setMultiplier(multiplier + 0.25);
      setPoints(points + multiplier * 5000);
    } else {
      setMessage("Упс... 😔");
      setColorAnswer("#ff7a7f");
      setMultiplier(1);
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

  let timeBonus;
  if (avgTime <= 9) timeBonus = 1.1;
  else if (avgTime === 10) timeBonus = 1.08;
  else if (avgTime === 11) timeBonus = 1.06;
  else if (avgTime === 12) timeBonus = 1.04;
  else if (avgTime === 13) timeBonus = 1.02;
  else if (avgTime >= 14) timeBonus = 1;

  const finalPoints = Math.round((points / quizLevel.length) * timeBonus);

  let currentDay = new Date().getDate();
  if (currentDay < 10) currentDay = `0${currentDay}`;

  let currentMonth = new Date().getMonth() + 1;
  if (currentMonth < 10) currentMonth = `0${currentMonth}`;

  let currentYear = new Date().getFullYear();

  let currentHours = new Date().getHours();
  if (currentHours < 10) currentHours = `0${currentHours}`;

  let CurrentMinutes = new Date().getMinutes();
  if (CurrentMinutes < 10) CurrentMinutes = `0${CurrentMinutes}`;

  const currentDate = [
    currentDay,
    ` ${currentMonth} `,
    currentYear,
    ` (${currentHours}:`,
    `${CurrentMinutes})`,
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
    points: finalPoints,
  };

  const clickFinish = () => {
    setFinishQuiz(true);
    const finalResultData = {
      id: nanoid(),
      ...newResultData,
    };
    setResultData([...resultData, finalResultData]);
  };

  const onSelectLevel = !finishQuiz && startQuiz;
  const quiz = quizLevel[activeQuestion];
  const onListStyle = !message ? css.HoverItem : "";
  const onListImageStyle = !message ? css.HoverItemImage : "";
  const onNextButton =
    quizLevel && message && activeQuestion < quizLevel.length - 1;
  const onFinishButton =
    !finishQuiz && message && activeQuestion >= quizLevel.length - 1;

  return (
    <section className={css.Container}>
      {!startQuiz && (
        <div className={css.Level}>
          <span>Виберіть рівень складності</span>
          <div>
            <button
              className={css.EasyButton}
              onClick={startEasy}
              title={`Питань ${quizEasy.length}`}
            >
              Глядач
            </button>
            <button
              disabled={!quizMiddle}
              className={css.MiddleButton}
              onClick={startMiddle}
              title={`Питань ${quizMiddle.length}`}
            >
              Знавець
            </button>
            {quizHard && (
              <button
                className={css.HardButton}
                onClick={startHard}
                title={`Питань ${quizHard.length}`}
              >
                Експерт
              </button>
            )}
          </div>
        </div>
      )}

      {onSelectLevel && (
        <>
          <i>
            Питання {activeQuestion + 1} з {quizLevel.length}
          </i>
          <b>{quiz.question ? quiz.question : quiz.questionForImage}</b>
          {quiz.audio && (
            <audio style={{ opacity: 0.5 }} controls>
              <source src={require(`data/audio/${quiz.audio}`)} />
            </audio>
          )}
          {quiz.questionImage && (
            <div className={css.QuestionImage}>
              <img
                src={require(`data/images/${quiz.questionImage}`)}
                alt="Картинка не загрузилась"
              ></img>
            </div>
          )}
          <ul className={quiz.questionForImage ? css.ListImage : css.List}>
            {quiz.answers.map((item) => (
              <li
                key={item.id}
                style={{
                  border:
                    item.image &&
                    message &&
                    active === item.id &&
                    `solid 3px ${colorAnswer}`,
                  backgroundColor:
                    item.text && message && active === item.id && colorAnswer,
                }}
                className={item.text ? onListStyle : onListImageStyle}
                onClick={() => !message && clickAnswer(item.id)}
              >
                {item.text ? (
                  item.text
                ) : (
                  <img
                    src={require(`data/images/${item.image}`)}
                    alt="Картинка не загрузилась"
                  ></img>
                )}
              </li>
            ))}
          </ul>
          {message}
        </>
      )}

      {onNextButton && (
        <div className={css.Next}>
          <button onClick={nextQuestion}>Далі</button>
        </div>
      )}

      {onFinishButton && (
        <div className={css.Finish}>
          <button onClick={clickFinish}>Фініш</button>
        </div>
      )}

      {finishQuiz && (
        <div>
          <span>
            Вітаю🥳 вікторина по фільму {name} пройдена, настав час побачити
            свій результат
          </span>
          <div className={css.Link}>
            <Link
              to="result"
              onClick={() => document.body.classList.remove("no-scroll")}
            >
              Перейти до результатів
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};
