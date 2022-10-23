import React from 'react';
import './LoginForm.scss';

function LoginForm({ username, setUsername, password, setPassword, submitFormHandler }) {
  return (
    <form onSubmit={submitFormHandler} className="login-form">
      <div className="login-form__input-container">
        <label htmlFor="login-username" className="login-form__label">
          Username
        </label>
        <input
          id="login-username"
          className="login-form__input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
        />
      </div>

      <div className="login-form__input-container">
        <label htmlFor="login-password" className="login-form__label">
          Password
        </label>
        <input
          id="login-password"
          className="login-form__input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        />
      </div>

      <button type="submit" className="login-form__submit-btn">
        Sign In
      </button>
    </form>
  );
}

export default LoginForm;
