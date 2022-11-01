import React from 'react';
import './DeleteUserModal.scss';
import { Modal } from '../../index';

function DeleteUserModal({ isDeleteModalOpen, closeModalHandler, deleteUserHandler }) {
  return (
    <Modal
      modalId="delete-user-modal"
      isModalOpen={isDeleteModalOpen}
      closeModal={closeModalHandler}
    >
      <main className="delete-modal">
        <h3 className="delete-modal__heading">Delete User Permanently?</h3>
        <div className="delete-modal__actions">
          <button type="button" onClick={deleteUserHandler}>
            Yes
          </button>
          <button type="button" onClick={closeModalHandler}>
            Cancel
          </button>
        </div>
      </main>
    </Modal>
  );
}

export default DeleteUserModal;
