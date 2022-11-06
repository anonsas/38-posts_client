import './ModalDelete.scss';
import { Modal } from '../index';

function ModalDelete({
  modalId,
  isDeleteModalOpen,
  closeModalHandler,
  deleteItemHandler,
}) {
  return (
    <Modal
      modalId={modalId}
      isModalOpen={isDeleteModalOpen}
      closeModal={closeModalHandler}
    >
      <main className="delete-modal">
        <h3 className="delete-modal__heading">Are you sure you want to delete this?</h3>
        <div className="delete-modal__actions">
          <button type="button" onClick={deleteItemHandler}>
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

export default ModalDelete;
