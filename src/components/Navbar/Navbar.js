import React from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
// import { useAuth } from '../../contexts/User';

function Navbar() {
  // const auth = useAuth();

  return (
    <div className="navbar">
      <div className="navbar__pages">
        <Link to="/">Home Page</Link>
        <Link to="/postform">Create A Post</Link>
      </div>
      <div className="navbar__auth">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
      {/* {!auth.user && <Link to="/login">Login</Link>}
      {auth.user && <Link to="/profile">Profile</Link>} */}
    </div>
  );
}

export default Navbar;
