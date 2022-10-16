import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/User';

function Profile() {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
    navigate('/');
  };

  return (
    <>
      <h2>Welcome {auth.username}</h2>
      <button onClick={handleLogout}></button>
    </>
  );
}

export default Profile;
