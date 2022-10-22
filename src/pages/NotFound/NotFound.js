import React from 'react';
import './NotFound.scss';
import { Link } from 'react-router-dom';
import NotFoundImage from '../../assets/notFound-image.png';

function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found__content">
        <h1>404</h1>
        <h2>PAGE NOT FOUND</h2>
        <div className="not-found__actions">
          <h3>Try this link:</h3>
          <Link to="/login">Login</Link>
        </div>
      </div>

      <div className="not-found__image-container">
        <img src={NotFoundImage} alt="ufo" />
      </div>
    </main>
  );
}

export default NotFound;
