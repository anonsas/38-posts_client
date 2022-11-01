import './Navbar.scss';
import { useAuth } from '../../contexts/AuthContext';
import { images } from '../../constants';

import { NavLink } from 'react-router-dom';

function Navbar() {
  const auth = useAuth();

  return (
    <header className="header">
      {!auth.user.status ? (
        <nav className="header__nav-offline">
          <img src={images.logo} alt="logo" className="header__logo" />
          <NavLink to="/login">Login</NavLink>
        </nav>
      ) : (
        <nav className="header__nav-online">
          <NavLink to="/" className="header__logo-link">
            <img src={images.logo} alt="logo" className="header__logo" />
          </NavLink>
          <div className="header__links">
            {auth.user.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}
            <NavLink to="/postform">New Post</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
