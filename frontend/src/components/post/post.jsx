import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import "../style.css";

import PropTypes from "prop-types";
import {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import Paragraph from "../paragraph/paragraph.jsx"

import axios from "axios";

function Post({PostData, scroll = false})
{
  const navigate = useNavigate();
  const postRef = useRef(null)
  const [paragraphs, setParagraphs] = useState([]);
  const [isLike, setIsLike] = useState(PostData.like);
  const [likes, setLikes] = useState(PostData.likesNum);

  function onClickHandler() {
    navigate(`/page/${PostData.postId}/${PostData.commentId}`);
  }

  function onClickHandlerAuthor(e) {
    e.stopPropagation();
    navigate(`/profile/${PostData.author}`);
  }

  async function likeOnClick() {
    console.log("likeOnClick");
    if(isLike) {
      setIsLike(false);
      setLikes(prev => prev - 1);
      await axios.post("http://1.34.178.127:5555/unlike", {postId: PostData.postId, commentId: PostData.commentId}, {withCredentials: true});
    }
    else {
      setIsLike(true);
      setLikes(prev => prev + 1);
      await axios.post("http://1.34.178.127:5555/like", {postId: PostData.postId, commentId: PostData.commentId}, {withCredentials: true});
    }
  }

  useEffect(() => {
    function parseContent(content) {
      const paragraphs = content.split("\n\n");
      for(let i=0; i<paragraphs.length; i++) {
        paragraphs[i] = paragraphs[i].replaceAll("\n", "<br>");
      }
      setParagraphs(paragraphs);
    }
    function scrollTo(ref) {
      if (ref.current) {
        const width = window.innerWidth;
        const rect = ref.current.getBoundingClientRect();
        if (width >= 992) {
          const top = rect.top - 12 * 15;
          window.scrollTo({top: top, behavior: "auto"});
        }
        else {
          const top = rect.top - 1 * 16;
          window.scrollTo({top: top, behavior: "auto"});       
        }
      }   
    }
    parseContent(PostData.content);

    if(scroll) {
      setTimeout(() => {
        scrollTo(postRef);
      }, 300);
    }
  }, [PostData.content]);

  return (
    <div className="post" ref={postRef} onClick={onClickHandler}>
      <div className="author">
          <span className="author-name" onClick={onClickHandlerAuthor}>
              {PostData.author}
          </span>
      </div>

      <div className="parapraphs">
        {paragraphs.map((paragraph, index) =>
          <Paragraph key={index} sentence={paragraph}/>
        )}
      </div>

      {
        (PostData.tag) && (
        <div className="post-tags">
          <span className="post-tag" onClick={(e) => {e.stopPropagation(); navigate(`/tag/${PostData.tag}`);}}>
            {PostData.tag}
          </span>
        </div>
      )}

      <div className="interact">
        <span className="item" onClick={(e) => {e.stopPropagation(); likeOnClick();}}>
          <span className={`material-symbols-outlined ${isLike ? "fill" : ""}`}>
            favorite
          </span>
          <span className="number">
            {likes}
          </span>
        </span>
        <span className="item" onClick={(e) => {e.stopPropagation();}}>
          <span style={{scale:"0.95"}} className="material-symbols-outlined">
          tooltip
          </span>
          <span className="number">
            {PostData.commentsNum}
          </span>
        </span>
      </div>
      <div className="divider"></div>
    </div>
  )
}

Post.propTypes = {
  PostData: PropTypes.object.isRequired,
  scroll: PropTypes.bool,
}

export default Post