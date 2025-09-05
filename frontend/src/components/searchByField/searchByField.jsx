import PropTypes from "prop-types"
import {useState, useEffect} from "react";
import axios from "axios";SearchByField
import Post from "../post/Post.jsx";

function SearchByField({type, field, target}) {
  const [postsData, setDatas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let result;
        if(type=="post") result = await axios.post("http://1.34.178.127:5555/searchPostByField", {[field]: target}, {withCredentials: true});
        else if (type=="comment")  result = await axios.post("http://1.34.178.127:5555/searchCommentByField", {[field]: target}, {withCredentials: true});

        let postsData = [];
        for(let i=0; i<result.data.length; i++) {
          postsData.push(result.data[i]);
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
        <Post key={postData.commentId} PostData={postData}/>
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