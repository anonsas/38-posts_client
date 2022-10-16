import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
// import { useAuth } from '../../contexts/AuthContext';

function Profile() {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);
  // const auth = useAuth();

  const handleLogout = () => {
    // 1. Clear the Token from localStorage
    localStorage.removeItem('accessToken');

    // 2. Change AuthState to false
    setAuthState({
      id: 0,
      username: '',
      status: false,
    });

    // 3. Navigate user to Homepage
    navigate('/');

    // auth.logout();
  };

  return (
    <>
      <h2>Welcome - {authState?.username}</h2>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default Profile;
