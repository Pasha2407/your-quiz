import css from "./Quizzes.module.css";
import { Modal } from "components/Modal/Modal";
import { useState } from "react";

export const Quizzes = ({ image, name, amount, quiz }) => {
  const [isModal, setIsModal] = useState(false);

  const openModal = () => {
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <div className={css.Container}>
      <b>{image}</b>
      <p>{name}</p>
      <p>Кількість питань {amount}</p>
      <button onClick={openModal}>Play</button>
      {isModal && (
        <Modal name={name} amount={amount} quiz={quiz} exit={closeModal} />
      )}
    </div>
  );
};
