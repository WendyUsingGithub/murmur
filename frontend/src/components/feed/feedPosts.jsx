import "../style.css";
import "./feedPosts.css";

import {useState, useEffect} from "react";
import axios from "axios";
import Post from "../post/post.jsx";

function FeedPosts() {
  const [postsData, setDatas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log("FEEEEEEEEEEED");
      try {
        const result = await axios.post("http://localhost:3001/posts", {wendy:"wendy"});

        let postsData = [];
        for(let i=0; i<result.data.length; i++) {
          const postData = 
          {
            id: result.data[i].id,
            author: result.data[i].author,
            content: result.data[i].content
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
        <Post key={postData.id} postId={postData.id} author={postData.author} content={postData.content}/>
      )}
    </div>
  )
}

export default FeedPosts