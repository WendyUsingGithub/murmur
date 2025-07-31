import PropTypes from "prop-types"
import {useState, useEffect} from "react";
import axios from "axios";SearchByField
import Post from "../post/post.jsx";

function SearchByField({type, field, target}) {
  const [postsData, setDatas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let result;
        if(type=="post") result = await axios.post("http://localhost:3001/searchPostByField", {[field]: target});
        else if (type=="comment")  result = await axios.post("http://localhost:3001/searchCommentByField", {[field]: target});

        let postsData = [];
        for(let i=0; i<result.data.length; i++) {
          const postData = 
          {
            postId: result.data[i].postId,
            commentId: result.data[i].commentId,
            parentId: result.data[i].parentId,
            author: result.data[i].author,
            content: result.data[i].content,
            likes: result.data[i].likes,
            commentsNum: result.data[i].commentsNum
          }
          postsData.push(postData);
        }
        setDatas(postsData);
        
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="posts">
      {postsData.map((postData) =>
        <Post key={postData.commentId} postId={postData.postId} commentId={postData.commentId} author={postData.author} content={postData.content} likes={postData.likes} commentsNum={postData.commentsNum}/>
      )}
    </div>
  )
}

SearchByField.propTypes = {
  type: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
}

export default SearchByField