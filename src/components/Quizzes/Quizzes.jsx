import css from "./Quizzes.module.css";
import { Modal } from "components/Modal/Modal";
import { useState } from "react";

export const Quizzes = ({
  image,
  name,
  amount,
  amountLevel,
  quizEasy,
  quizMiddle,
  quizHard,
  background,
}) => {
  const [isModal, setIsModal] = useState(false);

  const openModal = () => {
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <div className={css.Container}>
      <section className={css.Description}>
        <h4>{name}</h4>
        <p>Кількість всіх питань: {amount}</p>
        <p>Вірнів складності: {amountLevel}</p>
        <div>
          <button onClick={openModal}>PLAY</button>
        </div>
      </section>

      <img src={require(`data/images/${image}`)} alt=""></img>

      {isModal && (
        <Modal
          background={background}
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
