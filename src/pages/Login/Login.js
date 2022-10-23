import React, { useState } from 'react';
import './Login.scss';
import { useAuth } from '../../contexts/AuthContext';
import LoginForm from './LoginForm/LoginForm';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

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
          auth.login({
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
    <main className="login">
      <h1 className="login__heading">Sign-in</h1>

      <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        submitFormHandler={submitFormHandler}
      />
    </main>
  );
}

export default Login;
