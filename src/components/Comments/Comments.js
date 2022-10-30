import React from 'react';
import './Comments.scss';
import CommentForm from './CommentForm/CommentForm';
import Comment from './Comment/Comment';

function Comments({ submitCommentForm, commentList, comment, setComment }) {
  return (
    <div className="comment-container">
      <CommentForm
        submitCommentForm={submitCommentForm}
        comment={comment}
        setComment={setComment}
      />

      <div className="comment-list">
        {commentList?.map((commentItem, i) => (
          <Comment commentItem={commentItem} key={i} />
        ))}
      </div>
    </div>
  );
}

export default Comments;
