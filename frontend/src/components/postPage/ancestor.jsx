import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import "../style.css";
import "./postPage.css";
import "./ancestor.css";

import axios from "axios";

import PropTypes from "prop-types";
import {useState, useEffect} from "react";
// import {useNavigate} from "react-router-dom";


import Post from "../post/post.jsx";

function Ancestor({postId, commentId, parentId}) {
  const [ancestorDatas, setAncestorDatas] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.post("http://localhost:3001/ancestor", {postId: postId, commentId: commentId, parentId: parentId});
        setAncestorDatas([]);
        const ancestorArr = [];
        for(let i=0; i<result.data.length; i++) {

          if(i == 0) {
            const ancestorData = 
            {
              postId: result.data[i].id,
              commentId: result.data[i].id,
              parentId: result.data[i].parentId,
              author: result.data[i].author,
              content: result.data[i].content,
              likes: result.data[i].likes,
              // commentsNum: result.data[i].commentsNum
            }
            ancestorArr.push(ancestorData);
          }
          else {
            const ancestorData = 
            {
              postId: result.data[i].postId,
              commentId: result.data[i].id,
              parentId: result.data[i].parentId,
              author: result.data[i].author,
              content: result.data[i].content,
              tag: result.data[i].likes,
              likes: result.data[i].likes,
              // commentsNum: result.data[i].commentsNum
            }
            ancestorArr.push(ancestorData);
          }
        }
        setAncestorDatas(ancestorArr);
        console.log("ancestorDatas", ancestorDatas);
        
      } catch (err) {
        console.error(err);
      }
    }

    if(postId != commentId) fetchData();
  }, []);


    return(
      <div className="ancestor">

        <div className="posts">
          {ancestorDatas.map((ancestorData) =>
            // <Post key={postData.id} postId={postData.id} author={postData.author} content={postData.content} likes={postData.likes} commentsNum={postData.commentsNum}/>
            <Post key={ancestorData.id} postId={ancestorData.postId} commentId={ancestorData.commentId} author={ancestorData.author} content={ancestorData.content} tag={ancestorData.tag} likes={ancestorData.likes}/>
          )}
        </div>
      </div>
    )
}

Ancestor.propTypes = {
  postId: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  rootId: PropTypes.string.isRequired,
  parentId: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  tag: PropTypes.string,
  likes: PropTypes.number.isRequired,
  commentsNum: PropTypes.number.isRequired
}

export default Ancestor;