import css from "./ResultItem.module.css";

export const ActiveResultItem = ({ result }) => {
  return (
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
          {result.result} з {result.amount}
        </b>
      </section>
      <section>
        <p>Бали</p>
        <b>{result.points}</b>
      </section>
    </li>
  );
};
