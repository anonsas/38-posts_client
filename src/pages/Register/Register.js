import React, { useState, useEffect } from 'react';
import './Register.scss';
import Form from '../../components/Form/Form';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerData, setRegisterData] = useState(null);

  useEffect(() => {
    if (!registerData) return;

    axios
      .post('http://localhost:4000/auth', registerData)
      .then((response) => {
        navigate('/login', { replace: true });
        setUsername('');
        setPassword('');
      })
      .catch((error) => alert(error.message));
  }, [navigate, registerData]);

  const submitRegisterHandler = (e) => {
    e.preventDefault();
    if (!username || !password) return alert('Please fill the form!');
    setRegisterData({ username, password });
  };

  return (
    <main className="register">
      <h1 className="login__heading">Register</h1>

      <Form
        submitFormHandler={submitRegisterHandler}
        formType="register"
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        submitText="Register"
      />
    </main>
  );
}

export default Register;
