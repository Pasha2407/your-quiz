import { useState, useEffect } from "react";
import css from "./Result.module.css";

export const Result = () => {
  const [results, setResults] = useState(
    () => JSON.parse(localStorage.getItem("results")) ?? []
  );

  const deleteResult = (id) => {
    setResults(results.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const changedResults = JSON.stringify(results);
    localStorage.setItem("results", changedResults);
  }, [results]);

  return (
    <ul className={css.Container}>
      <h2>Результат</h2>
      {results.length > 0 ? (
        <li className={css.ActiveItem}>
          <span>
            Дата<b> {results[results.length - 1].date}</b>
          </span>
          <span>
            Назва вікторини:
            <b> {results[results.length - 1].name}</b>
          </span>
          <span>
            Результат: правельно<b> {results[results.length - 1].result}</b> з{" "}
            <b>{results[results.length - 1].amount}</b>
          </span>
        </li>
      ) : (
        <i>Результатів поки що не має</i>
      )}
      {results.length > 1 && <h2>Попередні результати</h2>}
      {results
        .toReversed()
        .slice(1, results.length)
        .map((item) => (
          <li className={css.Item} key={item.id}>
            <span>
              Дата<b> {item.date}</b>
            </span>
            <span>
              Назва вікторини:
              <b> {item.name}</b>
            </span>
            <span>
              Результат: правельно<b> {item.result}</b> з <b>{item.amount}</b>
            </span>
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
