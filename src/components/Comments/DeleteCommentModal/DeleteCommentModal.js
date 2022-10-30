import { useState } from 'react';
import './DeleteCommentModal.scss';
import { Modal } from '../../index';

function DeleteCommentModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      modalId="delete-comment-modal"
      isModalOpen={isModalOpen}
      closeModal={closeModalHandler}
    >
      <div>DeleteCommentModal</div>
    </Modal>
  );
}

export default DeleteCommentModal;
