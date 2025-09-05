import PropTypes from "prop-types"
import TempComment from "./tempComment.jsx"

function TempComments({comments}) {
  return  (              
    <div className="tempComments">
      {comments.map((comment) =>
        <TempComment key={comment.commentId} comment={comment}/>
      )}
    </div>
  )
}

TempComments.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.string.isRequired,
}

export default TempComments