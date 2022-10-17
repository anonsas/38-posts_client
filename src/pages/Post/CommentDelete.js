import React from 'react';

function CommentDelete({
  setDeleteComment,
  deleteCommentModalData,
  setDeleteCommentModalData,
}) {
  const deleteCommentHandler = () => {
    setDeleteComment(deleteCommentModalData);
    setDeleteCommentModalData(null);
  };

  if (!deleteCommentModalData) return;

  return (
    <div className="overlay">
      <div className="modal">
        <h5>Are you sure?</h5>
        <div className="modal__actions">
          <button type="button" onClick={deleteCommentHandler}>
            I'm sure
          </button>
          <button type="button" onClick={() => setDeleteCommentModalData(null)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentDelete;
