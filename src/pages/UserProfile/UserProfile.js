import React, { useEffect, useState } from 'react';
import './UserProfile.scss';
import Card from '../../components/Card/Card';

import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState('');
  const [userPostList, setUserPostList] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) navigate('/login');
  }, [navigate]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/auth/userinfo/${id}`)
      .then((response) => {
        setUserProfile(response.data);
      })
      .catch((error) => alert(error));

    axios
      .get(`http://localhost:4000/posts/user/${id}`)
      .then((response) => {
        setUserPostList(response.data);
      })
      .catch((error) => alert(error));
  }, [id]);

  return (
    <main className="user-profile">
      <div className="user-profile__details-container">
        <h2 className="user-profile__heading">{userProfile?.username} user's page</h2>
      </div>
      <div className="user-profile__posts-container">
        {userPostList?.map((post) => (
          <Card
            key={post.id}
            postId={post.id}
            title={post.title}
            text={post.postText}
            userId={post.UserId}
            username={post.username}
            likesCount={post.Likes.length}
          />
        ))}
      </div>
    </main>
  );
}

export default UserProfile;
