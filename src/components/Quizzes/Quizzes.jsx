import css from "./Quizzes.module.css";
import { Modal } from "components/Modal/Modal";
import { useState } from "react";

export const Quizzes = ({ image, name, amount, quiz, background }) => {
  const [isModal, setIsModal] = useState(false);

  const openModal = () => {
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <div className={css.Container}>
      <div>
        <img src={require(`data/images/${image}`)} alt=""></img>
      </div>
      <section className={css.Description}>
        <h4>{name}</h4>
        <p>Кількість питань {amount}</p>
        <div>
          <button onClick={openModal}>PLAY</button>
        </div>
      </section>
      {isModal && (
        <Modal
          background={background}
          name={name}
          amount={amount}
          quiz={quiz}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};
