import {PostDataFrontEnd} from "../frontEndClass.js";
import "../style.css";
import "./feedPosts.css";

import {useState, useEffect} from "react";
import axios from "axios";
import Post from "../post/Post.jsx";

function FeedPosts() {
  const [postsData, setDatas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.post("http://1.34.178.127:5555/posts", {wendy:"wendy"}, {withCredentials: true});
        console.log("RESULT", result);

        let postsData = [];
        for(let i=0; i<result.data.length; i++) {
          const postData = new PostDataFrontEnd(result.data[i]);
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
        <Post key={postData.postId} PostDataFrontEnd={postData}/>
      )}
    </div>
  )
}

export default FeedPosts