import React, { useEffect, useState } from 'react';
import './Post.scss';
import { useAuth } from '../../contexts/AuthContext';
import { Card, Comments } from '../../components';

import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Post() {
  const auth = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/posts/${id}`)
      .then((response) => setPost(response.data))
      .catch((error) => alert(error));
  }, [id]);

  // useEffect(() => {
  //   if (!deletePost) return;

  //   axios
  //     .delete(`http://localhost:4000/posts/${deletePost.id}`, {
  //       headers: {
  //         accessToken: localStorage.getItem('accessToken'),
  //       },
  //     })
  //     .then((response) => navigate('/'))
  //     .catch((error) => alert(error));
  // });

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

      <Comments postId={id} />
    </main>
  );
}

export default Post;
