import React, { useEffect, useState, useContext } from 'react';
import './Post.scss';
import { AuthContext } from '../../contexts/AuthContext';
import CommentDelete from './CommentDelete';

import { useParams } from 'react-router-dom';
import axios from 'axios';

function Post() {
  const { id } = useParams();
  const { authState } = useContext(AuthContext);

  const [post, setPost] = useState({});
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [deleteComment, setDeleteComment] = useState(null);
  const [deleteCommentModalData, setDeleteCommentModalData] = useState(null);

  // GET A Post, with ALL Comments.
  useEffect(() => {
    axios.get(`http://localhost:4000/posts/${id}`).then((response) => {
      setPost(response.data);
    });
    axios.get(`http://localhost:4000/comments/${id}`).then((response) => {
      setCommentList(response.data);
    });
  }, [id]);

  // DELETE A Comment, with Modal.
  useEffect(() => {
    if (!deleteComment) return;
    axios
      .delete(`http://localhost:4000/comments/${deleteComment.id}`, {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        setCommentList((prevState) =>
          [...prevState].filter((comment) => comment.id !== deleteComment.id)
        );
      });
  }, [deleteComment]);

  // FORM SUBMIT.
  const submitForm = (e) => {
    e.preventDefault();
    if (!comment) return;

    const commentToAdd = {
      comment: comment,
      PostId: id,
    };

    axios
      .post(`http://localhost:4000/comments`, commentToAdd, {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const commentToAdd = {
            comment,
            username: response.data.username,
          };
          setCommentList((prevState) => [...prevState, commentToAdd]);
          setComment('');
        }
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
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Message"
            autoComplete="off"
          />
          <button type="submit">Submit</button>
        </form>

        <div className="comment-list">
          {commentList?.map((comment, i) => (
            <div className="comment" key={i}>
              <p className="comment__content">{comment.comment}</p>
              <p className="comment__author">{comment.username}</p>
              {authState.username === comment.username && (
                <button onClick={() => setDeleteCommentModalData(comment)}>X</button>
              )}
            </div>
          ))}
        </div>
      </div>
      <CommentDelete
        setDeleteComment={setDeleteComment}
        deleteCommentModalData={deleteCommentModalData}
        setDeleteCommentModalData={setDeleteCommentModalData}
      />
    </div>
  );
}

export default Post;
