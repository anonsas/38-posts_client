import React from 'react';
import './Register.scss';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  username: yup.string().min(3).max(25).required(),
  password: yup.string().min(4).max(20).required(),
});

function Register() {
  // const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const submitForm = (data) => {
    console.log(data);
    axios
      .post('http://localhost:4000/auth', data)
      .then((response) => {
        // navigate('/login');
        reset();
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="post-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(submitForm)} className="form">
        <div className="form__input">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            {...register('username')}
            placeholder="Username"
            autoComplete="off"
          />
          <p>{errors.username?.message}</p>
        </div>

        <div className="form__input">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            {...register('password')}
            placeholder="Password"
            autoComplete="off"
          />
          <p>{errors.password?.message}</p>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
