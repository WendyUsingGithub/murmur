import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import "../style.css";
import "./page.css";
import "./ancestor.css";

import PropTypes from "prop-types";
import {useState, useEffect, useRef} from "react";
import axios from "axios";

import Post from "../post/Post.jsx";

function Ancestor({postId, commentId, parentId}) {
  const ancestorRef = useRef(null);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [visibility, setVisibility] = useState("");
  const [ancestorDatas, setAncestorDatas] = useState([]);

  function scrollHandler() {
    const currentScrollY = window.scrollY;
    if (ancestorRef.current) {
      if (prevScrollY > currentScrollY) {
        setVisibility("ancestorShow");
        window.removeEventListener("scroll", scrollHandler);
      }
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.post("http://1.34.178.127:5555/ancestor", {postId: postId, commentId: commentId, parentId: parentId}, {withCredentials: true});
        setAncestorDatas(result.data);        
      } catch (err) {
        console.error(err);
      }
    }

    setTimeout(() => {
      setPrevScrollY(window.scrollY);
    }, 500);

    if(postId != commentId) fetchData();
    window.addEventListener("scroll", scrollHandler);
  }, [ancestorDatas, postId, commentId, parentId]);

    return(
      <div ref={ancestorRef} className={`ancestor ${visibility}`}>
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