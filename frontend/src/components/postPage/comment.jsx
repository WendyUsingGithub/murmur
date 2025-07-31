import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types"
import {useState, useEffect} from "react";
import axios from "axios";

import Paragraph from "../paragraph/paragraph.jsx"

import "../style.css"
import "./comment.css"

function Comment({postId, commentId, comment}) {
  const navigate = useNavigate();
  const [paragraphs, setParagraphs] = useState([]);
  const [author, setAuthor] = useState(null);

  function onClickHandler() {
    navigate(`/postPage/${postId}/${commentId}`);
  }

  function onClickHandlerAuthor(e) {
    e.stopPropagation();
    navigate(`/author/${author}`);
  }
  
  useEffect(() => {

    console.log("COMMENT", comment);

    function parseContent(content) {
      const parapraphs = content.split("\n\n");
      for(let i=0; i<parapraphs.length; i++) {
        parapraphs[i] = parapraphs[i].replaceAll("\n", "<br>");
      }
      setAuthor(comment.author);
      setParagraphs(parapraphs);
    }
    parseContent(comment.content);
}, [comment]);

  return (
    <div className="comment">
      <div onClick={onClickHandler}>
        <div className="author">
          <span className="author-name" onClick={onClickHandlerAuthor}>
            {author}
          </span>
        </div>

        <div>
          {paragraphs.map((paragraph, index) =>
            <Paragraph key={index} sentence={paragraph}/>
          )}
        </div>
      </div>

      <div className="divider"/>

      {/* {
        (comment.comments.length == 0) ? 
        (<div className="divider"/>) :
        (<div className="divider">
          <div className={`icon ${iconVisibility}`}>
            <div className="iconHorizontal"></div>
            <div className="iconVerticle"></div>
          </div>
        </div>)
      } */}
    </div>
  )
}

Comment.propTypes = {
  postId: PropTypes.object.isRequired,
  commentId: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
}

export default Comment