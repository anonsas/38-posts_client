import React, { useState, useContext } from 'react';
import './Login.scss';
import { AuthContext } from '../../contexts/AuthContext';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const { setAuthUser } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitFormHandler = (e) => {
    e.preventDefault();
    if (!username || !password) return alert('Please fill the form!');

    const loginUser = { username, password };

    axios
      .post('http://localhost:4000/auth/login', loginUser)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem('accessToken', response.data.accessToken);
          setAuthUser({
            id: response.data.id,
            username: response.data.username,
            status: true,
          });
          navigate('/', { replace: true });
          setUsername('');
          setPassword('');
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="post-form">
      <h2>Sign-in</h2>
      <form onSubmit={submitFormHandler} className="form">
        <div className="form__input">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="form__input">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
