import React, { useState, useEffect } from 'react';
import './Home.scss';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';
import { HandThumbUpIcon as HandThumbUpIconActive } from '@heroicons/react/24/solid';

function Home() {
  const [postList, setPostList] = useState([]);
  const [likedPostList, setLikedPostList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:4000/posts', {
        headers: { accessToken: localStorage.getItem('accessToken') },
      })
      .then((response) => {
        setPostList(response.data.postList);
        setLikedPostList(response.data.likedPostList.map((like) => like.PostId));
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
        if (likedPostList.includes(postId)) {
          setLikedPostList((prevState) =>
            [...prevState].filter((likedPost) => likedPost !== postId)
          );
        } else {
          setLikedPostList((prevState) => [...prevState, postId]);
        }
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
              {/* Is there any PostId in LikedPostList[] 
            If it exist, it means I liked it. */}
              {likedPostList?.includes(post.id) ? (
                <HandThumbUpIconActive
                  className="post__like-icon"
                  onClick={() => likeHandler(post.id)}
                />
              ) : (
                <HandThumbUpIcon
                  className="post__like-icon"
                  onClick={() => likeHandler(post.id)}
                />
              )}

              <span className="post__like-count">{post.Likes.length} likes</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
