import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";

import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./post.jsx";
import "../style.css";
import "./posts.css";

function Posts()
{
  const [postsData, setDatas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.post("http://localhost:3001/post", { wendy: "wendy" });
    
        console.log("Fetch Data");
        console.log(result.data.length);
        console.log(result.data[0].author);
        console.log(result.data[0].content);

        let postsData = [];
        for(let i=0; i<result.data.length; i++) {
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
    <div className="posts fade-in">
      {postsData.map((postData) =>
        <Post key={postData.id} author={postData.author} content={postData.content}/>
      )}
    </div>
  )
}


export default Posts