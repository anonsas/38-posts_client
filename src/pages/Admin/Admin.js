import { useState, useEffect } from 'react';
import './Admin.scss';
import User from '../../components/User/User';
import { useAuth } from '../../contexts/AuthContext';
import { getAllUsers, deleteUser } from '../../utils/admin.utils';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [usersList, setUsersList] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getAllUsers();
      setUsersList(response);
    })();
  }, [navigate]);

  const openDeleteModalHandler = (userId) => {
    setDeleteUserId(userId);
    setIsDeleteModalOpen(true);
  };

  const closeModalHandler = () => {
    setDeleteUserId(null);
    setIsDeleteModalOpen(false);
  };

  const deleteUserHandler = async () => {
    await deleteUser(deleteUserId);
    setDeleteUserId(null);
    setIsDeleteModalOpen(false);
    setUsersList((prevState) =>
      [...prevState].filter((user) => user.id !== deleteUserId)
    );
  };

  return (
    <main className="admin">
      <h2 className="admin__heading">Admin: {auth.user?.username}</h2>
      <ul className="admin__users-list">
        {usersList?.map((user) => (
          <User
            key={user.id}
            user={user}
            isDeleteModalOpen={isDeleteModalOpen}
            openDeleteModalHandler={openDeleteModalHandler}
            closeModalHandler={closeModalHandler}
            deleteUserHandler={deleteUserHandler}
          />
        ))}
      </ul>
    </main>
  );
}

export default Admin;
