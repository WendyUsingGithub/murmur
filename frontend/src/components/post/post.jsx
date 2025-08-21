import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import "../style.css";
import "./post.css";

import PropTypes from "prop-types";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Paragraph from "../paragraph/paragraph.jsx"

import axios from "axios";

function Post({PostDataFrontEnd})
{
  const navigate = useNavigate();
  const [paragraphs, setParagraphs] = useState([]);
  const [isLike, setIsLike] = useState(PostDataFrontEnd.like);
  const [likes, setLikes] = useState(PostDataFrontEnd.likesNum);

  function onClickHandler() {
    navigate(`/postPage/${PostDataFrontEnd.postId}/${PostDataFrontEnd.commentId}`);
  }

  function onClickHandlerAuthor(e) {
    e.stopPropagation();
    navigate(`/author/${PostDataFrontEnd.author}`);
  }

  async function likeOnClick() {
    console.log("likeOnClick");
    if(isLike) {
      setIsLike(false);
      setLikes(prev => prev - 1);
      await axios.post("http://1.34.178.127:5555/like", {postId: PostDataFrontEnd.postId, commentId: PostDataFrontEnd.commentId});
    }
    else {
      setIsLike(true);
      setLikes(prev => prev + 1);
      await axios.post("http://1.34.178.127:5555/unlike", {postId: PostDataFrontEnd.postId, commentId: PostDataFrontEnd.commentId});
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
    parseContent(PostDataFrontEnd.content);
  }, [PostDataFrontEnd.content]);

  return (
    <div className="post" onClick={onClickHandler}>
      <div className="author">
          <span className="author-name" onClick={onClickHandlerAuthor}>
              {PostDataFrontEnd.author}
          </span>
      </div>

      <div className="parapraphs">
        {paragraphs.map((paragraph, index) =>
          <Paragraph key={index} sentence={paragraph}/>
        )}
      </div>

      {
        (PostDataFrontEnd.tag) && (
        <div className="post-tags" onClick={(e) => {e.stopPropagation(); navigate(`/tag/${PostDataFrontEnd.tag}`);}}>
          <span className="post-tag">
            {PostDataFrontEnd.tag}
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
            {PostDataFrontEnd.commentsNum}
          </span>
        </span>
      </div>
      <div className="divider"></div>
    </div>
  )
}

Post.propTypes = {
  postId: PropTypes.string.isRequired,
  PostDataFrontEnd: PropTypes.object
}

export default Post