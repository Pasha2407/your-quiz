import css from "./Quizzes.module.css";
import { Modal } from "components/Modal/Modal";
import { useState } from "react";
import "index.css";

export const Quizzes = ({
  image,
  name,
  amount,
  amountLevel,
  quizEasy,
  quizMiddle,
  quizHard,
  audio,
}) => {
  const [isModal, setIsModal] = useState(false);

  const openModal = () => {
    setIsModal(true);
    document.body.classList.add("no-scroll");
  };

  const closeModal = () => {
    setIsModal(false);
    document.body.classList.remove("no-scroll");
  };

  return (
    <div
      className={css.Container}
      style={{
        backgroundImage: `url(${require(`data/images/${image}/title.PNG`)})`,
      }}
    >
      <section className={css.Description}>
        <h4>{name}</h4>
        <p>Кількість всіх питань: {amount}</p>
        <p>Рівнів складності: {amountLevel}</p>
        <div>
          <button onClick={openModal}>Почати</button>
        </div>
      </section>
      {isModal && (
        <Modal
          image={image}
          audio={audio}
          name={name}
          amount={amount}
          quizEasy={quizEasy}
          quizMiddle={quizMiddle}
          quizHard={quizHard}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};
