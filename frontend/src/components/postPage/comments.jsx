import PropTypes from "prop-types"

import Comment from "./comment.jsx"

function Comments({postId, comments}) {
  console.log("Comments", postId, comments);
  return  (              
    <div className="comments">
      {comments.map((comment, index) =>
        <Comment key={index} postId={postId} comment={comment}/>
      )}
    </div>
  )
}

Comments.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.string.isRequired
}

export default Comments