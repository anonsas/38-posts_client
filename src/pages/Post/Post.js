import React, { useEffect, useState } from 'react';
import './Post.scss';

import { useParams } from 'react-router-dom';
import axios from 'axios';

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [newComment, setNewComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/posts/${id}`).then((response) => {
      setPost(response.data);
    });
    axios.get(`http://localhost:4000/comments/${id}`).then((response) => {
      setCommentsList(response.data);
    });
  }, [id]);

  const submitForm = (e) => {
    e.preventDefault();
    if (!newComment) return;

    const commentToAdd = {
      commentText: newComment,
      PostId: id,
    };

    axios
      .post(`http://localhost:4000/comments`, commentToAdd)
      .then((response) => {
        setCommentsList((prevState) => [...prevState, commentToAdd]);
        setNewComment('');
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="post-page">
      <div className="post">
        <p className="post__title">{post?.title}</p>
        <p className="post__text">{post?.postText}</p>
        <p className="post__user">{post?.username}</p>
      </div>
      <div className="comment-container">
        <form className="comment-form" onSubmit={submitForm}>
          <label htmlFor="commentText">What do you think?</label>
          <input
            type="text"
            name="commentText"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Message"
            autoComplete="off"
          />
          <button type="submit">Submit</button>
        </form>

        <div className="comments-list">
          {commentsList?.map((comment, i) => (
            <p className="comment" key={i}>
              {comment.commentText}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Post;
