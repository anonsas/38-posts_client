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
    <main className="profile">
      <div className="profile__user-container">
        <h1 className="profile__user">Welcome - {auth.user?.username}</h1>
        <button onClick={handleLogout} className="profile__logout-btn">
          Logout
        </button>
      </div>
      <div className="profile__posts">
        <h3>Here are your recent posts:</h3>
      </div>
    </main>
  );
}

export default Profile;
