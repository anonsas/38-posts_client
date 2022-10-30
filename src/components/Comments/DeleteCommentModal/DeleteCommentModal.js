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
      <main className="delete-modal">
        <h3 className="delete-modal__heading">Are you sure you want to delete this?</h3>
        <div className="delete-modal__actions">
          <button type="button" onClick={deleteCommentHandler}>
            I'm sure
          </button>
          <button type="button" onClick={closeModalHandler}>
            Cancel
          </button>
        </div>
      </main>
    </Modal>
  );
}

export default DeleteCommentModal;
