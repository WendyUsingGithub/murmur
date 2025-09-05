import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types"
import {useState, useEffect, useRef} from "react";

import Paragraph from "../paragraph/paragraph.jsx"

import "../style.css"
import "./comment.css"

function Comment({postId, commentId, comment, scroll=false}) {
  const navigate = useNavigate();
  const commentRef = useRef(null);
  const [paragraphs, setParagraphs] = useState([]);
  const [author, setAuthor] = useState(null);
  const [theComment, setTheComment] = useState(false);

  function onClickHandler() {
    navigate(`/page/${postId}/${commentId}`);
  }

  function onClickHandlerAuthor(e) {
    e.stopPropagation();
    navigate(`/profile/${author}`);
  }

  useEffect(() => {
    function parseContent(content) {
      const parapraphs = content.split("\n\n");
      for(let i=0; i<parapraphs.length; i++) {
        parapraphs[i] = parapraphs[i].replaceAll("\n", "<br>");
      }
      setAuthor(comment.author);
      setParagraphs(parapraphs);
    }
    if(scroll && scroll === commentId) {
      setTimeout(() => {
        commentRef.current.scrollIntoView({behavior: "smooth", block: "center"});
        setTheComment(true);
      }, 300);
    }
    parseContent(comment.content);
}, [comment]);

  return (
    <div className={`comment ${theComment ? "theComment" : ""}`}  ref={commentRef}>
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
    </div>
  )
}

Comment.propTypes = {
  postId: PropTypes.object.isRequired,
  commentId: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  scroll: PropTypes.bool
}

export default Comment