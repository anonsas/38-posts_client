import React, { useState, useEffect } from 'react';
import './PostForm.scss';
import { createNewPost } from '../../utils/posts.utils';
import { useNavigate } from 'react-router-dom';

function PostForm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');
  const [invalidTitle, setInvalidTitle] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) navigate('/login');
  }, [navigate]);

  const submitFormHandler = async (e) => {
    e.preventDefault();

    if (!title && !postText) {
      setInvalidTitle(true);
      setInvalidMessage(true);
    } else if (!title) {
      setInvalidTitle(true);
      setInvalidMessage(false);
    } else if (!postText) {
      setInvalidTitle(false);
      setInvalidMessage(true);
    } else {
      await createNewPost({ title, postText });
      navigate('/');
      setTitle('');
      setPostText('');
      setInvalidTitle(false);
      setInvalidMessage(false);
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
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
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
