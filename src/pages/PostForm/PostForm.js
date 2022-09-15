import React from 'react';
import './PostForm.scss';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  title: yup.string().required('Please enter title!'),
  postText: yup.string().required('Please enter message!'),
  username: yup.string().min(3).max(25).required(),
});

function PostForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const submitForm = (data) => {
    console.log(data);
    axios.post('http://localhost:4000/posts', data).then((response) => navigate('/'));
    reset();
  };

  return (
    <div className="post-form">
      <form onSubmit={handleSubmit(submitForm)} className="form">
        <div className="form__input">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            {...register('title')}
            placeholder="Title"
            autoComplete="off"
          />
          <p>{errors.title?.message}</p>
        </div>

        <div className="form__input">
          <label htmlFor="postText">Message:</label>
          <input
            type="text"
            {...register('postText')}
            placeholder="Message"
            autoComplete="off"
          />
          <p>{errors.postText?.message}</p>
        </div>

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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PostForm;
