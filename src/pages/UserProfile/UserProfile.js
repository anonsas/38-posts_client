import React, { useEffect, useState } from 'react';
import './UserProfile.scss';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { HandThumbUpIcon as HandThumbUpIconActive } from '@heroicons/react/24/solid';

function UserProfile() {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState('');
  const [userPostList, setUserPostList] = useState([]);

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

  console.log(userProfile);
  console.log(userPostList);

  return (
    <main className="user-profile">
      <h2 className="user-profile__heading">{userProfile?.username} user's page</h2>
      <div className="user-profile__details-container"></div>
      <div className="user-profile__posts-container">
        {userPostList?.map((post) => (
          <section key={post.id} className="post">
            <span className="post__title">{post.title}</span>
            <span className="post__text">{post.postText}</span>
            <div className="post__user-container">
              {/* <span className="post__user" onClick={() => navigate(`/user/${}`)}>{post.username}</span> */}
              <div className="post__like-container">
                <HandThumbUpIconActive />
                <span className="post__like-count">{post.Likes.length} likes</span>
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

export default UserProfile;
