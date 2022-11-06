import React from 'react';
import './Card.scss';

import { useNavigate, Link } from 'react-router-dom';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';
import { HandThumbUpIcon as HandThumbUpIconActive } from '@heroicons/react/24/solid';

function Card({
  postId,
  title,
  text,
  userId,
  username,
  likeHandler,
  likedPostList,
  likesCount,
  authUser,
  openDeleteModalHandler,
}) {
  const navigate = useNavigate();

  return (
    <article className="card">
      <h3 className="card__title">{title}</h3>
      <span className="card__text" onClick={() => navigate(`/post/${postId}`)}>
        {text}
      </span>
      <div className="card__details-container">
        <Link to={`/user/${userId}`} className="card__user">
          {username}
        </Link>
        <div className="card__like-container">
          {/* Is there any PostId in LikedPostList[] 
          If it exist, it means I liked it before */}
          {likeHandler ? (
            likedPostList?.includes(postId) ? (
              <HandThumbUpIconActive
                className="card__like-icon"
                onClick={() => likeHandler(postId)}
              />
            ) : (
              <HandThumbUpIcon
                className="card__like-icon"
                onClick={() => likeHandler(postId)}
              />
            )
          ) : (
            <HandThumbUpIconActive className="card__like-icon" />
          )}

          <span className="card__like-count">{likesCount} likes</span>
        </div>
      </div>

      {authUser && (
        <button
          className="card__delete-btn"
          onClick={() => openDeleteModalHandler(postId)}
        >
          X
        </button>
      )}
    </article>
  );
}

export default Card;
