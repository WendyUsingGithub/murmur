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
import Ancestor from "./ancestor.jsx"

function PostPage() {
  const {postId, commentId} = useParams();
  const [data, setData] = useState(null);
  const [id, setId] = useState(null);
  const [tempComments, setTempComments] = useState([]);

  async function addComment(commentData) {
    try {
      const result = await axios.post("http://localhost:3001/addComment", {data:commentData}, {withCredentials: true});
      const tempComment = result.data;
      setTempComments((prev) => [tempComment, ...prev]);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    async function fetchPostData() {
      try {
        const result = await axios.post("http://localhost:3001/post", {id:postId});
        const data = {
          postId: result.data.postId,
          commentId: result.data.commentId,
          parentId: result.data.parentId,
          author: result.data.author,
          content: result.data.content,
          tag: result.data.tag,
          likes: result.data.likes,
        }
        setData(data);
        console.log("data", data);
      } catch (err) {
        console.error(err);
      }
    }

    async function fetchCommentData() {
      try {
        const result = await axios.post("http://localhost:3001/comment", {id:commentId});
        const data = {
          postId: result.data.postId,
          commentId: result.data.commentId,
          parentId: result.data.parentId,
          author: result.data.author,
          content: result.data.content,
          comments: result.data.comments
        }
        setData(data);
      } catch (err) {
        console.error(err);
      }
    }

    if(postId == commentId) {
      setId(postId);
      fetchPostData();
    }
    else {
      setId(commentId);
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
              <Post postId={postId} commentId={commentId} parentId={data.parentId} author={data.author} content={data.content} tag={data.tag} likes={data.likes}/>
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