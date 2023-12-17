import { useState, useEffect } from "react";
import css from "./Result.module.css";
import { ActiveResultItem } from "components/ResultItem/ActiveResultItem";
import { ResultItem } from "components/ResultItem/ResultItem";

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
    <div className={css.Container}>
      {results.length > 0 ? (
        <>
          <h2>Результат</h2>
          <ul>
            <ActiveResultItem key={result.id} result={result} />
          </ul>
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
      <ul>
        {onPrevResults &&
          results
            .toReversed()
            .slice(1, results.length)
            .map((item) => (
              <ResultItem
                item={item}
                key={item.id}
                deleteResult={deleteResult}
              />
            ))}
      </ul>
    </div>
  );
};
