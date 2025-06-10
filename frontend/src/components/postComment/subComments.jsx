import PropTypes from "prop-types"
import SubComment from "./subComment.jsx"
import "./subComments.css"

function SubComments({subComments}) {
  console.log("subComments", subComments);
  return (
    <div>
      <div className="subComments">
        {subComments.map((subComment, index) =>
          <SubComment key={index} subComment={subComment}/>
        )}
      </div>
      <div className="subCommentEndingDivider"/>
    </div>
  )
}

SubComments.propTypes = {
  subComments: PropTypes.string.isRequired
}

export default SubComments