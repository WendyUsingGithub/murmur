import PropTypes from "prop-types";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import Paragraph from "../paragraph/paragraph.jsx"

import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import "../style.css";
import "./post.css";

function Post({postId, author, content, tag})
{
  const navigate = useNavigate();
  const [paragraphs, setParagraphs] = useState([]);

  function onClickHandler() {
    navigate(`/postComment/${postId}`);
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
    <div className="post">
      <div className="author">
          <span className="author-name">
              {author}
          </span>
      </div>

      <div className="parapraphs" onClick={onClickHandler}>
        {paragraphs.map((paragraph, index) =>
          <Paragraph key={index} sentence={paragraph}/>
        )}
      </div>

      {
        tag ? (
          <div className="post-tags">
            <span className="post-tag">
              {tag}
            </span>
          </div>
        ) : null
      }

      <div className="interact">
        <span className="item">
          <span className="material-symbols-outlined">
          favorite
          </span>
          <span className="number">
          25
          </span>
        </span>
        <span className="item">
          <span style={{scale:"0.95"}} className="material-symbols-outlined">
          tooltip
          </span>
          <span className="number">
          3K
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
  tag: PropTypes.string
}

export default Post