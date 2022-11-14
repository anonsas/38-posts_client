import React, { useState, useEffect } from 'react';
import './Home.scss';
import { Card } from '../../components';
import { getAllPosts, likePostHandler } from '../../utils/posts.utils';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const [postList, setPostList] = useState([]);
  const [likedPostList, setLikedPostList] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) navigate('/login');
  }, [navigate]);

  useEffect(() => {
    (async () => {
      const posts = await getAllPosts();
      setPostList(posts.postList);
      setLikedPostList(posts.likedPostList.map((like) => like.PostId));
    })();
  }, []);

  const likeHandler = async (postId) => {
    const response = await likePostHandler(postId);

    setPostList((prevState) =>
      [...prevState].map((post) => {
        if (post.id === postId) {
          if (response.liked) {
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
  };

  return (
    <main className="home">
      {postList?.map((post) => (
        <Card
          key={post.id}
          postId={post.id}
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
