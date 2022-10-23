import { useContext } from 'react';
import './Navbar.scss';
import { AuthContext } from '../../contexts/AuthContext';

import { Link } from 'react-router-dom';

function Navbar() {
  const { authUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      {!authUser.status ? (
        <div className="navbar__auth">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      ) : (
        <>
          <div className="navbar__pages">
            <Link to="/">Home</Link>
            <Link to="/postform">New Post</Link>
            <Link to="/user/1">User</Link>
          </div>
          <div className="navbar__auth">
            <Link to="/profile">Profile</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
