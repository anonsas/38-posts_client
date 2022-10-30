import React, { useState, useEffect } from 'react';
import './Login.scss';
import { useAuth } from '../../contexts/AuthContext';
import LoginPolicies from './LoginPolicies/LoginPolicies';
import Form from '../../components/Form/Form';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginData, setLoginData] = useState(null);

  useEffect(() => {
    if (!loginData) return;

    axios
      .post('http://localhost:4000/auth/login', loginData)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem('accessToken', response.data.accessToken);
          auth.login({
            id: response.data.id,
            username: response.data.username,
            role: response.data.role,
            status: true,
          });
          navigate('/', { replace: true });
          setUsername('');
          setPassword('');
        }
      })
      .catch((error) => alert(error.message));
  }, [auth, navigate, loginData]);

  const submitLoginHandler = (e) => {
    e.preventDefault();
    if (!username || !password) return alert('Please fill the form!');
    setLoginData({ username, password });
  };

  return (
    <main className="login">
      <h1 className="login__heading">Sign-in</h1>

      <Form
        submitFormHandler={submitLoginHandler}
        formType="login"
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        submitText="Sign In"
      />

      <LoginPolicies link="/register" />
    </main>
  );
}

export default Login;
