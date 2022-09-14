import React, { useEffect, useState } from 'react';
import './Post.scss';

import { useParams } from 'react-router-dom';
import axios from 'axios';

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:4000/posts/${id}`).then((response) => {
      setPost(response.data);
    });
  }, [id]);

  console.log(id);
  console.log(post);
  return <div>Post</div>;
}

export default Post;
