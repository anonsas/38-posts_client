import React from 'react';
import './CommentForm.scss';

function CommentForm({ submitCommentForm, comment, setComment }) {
  return (
    <form className="comment-form" onSubmit={submitCommentForm}>
      <label htmlFor="commentText">What do you think?</label>
      <input
        type="text"
        name="commentText"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Message"
        autoComplete="off"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default CommentForm;
