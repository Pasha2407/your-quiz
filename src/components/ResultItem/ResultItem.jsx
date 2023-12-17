import css from "./ResultItem.module.css";

export const ResultItem = ({ item, deleteResult }) => {
  return (
    <li className={css.Item} style={{ border: item.color }}>
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
          {item.result} з {item.amount}
        </b>
      </section>
      <section>
        <p>Бали</p>
        <b>{item.points}</b>
      </section>
      <div>
        <button type="button" onClick={() => deleteResult(item.id)}>
          Видалити
        </button>
      </div>
    </li>
  );
};
