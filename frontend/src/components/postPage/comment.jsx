import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types"
import {useState, useEffect} from "react";
import axios from "axios";

import AddComment from "./addComment.jsx"
import TempComments from "./tempComments.jsx"
import useAccordionOverflowX from "../customHook/useAccordionOverflowX.jsx"
import useAccordion from "../customHook/useAccordion.jsx"
import Paragraph from "../paragraph/paragraph.jsx"

import "../style.css"
import "./comment.css"

function Comment({postId, commentId, comment}) {
  const navigate = useNavigate();
  const [paragraphs, setParagraphs] = useState([]);
  const [author, setAuthor] = useState(null);
  const [iconVisibility, setIconVisibility] = useState("iconShow");
  const {accordionRef: addCommentRef, toggle: addCommentToggle} = useAccordionOverflowX();
  const {accordionRef: tempCommentsRef, expand: tempCommentsExpand, toggle: tempCommentsToggle} = useAccordion();
  const [tempComments, setTempComments] = useState([]);

  function onClickHandler() {

    navigate(`/postPage/${postId}/${commentId}`);
    // addCommentToggle();
    // tempCommentsToggle();
    // if(iconVisibility=="iconShow") setIconVisibility("iconHide");
    // else setIconVisibility("iconShow");
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

      {/* <div className="accordion" ref={tempCommentsRef}>
        <TempComments comments={tempComments}/>
        <SubComments subComments={comment.comments}/>
      </div> */}
    </div>
  )
}

Comment.propTypes = {
  postId: PropTypes.object.isRequired,
  commentId: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
}

export default Comment