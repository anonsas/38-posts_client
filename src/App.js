import { useState, useEffect } from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/posts').then((response) => {
      setAllPosts(response.data);
    });
  }, []);

  console.log(allPosts);

  return (
    <div>
      <div className="post-container">
        {allPosts?.map((post) => (
          <div key={post.id} className="post">
            <p className="post__title">{post.title}</p>
            <p className="post__text">{post.postText}</p>
            <p className="post__user">{post.username}</p>
          </div>
        ))}
      </div>
      <Routes></Routes>
    </div>
  );
}

export default App;
