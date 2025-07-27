import PropTypes from "prop-types"
import {useState, useEffect} from "react";
import axios from "axios";
import Post from "../post/post.jsx";

function SearchByField({field, target}) {
  const [postsData, setDatas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.post("http://localhost:3001/searchByField", {[field]: target});

        let postsData = [];
        for(let i=0; i<result.data.length; i++) {
          const postData = 
          {
            id: result.data[i].id,
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
        <Post key={postData.id} postId={postData.id} author={postData.author} content={postData.content} likes={postData.likes} commentsNum={postData.commentsNum}/>
      )}
    </div>
  )
}

SearchByField.propTypes = {
  field: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
}

export default SearchByField