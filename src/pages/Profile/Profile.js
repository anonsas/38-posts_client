import { useContext } from 'react';
import './Profile.scss';
import { AuthContext } from '../../contexts/AuthContext';

import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setAuthUser('');
    navigate('/login');
  };

  return (
    <>
      <h2>Welcome - {authUser?.username}</h2>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default Profile;
