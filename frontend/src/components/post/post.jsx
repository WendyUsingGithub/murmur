import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import "../style.css";

import PropTypes from "prop-types";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Paragraph from "../paragraph/paragraph.jsx"

// function Post({postId, author, content, tag, likes, commentsNum})
function Post({postId, author, content, tag, likes, commentsNum})
{
  const navigate = useNavigate();
  const [paragraphs, setParagraphs] = useState([]);

  function onClickHandler(e) {
    e.stopPropagation();
    navigate(`/author/${author}`);
  }

  useEffect(() => {
    function parseContent(content) {
      const paragraphs = content.split("\n\n");
      for(let i=0; i<paragraphs.length; i++) {
        paragraphs[i] = paragraphs[i].replaceAll("\n", "<br>");
      }
      setParagraphs(paragraphs);
    }
    parseContent(content);
  }, [content]);

  return (
    <div className="post" onClick={() => navigate(`/postPage/${postId}/post`)}>
      <div className="author">
          <span className="author-name" onClick={onClickHandler}>
              {author}
          </span>
      </div>

      <div className="parapraphs">
        {paragraphs.map((paragraph, index) =>
          <Paragraph key={index} sentence={paragraph}/>
        )}
      </div>

      {
        tag && (
        <div className="post-tags" onClick={(e) => {e.stopPropagation(); navigate(`/tag/${tag}`);}}>
          <span className="post-tag">
            {tag}
          </span>
        </div>
      )}

      <div className="interact">
        <span className="item">
          <span className="material-symbols-outlined">
          favorite
          </span>
          <span className="number">
            {likes}
          </span>
        </span>
        <span className="item">
          <span style={{scale:"0.95"}} className="material-symbols-outlined">
          tooltip
          </span>
          <span className="number">
            {/* {commentsNum} */}50
          </span>
        </span>
      </div>
      <div className="divider"></div>
    </div>
  )
}

Post.propTypes = {
  postId: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  tag: PropTypes.string,
  likes: PropTypes.number.isRequired,
  commentsNum: PropTypes.number.isRequired
}

export default Post