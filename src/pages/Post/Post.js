import React, { useEffect, useState } from 'react';
import './Post.scss';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/Card/Card';
import CommentDelete from './CommentDelete';

import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Post() {
  const { id } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState({});
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [deleteComment, setDeleteComment] = useState(null);
  const [deleteCommentModalData, setDeleteCommentModalData] = useState(null);

  // GET A Post, with ALL Comments.
  useEffect(() => {
    axios
      .get(`http://localhost:4000/posts/${id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => alert(error));
    axios
      .get(`http://localhost:4000/comments/${id}`)
      .then((response) => {
        setCommentList(response.data);
      })
      .catch((error) => alert(error));
  }, [id]);

  // DELETE A Comment.
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

  const deletePostHandler = (postId) => {
    axios
      .delete(`http://localhost:4000/posts/${postId}`, {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(comment);

  return (
    <div className="post-page">
      {/* <Card
        postId={post?.id}
        title={post?.title}
        text={post?.postText}
        userId={post?.UserId}
        username={post?.username}
        likesCount={post?.Likes.length}
      /> */}
      <div className="post">
        <p className="post__title">{post?.title}</p>
        <p className="post__text">{post?.postText}</p>
        <p className="post__user">{post?.username}</p>
        {auth.user?.username === post?.username && (
          <button className="post__delete-btn" onClick={() => deletePostHandler(post.id)}>
            X
          </button>
        )}
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
              {auth.user?.username === comment.username && (
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
