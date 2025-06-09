import PropTypes from "prop-types"

import Comment from "./comment.jsx"

function Comments({postId, comments}) {
  console.log(postId);
  console.log(comments);

  return  (              
    <div className="comments">
      {comments.map((comment, index) =>
        <Comment key={index} comment={comments[index]}/>
      )}
    </div>
  )
}

Comments.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.string.isRequired
}

export default Comments