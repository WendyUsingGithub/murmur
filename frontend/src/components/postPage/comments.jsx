import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import axios from "axios"
import Comment from "./comment.jsx"

function Comments({postId, commentId}) {
  const [comments, setComments] = useState([])

  useEffect(() => {
    async function fetchData() {
      const result = await axios.post(`http://1.34.178.127:5555/comments`, {postId: postId, commentId: commentId})
      setComments(result.data);
    }
    fetchData()
  }, [postId, commentId])

  return (
    <div className="comments">
      {comments.map((comment) => (
        <Comment key={comment.id} postId={postId} commentId={comment.commentId} comment={comment} />
      ))}
    </div>
  )
}

Comments.propTypes = {
  postId: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired
}

export default Comments