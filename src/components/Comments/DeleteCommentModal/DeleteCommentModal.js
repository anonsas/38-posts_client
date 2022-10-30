import './DeleteCommentModal.scss';
import { Modal } from '../../index';

function DeleteCommentModal({
  isDeleteModalOpen,
  closeModalHandler,
  deleteCommentHandler,
}) {
  return (
    <Modal
      modalId="delete-comment-modal"
      isModalOpen={isDeleteModalOpen}
      closeModal={closeModalHandler}
    >
      <h5 className="modal__heading">Are you sure you want to delete this?</h5>
      <div className="modal__actions">
        <button type="button" onClick={deleteCommentHandler}>
          I'm sure
        </button>
        <button type="button" onClick={closeModalHandler}>
          Cancel
        </button>
      </div>
    </Modal>
  );
}

export default DeleteCommentModal;
