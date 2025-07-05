import PropTypes from "prop-types"

import TempComment from "./tempComment.jsx"

function TempComments({postId, comments}) {
  console.log(postId);
  console.log(comments);

  return  (              
    <div className="tempComments">
      {comments.map((comment, index) =>
        <TempComment key={index} comment={comment}/>
      )}
    </div>
  )
}

TempComments.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.string.isRequired
}

export default TempComments