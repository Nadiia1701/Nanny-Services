import MakeAnAppointmentForm from '../MakeAnAppointmentForm/MakeAnAppointmentForm';
import { useState } from 'react';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import css from './MakeAnAppointmentBtn.module.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(251, 251, 251, 1)',
    border: 'none',
    borderRadius: '30px',
    maxWidth: '90%',
    maxHeight: '90%',
    overflow: 'auto',
  },
  overlay: {
    backgroundColor: 'rgba(11, 11, 11, 0.6)',
  },
};

Modal.setAppElement('#root');

const MakeAnAppointmentBtn = ({ nannyName, avatarUrl }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className={css.container}>
      <button className={css.makeAnAppointmentBtn} onClick={openModal}>
        Make an appointment
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <MakeAnAppointmentForm nannyName={nannyName} avatarUrl={avatarUrl} />
        <button onClick={closeModal} className={css.closeBtn}>
          <AiOutlineClose />
        </button>
      </Modal>
    </div>
  );
};

export default MakeAnAppointmentBtn;
