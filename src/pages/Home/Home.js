import React, { useState, useEffect } from 'react';
import './Home.scss';
import Card from '../../components/Card/Card';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const [postList, setPostList] = useState([]);
  const [likedPostList, setLikedPostList] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login');
    } else {
      axios
        .get('http://localhost:4000/posts', {
          headers: { accessToken: localStorage.getItem('accessToken') },
        })
        .then((response) => {
          setPostList(response.data.postList);
          setLikedPostList(response.data.likedPostList.map((like) => like.PostId));
        });
    }
  }, [navigate]);

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
    <main className="posts">
      {postList?.map((post) => (
        <Card
          id={post.id}
          title={post.title}
          text={post.postText}
          userId={post.UserId}
          username={post.username}
          likeHandler={likeHandler}
          likedPostList={likedPostList}
          likesCount={post.Likes.length}
        />
      ))}
    </main>
  );
}

export default Home;
