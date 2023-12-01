import { useState, useEffect } from "react";
import css from "./Result.module.css";

export const Result = () => {
  const [results, setResults] = useState(
    () => JSON.parse(localStorage.getItem("results")) ?? []
  );
  const [onPrevResults, setOnPrevResults] = useState(false);

  const deleteResult = (id) => {
    setResults(results.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const changedResults = JSON.stringify(results);
    localStorage.setItem("results", changedResults);
  }, [results]);

  const result = results[results.length - 1];

  return (
    <ul className={css.Container}>
      {results.length > 0 ? (
        <>
          <h2>Результат</h2>
          <li className={css.ActiveItem} style={{ border: result.color }}>
            <section>
              <p>Дата проходження</p>
              <b> {result.date}</b>
            </section>
            <section>
              <p>Назва вікторини</p>
              <b> {result.name}</b>
            </section>
            <section>
              <p>Рівень складності</p>
              <b> {result.levelName}</b>
            </section>
            <section>
              <p>Кількість питань</p>
              <b> {result.amount}</b>
            </section>
            <section>
              <p>Тривалість проходження</p>
              <b>{result.time} сек</b>
            </section>
            <section>
              <p>Середній час на запитання</p>
              <b>{result.avgTime} сек</b>
            </section>
            <section>
              <p>Макс підряд правильно</p>
              <b>{result.suborder}</b>
            </section>
            <section>
              <p>Результат</p>
              <b>
                Правильно {result.result} з {result.amount}
              </b>
            </section>
            <section>
              <p>Бали</p>
              <b>{result.points}</b>
            </section>
          </li>
        </>
      ) : (
        <i>Результатів поки що не має</i>
      )}
      {results.length > 1 && (
        <div>
          <h2>Попередні результати</h2>
          {!onPrevResults ? (
            <button onClick={() => setOnPrevResults(true)}>Показати</button>
          ) : (
            <button onClick={() => setOnPrevResults(false)}>Приховати</button>
          )}
        </div>
      )}
      {onPrevResults &&
        results
          .toReversed()
          .slice(1, results.length)
          .map((item) => (
            <li
              className={css.Item}
              key={item.id}
              style={{ border: item.color }}
            >
              <section>
                <p>Дата проходження</p>
                <b> {item.date}</b>
              </section>
              <section>
                <p>Назва вікторини</p>
                <b> {item.name}</b>
              </section>
              <section>
                <p>Рівень складності</p>
                <b> {item.levelName}</b>
              </section>
              <section>
                <p>Кількість питань</p>
                <b> {item.amount}</b>
              </section>
              <section>
                <p>Тривалість проходження</p>
                <b>{item.time} сек</b>
              </section>
              <section>
                <p>Середній час на запитання</p>
                <b>{item.avgTime} сек</b>
              </section>
              <section>
                <p>Макс підряд правильно</p>
                <b>{item.suborder}</b>
              </section>
              <section>
                <p>Результат</p>
                <b>
                  Правильно {item.result} з {item.amount}
                </b>
              </section>
              <section>
                <p>Бали</p>
                <b>{item.points}</b>
              </section>
              <div>
                <button type="button" onClick={() => deleteResult(item.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
    </ul>
  );
};
