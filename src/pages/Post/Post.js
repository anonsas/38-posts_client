import React, { useEffect, useState } from 'react';
import './Post.scss';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/Card/Card';
import CommentDelete from './CommentDelete';
import Comments from '../../components/Comments/Comments';

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
  const [deletePost, setDeletePost] = useState(null);
  const [deletePostModalData, setDeletePostModalData] = useState(null);

  // GET A Post, with ALL Comments.
  useEffect(() => {
    axios
      .get(`http://localhost:4000/posts/${id}`)
      .then((response) => setPost(response.data))
      .catch((error) => alert(error));

    axios
      .get(`http://localhost:4000/comments/${id}`)
      .then((response) => setCommentList(response.data))
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
  const submitCommentForm = (e) => {
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
        if (response.data.error) console.log(response.data.error);
        else {
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

  useEffect(() => {
    if (!deletePost) return;

    axios
      .delete(`http://localhost:4000/posts/${deletePost.id}`, {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then((response) => navigate('/'))
      .catch((error) => alert(error));
  });

  return (
    <main className="post-page">
      <Card
        key={post?.id}
        postId={post?.id}
        title={post?.title}
        text={post?.postText}
        userId={post?.UserId}
        username={post?.username}
        // likesCount={post?.Likes.length}
        authUser={auth.user?.username === post?.username}
      />

      <Comments
        commentList={commentList}
        comment={comment}
        setComment={setComment}
        submitCommentForm={submitCommentForm}
      />

      <CommentDelete
        setDeleteComment={setDeleteComment}
        deleteCommentModalData={deleteCommentModalData}
        setDeleteCommentModalData={setDeleteCommentModalData}
      />
    </main>
  );
}

export default Post;
