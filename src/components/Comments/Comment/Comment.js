import React from 'react';
import './Comment.scss';
import { useAuth } from '../../../contexts/AuthContext';

function Comment({ commentItem, openDeleteModalHandler }) {
  const auth = useAuth();

  return (
    <div className="comment">
      <p className="comment__content">{commentItem.comment}</p>
      <p className="comment__author">{commentItem.username}</p>
      {auth.user?.username === commentItem.username && (
        <button onClick={() => openDeleteModalHandler(commentItem)}>X</button>
      )}
    </div>
  );
}

export default Comment;
