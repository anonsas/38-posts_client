import React, { useEffect, useState } from 'react';
import './Post.scss';

import { useParams } from 'react-router-dom';
import axios from 'axios';

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:4000/posts/${id}`).then((response) => {
      setPost(response.data);
    });
  }, [id]);

  return (
    <div className="post-page">
      <div className="post">
        <p className="post__title">{post?.title}</p>
        <p className="post__text">{post?.postText}</p>
        <p className="post__user">{post?.username}</p>
      </div>
      <div className="comments">
        <p>Comment</p>
      </div>
    </div>
  );
}

export default Post;
