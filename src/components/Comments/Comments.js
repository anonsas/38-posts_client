import { useState, useEffect } from 'react';
import './Comments.scss';
import CommentForm from './CommentForm/CommentForm';
import Comment from './Comment/Comment';
import DeleteCommentModal from './DeleteCommentModal/DeleteCommentModal';
import axios from 'axios';

function Comments({ postId }) {
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);

  const [deleteComment, setDeleteComment] = useState(null);
  const [deleteCommentModalData, setDeleteCommentModalData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Get All Comments, based on PostId.
  useEffect(() => {
    axios
      .get(`http://localhost:4000/comments/${postId}`)
      .then((response) => setCommentList(response.data))
      .catch((error) => alert(error));
  }, [postId]);

  // Delete A Comment.
  useEffect(() => {
    if (!deleteComment) return;
    axios
      .delete(`http://localhost:4000/comments/${deleteComment.id}`, {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        setCommentList((prevState) =>
          [...prevState].filter((comment) => comment.id !== deleteComment.id)
        );
      });
  }, [deleteComment]);

  // FORM SUBMIT.
  const submitCommentForm = (e) => {
    e.preventDefault();
    if (!comment) return;

    const commentToAdd = {
      comment: comment,
      PostId: postId,
    };

    axios
      .post(`http://localhost:4000/comments`, commentToAdd, {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        if (response.data.error) console.log(response.data.error);
        else {
          const commentToAdd = {
            comment,
            username: response.data.username,
          };
          setCommentList((prevState) => [...prevState, commentToAdd]);
          setComment('');
        }
      })
      .catch((error) => alert(error.message));
  };

  const openDeleteModalHandler = (commentItem) => {
    setIsDeleteModalOpen(true);
    setDeleteCommentModalData(commentItem);
  };

  const closeModalHandler = () => {
    setDeleteCommentModalData(null);
    setIsDeleteModalOpen(false);
  };

  const deleteCommentHandler = () => {
    setDeleteComment(deleteCommentModalData);
    setIsDeleteModalOpen(false);
  };

  return (
    <section className="comments">
      <CommentForm
        submitCommentForm={submitCommentForm}
        comment={comment}
        setComment={setComment}
      />

      <ul className="comments__list">
        {commentList?.map((commentItem, i) => (
          <Comment
            key={i}
            commentItem={commentItem}
            openDeleteModalHandler={openDeleteModalHandler}
          />
        ))}
      </ul>

      <DeleteCommentModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        closeModalHandler={closeModalHandler}
        deleteCommentHandler={deleteCommentHandler}
      />
    </section>
  );
}

export default Comments;
