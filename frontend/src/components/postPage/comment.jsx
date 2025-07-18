import PropTypes from "prop-types"
import {useState, useEffect} from "react";
import axios from "axios";

import SubComments from "./subComments.jsx"
import AddComment from "./addComment.jsx"
import TempComments from "./tempComments.jsx"
import useAccordionOverflowX from "../customHook/useAccordionOverflowX.jsx"
import useAccordion from "../customHook/useAccordion.jsx"
import Paragraph from "../paragraph/paragraph.jsx"

import "../style.css"
import "./comment.css"

function Comment({postId, comment}) {
  const [paragraphs, setParagraphs] = useState([]);
  const [author, setAuthor] = useState(null);
  const [iconVisibility, setIconVisibility] = useState("iconShow");
  const {accordionRef: addCommentRef, toggle: addCommentToggle} = useAccordionOverflowX();
  const {accordionRef: tempCommentsRef, expand: tempCommentsExpand, toggle: tempCommentsToggle} = useAccordion();
  const [tempComments, setTempComments] = useState([]);

  function onClickHandler() {
    addCommentToggle();
    tempCommentsToggle();
    if(iconVisibility=="iconShow") setIconVisibility("iconHide");
    else setIconVisibility("iconShow");
  }

  async function addComment(commentData) {
    try {
      const result = await axios.post("http://localhost:3001/addComment", {data:commentData}, {withCredentials: true});
      console.log("PostPage result", result);
      const tempComment = result.data;
      setTempComments((prev) => [tempComment, ...prev]);
      setTimeout(() => {
        tempCommentsExpand();
      }, 50);
    } catch (err) {
      console.error(err);
    }
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
    parseContent(comment.content);
}, [comment]);

  return (
    <div className="comment">
      <div onClick={onClickHandler}>
        <div className="author">
          <span className="author-name">
            {author}
          </span>
        </div>

        <div>
          {paragraphs.map((paragraph, index) =>
            <Paragraph key={index} sentence={paragraph}/>
          )}
        </div>
      </div>

      {
        (comment.comments.length == 0) ? 
        (<div className="divider"/>) :
        (<div className="divider">
          <div className={`icon ${iconVisibility}`}>
            <div className="iconHorizontal"></div>
            <div className="iconVerticle"></div>
          </div>
        </div>)
      }

      <div className="accordion" ref={addCommentRef}>
        <AddComment postId={postId} commentId={comment._id} onSubmit={addComment}/>
      </div>

      <div className="accordion" ref={tempCommentsRef}>
        <TempComments comments={tempComments}/>
        <SubComments subComments={comment.comments}/>
      </div>
    </div>
  )
}

Comment.propTypes = {
  postId: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
}

export default Comment