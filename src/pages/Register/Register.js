import React, { useState } from 'react';
import './Register.scss';
import { Form } from '../../components';
import { register } from '../../utils/register.utils';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitRegisterHandler = async (e) => {
    e.preventDefault();
    if (!username || !password) return alert('Please fill the form!');

    await register(username, password);
    setUsername('');
    setPassword('');
    navigate('/login', { replace: true });
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
