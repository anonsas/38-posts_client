import React from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">Home Page</Link>
      <Link to="/postform">Create A Post</Link>
    </div>
  );
}

export default Navbar;
