import React, { useState } from 'react';
import './Login.scss';
import { useAuth } from '../../contexts/AuthContext';
import LoginPolicies from './LoginPolicies/LoginPolicies';
import { Form } from '../../components';
import { login } from '../../utils/login.utils';
import { useNavigate } from 'react-router-dom';

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitLoginHandler = async (e) => {
    e.preventDefault();
    if (!username || !password) return alert('Please fill the form!');

    const response = await login(username, password);
    localStorage.setItem('accessToken', response.accessToken);
    auth.login({
      id: response.id,
      username: response.username,
      role: response.role,
      status: true,
    });
    navigate('/', { replace: true });
    setUsername('');
    setPassword('');
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
