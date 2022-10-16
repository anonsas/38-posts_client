import React, { useContext } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
// import { useAuth } from '../../contexts/User';
import { AuthContext } from '../../contexts/AuthContext';

function Navbar() {
  const { authState } = useContext(AuthContext);
  // const auth = useAuth();

  return (
    <div className="navbar">
      <div className="navbar__pages">
        <Link to="/">Home</Link>
        <Link to="/postform">Create A Post</Link>
      </div>

      {!authState?.status ? (
        <div className="navbar__auth">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      ) : (
        <div className="navbar__auth">
          <Link to="/profile">Profile</Link>
        </div>
      )}

      {/* {!auth.user && <Link to="/login">Login</Link>}
      {auth.user && <Link to="/profile">Profile</Link>} */}
    </div>
  );
}

export default Navbar;
