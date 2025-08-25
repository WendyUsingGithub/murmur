import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import {PostDataFrontEnd, CommentDataFrontEnd} from "../frontEndClass.js";
import "../style.css";
import "./postPage.css";
import "./ancestor.css";

import PropTypes from "prop-types";
import {useState, useEffect} from "react";
import axios from "axios";

import Post from "../post/Post.jsx";

function Ancestor({postId, commentId, parentId}) {
  const [ancestorDatas, setAncestorDatas] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.post("http://1.34.178.127:5555/ancestor", {postId: postId, commentId: commentId, parentId: parentId}, {withCredentials: true});
        setAncestorDatas([]);
        const ancestorArr = [];
        for(let i=0; i<result.data.length; i++) {
          if(i == 0) {
            const ancestorData = new PostDataFrontEnd(result.data[i]);
            ancestorArr.push(ancestorData);
          }
          else {
            const ancestorData = new CommentDataFrontEnd(result.data[i]);
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
            <Post key={ancestorData.id} PostDataFrontEnd={ancestorData} />
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
  likesNum: PropTypes.number.isRequired,
  commentsNum: PropTypes.number.isRequired
}

export default Ancestor;