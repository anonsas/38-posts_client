import './User.scss';
import ModalDelete from '../ModalDelete/ModalDelete';

function User({
  user,
  isDeleteModalOpen,
  openDeleteModalHandler,
  closeModalHandler,
  deleteUserHandler,
}) {
  return (
    <li className="user">
      <span className="user__id">User Id: {user.id}</span>
      <span className="user__username">Username: {user.username}</span>
      <span className="user__date">Created Account: {user.createdAt.slice(0, 10)}</span>
      <div className="user__actions">
        <button onClick={() => openDeleteModalHandler(user.id)}>Delete User</button>
      </div>

      <ModalDelete
        modalId="delete-user-modal"
        isDeleteModalOpen={isDeleteModalOpen}
        closeModalHandler={closeModalHandler}
        deleteItemHandler={deleteUserHandler}
      />
    </li>
  );
}

export default User;
