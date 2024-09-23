import LoginForm from '../LogInForm/LogInForm';
import { useState } from 'react';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import css from './LogInBtn.module.css';

const LogInBtn = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className={css.container}>
      <button onClick={openModal}>Log In</button>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <LoginForm />
        <button onClick={closeModal}>
          <AiOutlineClose />
        </button>
      </Modal>
    </div>
  );
};

export default LogInBtn;
