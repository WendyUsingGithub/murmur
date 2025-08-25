import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import {PostDataFrontEnd, CommentDataFrontEnd} from "../frontEndClass.js";
import "../style.css";
import "./postPage.css";

import {useState, useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

import Post from "../post/Post.jsx";
import Comments from "./comments.jsx"
import TempComments from "./tempComments.jsx"
import AddComment from "./addComment.jsx"
import Ancestor from "./Ancestor.jsx"

function PostPage() {
  const {postId, commentId} = useParams();
  const [data, setData] = useState(null);
  const [tempComments, setTempComments] = useState([]);

  async function addComment(commentData) {
    try {
      const result = await axios.post("http://1.34.178.127:5555/addComment", {data:commentData}, {withCredentials: true});
      const tempComment = result.data;
      setTempComments((prev) => [tempComment, ...prev]);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    async function fetchPostData() {
      try {
        const result = await axios.post("http://1.34.178.127:5555/post", {id:postId}, {withCredentials: true});
        const data = new PostDataFrontEnd(result.data);
        setData(data);
      } catch (err) {
        console.error(err);
      }
    }

    async function fetchCommentData() {
      try {
        const result = await axios.post("http://1.34.178.127:5555/comment", {id:commentId}, {withCredentials: true});
        const data = new CommentDataFrontEnd(result.data);
        setData(data);
      } catch (err) {
        console.error(err);
      }
    }

    if(postId == commentId) {
      fetchPostData();
    }
    else {
      fetchCommentData();
    }

  }, [postId, commentId]);

  if (data) {
    return(
      <div className="container postPage">
        <div className="content">
          <div className="row">
            <div className="col-2 d-none d-lg-block"/>
            <div className="col-12 col-lg-6">
              <Ancestor postId={postId} commentId={commentId} parentId={data.parentId}/>
              <Post PostDataFrontEnd={data}/>
              <AddComment postId={postId} commentId={commentId} onSubmit={addComment}/>
              <TempComments postId={postId} comments={tempComments}/>
              <Comments postId={postId} commentId={commentId}/>
            </div>
            <div className="col-2 d-none d-lg-block"/>
          </div>
        </div>
      </div>
    )
  }
}

export default PostPage;