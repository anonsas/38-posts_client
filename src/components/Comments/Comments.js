import { useState, useEffect } from 'react';
import './Comments.scss';
import CommentForm from './CommentForm/CommentForm';
import Comment from './Comment/Comment';
import DeleteCommentModal from './DeleteCommentModal/DeleteCommentModal';
import axios from 'axios';

function Comments({ postId }) {
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState(null);
  const [commentData, setCommentData] = useState(null);

  const [deleteComment, setDeleteComment] = useState(null);
  const [deleteCommentModalData, setDeleteCommentModalData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // GET ALL COMMENTS, BASED ON PostId.
  useEffect(() => {
    axios
      .get(`http://localhost:4000/comments/${postId}`)
      .then((response) => setCommentList(response.data))
      .catch((error) => alert(error));
  }, [postId]);

  // POST A COMMENT.
  useEffect(() => {
    if (!commentData) return;
    axios
      .post(`http://localhost:4000/comments`, commentData, {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        if (response.data.error) console.log(response.data.error);
        else {
          commentData.username = response.data.username;
          setCommentList((prevState) => [...prevState, commentData]);
          setComment('');
          setCommentData(null);
        }
      })
      .catch((error) => alert(error.message));
  }, [comment, commentData, postId]);

  // DELETE A COMMENT.
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

  const submitCommentForm = (e) => {
    e.preventDefault();

    setCommentData({
      comment: comment,
      PostId: postId,
    });
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
