import React, { useState, useEffect } from 'react';
import './Home.scss';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';
import { HandThumbUpIcon as HandThumbUpIconActive } from '@heroicons/react/24/solid';

function Home() {
  const [postList, setPostList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/posts').then((response) => {
      setPostList(response.data);
    });
  }, []);

  const likeHandler = (postId) => {
    axios
      .post(
        `http://localhost:4000/likes`,
        { PostId: postId },
        {
          headers: { accessToken: localStorage.getItem('accessToken') },
        }
      )
      .then((response) => {
        setPostList((prevState) =>
          [...prevState].map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 1] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
      });
  };

  return (
    <div className="post-container">
      {postList?.map((post) => (
        <div key={post.id} className="post">
          <p className="post__title">{post.title}</p>
          <p className="post__text" onClick={() => navigate(`/post/${post.id}`)}>
            {post.postText}
          </p>
          <div className="post__user-container">
            <p className="post__user">{post.username}</p>
            <div className="post__like-container">
              <HandThumbUpIcon
                className="post__like-icon"
                onClick={() => likeHandler(post.id)}
              />
              <span className="post__like-count">{post.Likes.length} likes</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
