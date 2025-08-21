import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import "../style.css";
import "./posts.css";


import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post.jsx";

function Posts() {
  const [postsData, setDatas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.post("http://1.34.178.127:5555/posts", {wendy:"wendy"});
    
        console.log("Fetch Data");
        console.log(result.data.length);
        console.log(result.data[0].author);
        console.log(result.data[0].content);

        let postsData = [];
        for(let i=0; i<1; i++) {
          const postData = 
          {
            id: i,
            author: result.data[i].author,
            content: result.data[i].content,
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
        <Post key={postData.id} author={postData.author} content={postData.content}/>
      )}
    </div>
  )
}


export default Posts