import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import axios from "axios"
import Comment from "./comment.jsx"

function Comments({postId, parentId}) {
  const [comments, setComments] = useState([])

  useEffect(() => {
    async function fetchData() {
      const result = await axios.post(`http://localhost:3001/comments`, {postId: postId, parentId: parentId})
      setComments(result.data);
    }
    fetchData()
  }, [postId])

  return (
    <div className="comments">
      {comments.map((comment) => (
        <Comment key={comment.id} postId={postId} commentId={comment.id} comment={comment} />
      ))}
    </div>
  )
}

Comments.propTypes = {
  parentId: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired
}

export default Comments