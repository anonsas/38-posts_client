import './Profile.scss';
import { useAuth } from '../../contexts/AuthContext';

import { useNavigate } from 'react-router-dom';

function Profile() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    auth.logout('');
    navigate('/login');
  };

  return (
    <>
      <h2>Welcome - {auth.user?.username}</h2>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default Profile;
