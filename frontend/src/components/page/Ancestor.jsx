import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import "../style.css";
import "./page.css";
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
        setAncestorDatas(result.data);        
      } catch (err) {
        console.error(err);
      }
    }

    if(postId != commentId) fetchData();
  }, [ancestorDatas, postId, commentId, parentId]);

    return(
      <div className="ancestor">
        <div className="posts">
          {ancestorDatas.map((ancestorData) =>
            <Post key={ancestorData.id} PostData={ancestorData} />
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