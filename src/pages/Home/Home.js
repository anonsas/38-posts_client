import React, { useState, useEffect } from 'react';
import './Home.scss';

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const [allPosts, setAllPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/posts').then((response) => {
      setAllPosts(response.data);
    });
  }, []);

  return (
    <div className="post-container">
      {allPosts?.map((post) => (
        <div key={post.id} onClick={() => navigate(`/post/${post.id}`)} className="post">
          <p className="post__title">{post.title}</p>
          <p className="post__text">{post.postText}</p>
          <p className="post__user">{post.username}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
