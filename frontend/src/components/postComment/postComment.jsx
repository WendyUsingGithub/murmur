import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import "../style.css";
import "./postComment.css";

import {useState, useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

import Post from "../post/post.jsx";
import Comments from "./comments.jsx"
import LeaveComment from "./leaveComment.jsx"

function PostComment() {
  const {id} = useParams();
  const [postData, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.post("http://localhost:3001/post", {id:id});
        console.log("RESULT");
        console.log(result);

        let postData = {
          id: result.data.id,
          author: result.data.author,
          content: result.data.content,
          comments: result.data.comments
        }
        console.log("POSTDATA");
        console.log(postData);
        setData(postData);
        
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  if (postData) {
    return(
    <div className="container postComment">
      <div className="content">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <div className="middle">
              <Post postId={postData.id} author={postData.author} content={postData.content}/>
              <LeaveComment/>
              <Comments postId={postData.id} comments={postData.comments}/>
            </div>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </div>)
  }
}

export default PostComment;