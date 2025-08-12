import AddCommentDesktop from "./AddCommentDesktop.jsx";
import AddCommentMobile from "./AddCommentMobile.jsx";

import PropTypes from "prop-types"

function AddComment({postId, commentId, onSubmit}) {
  const width = window.innerWidth;
  if (width >= 992) {
    return <AddCommentDesktop postId={postId} commentId={commentId} onSubmit={onSubmit} />;
  } else {
    return <AddCommentMobile postId={postId} commentId={commentId} onSubmit={onSubmit} />;
  }
}

AddComment.propTypes = {
  postId: PropTypes.string,
  commentId: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
}

export default AddComment;
