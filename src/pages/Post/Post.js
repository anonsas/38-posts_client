import React, { useEffect, useState } from 'react';
import './Post.scss';
import { useAuth } from '../../contexts/AuthContext';
import { Card, Comments, ModalDelete } from '../../components';

import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Post() {
  const auth = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletePost, setDeletePost] = useState(null);
  const [deletePostModalData, setDeletePostModalData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/posts/${id}`)
      .then((response) => setPost(response.data))
      .catch((error) => alert(error));
  }, [id]);

  useEffect(() => {
    if (!deletePost) return;

    axios
      .delete(`http://localhost:4000/posts/${deletePost}`, {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        navigate('/');
        setDeletePost(null);
      })
      .catch((error) => alert(error));
  }, [deletePost, navigate]);

  const openDeleteModalHandler = (postId) => {
    setIsDeleteModalOpen(true);
    setDeletePostModalData(postId);
  };

  const closeModalHandler = () => {
    setDeletePostModalData(null);
    setIsDeleteModalOpen(false);
  };

  const deletePostHandler = () => {
    setDeletePost(deletePostModalData);
    setIsDeleteModalOpen(false);
  };

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
        openDeleteModalHandler={openDeleteModalHandler}
      />

      <Comments postId={id} />

      <ModalDelete
        modalId="delete-post-modal"
        isDeleteModalOpen={isDeleteModalOpen}
        closeModalHandler={closeModalHandler}
        deleteItemHandler={deletePostHandler}
      />
    </main>
  );
}

export default Post;
