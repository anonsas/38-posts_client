import React, { useState, useEffect } from 'react';
import './PostForm.scss';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PostForm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [invalidTitle, setInvalidTitle] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState(false);

  const [postData, setPostData] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) navigate('/login');
  }, [navigate]);

  useEffect(() => {
    if (!postData) return;

    axios
      .post('http://localhost:4000/posts', postData, {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        navigate('/');
        setTitle('');
        setMessage('');
        setInvalidTitle(false);
        setInvalidMessage(false);
      })
      .catch((error) => alert(error.message));
  }, [postData, navigate]);

  const submitFormHandler = (e) => {
    e.preventDefault();

    if (!title && !message) {
      setInvalidTitle(true);
      setInvalidMessage(true);
    } else if (!title) {
      setInvalidTitle(true);
      setInvalidMessage(false);
    } else if (!message) {
      setInvalidTitle(false);
      setInvalidMessage(true);
    } else {
      setPostData({
        title: title,
        postText: message,
      });
    }
  };

  return (
    <div className="post-form">
      <form onSubmit={submitFormHandler} className="form">
        <div className="form__input">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            autoComplete="off"
          />
          <span style={{ color: 'orangered' }}>
            {invalidTitle && 'Please enter title!'}
          </span>
        </div>

        <div className="form__input">
          <label htmlFor="postText">Message:</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            autoComplete="off"
          />
          <span style={{ color: 'orangered' }}>
            {invalidMessage && 'Please enter message!'}
          </span>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PostForm;
