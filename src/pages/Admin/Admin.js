import { useState, useEffect } from 'react';
import './Admin.scss';
import User from '../../components/User/User';
import { useAuth } from '../../contexts/AuthContext';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [usersList, setUsersList] = useState(null);
  const [deleteUserData, setDeleteUserData] = useState(null);
  const [deleteUserModalData, setDeleteUserModalData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) navigate('/login');
    axios
      .get('http://localhost:4000/admin')
      .then((response) => {
        setUsersList(response.data);
      })
      .catch((error) => alert(error.message));
  }, [navigate, auth.user.role]);

  useEffect(() => {
    if (!deleteUserData) return;
    axios
      .delete(`http://localhost:4000/admin/${deleteUserData.id}`)
      .then((response) => {
        setDeleteUserData(null);
        setUsersList((prevState) =>
          [...prevState].filter((user) => user.id !== deleteUserData.id)
        );
      })
      .catch((error) => alert(error.message));
  }, [deleteUserData]);

  const openDeleteModalHandler = (user) => {
    setIsDeleteModalOpen(true);
    setDeleteUserModalData(user);
  };

  const closeModalHandler = () => {
    setDeleteUserModalData(null);
    setIsDeleteModalOpen(false);
  };

  const deleteUserHandler = () => {
    setDeleteUserData(deleteUserModalData);
    setIsDeleteModalOpen(false);
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
