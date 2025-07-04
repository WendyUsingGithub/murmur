import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import "../style.css";
import "./postPage.css";

import {useState, useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

import Post from "../post/post.jsx";
import Comments from "./comments.jsx"
import TempComments from "./tempComments.jsx"
import AddComment from "./addComment.jsx"

// class IdGernerator {
//   constructor() {
//     this.count = 0;
//   }
//   generate() {
//     this.count++;
//     return this.count;
//   }
// }

function PostPage() {
  const {id} = useParams();
  const [postData, setData] = useState(null);
  const [tempComments, setTempComments] = useState([]);

  async function addComment(commentData) {

    console.log("ADD COMMENT");

    try {
      // const commentData =
      // {
      //   postId: posstId,
      //   content: textArea,
      // }

      const result = await axios.post("http://localhost:3001/addComment", {data:commentData}, {withCredentials: true});
      console.log("PostPage result", result);
      const tempComment = result.data;
      console.log("TEMP", tempComment);
      setTempComments((prev) => [tempComment, ...prev]);

      //   _id: new ObjectId(),
      //   author: commentAuthor,
      //   content: commentContent,
      //   createdAt: commentCreatedAt ? new Date(commentCreatedAt) : new Date(),
      //   comments: formattedSubComments
      // }

    } catch (err) {
      console.error(err);
    }
  } 

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.post("http://localhost:3001/post", {id:id});

        let data = {
          id: result.data.id,
          author: result.data.author,
          content: result.data.content,
          tag: result.data.tag,
          comments: result.data.comments
        }
        setData(data);
        
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  if (postData) {
    return(
      <div className="container postPage">
        <div className="content">
          <div className="row">
            <div className="col-2"/>
            <div className="col-8">
              <div className="middle">
                <Post postId={postData.id} author={postData.author} content={postData.content} tag={postData.tag}/>
                <AddComment postId={postData.id} onSubmit={addComment}/>
                <TempComments postId={postData.id} comments={tempComments}/>
                <Comments postId={postData.id} comments={postData.comments}/>
              </div>
            </div>
            <div className="col-2"/>
          </div>
        </div>
      </div>
    )
  }
}

export default PostPage;