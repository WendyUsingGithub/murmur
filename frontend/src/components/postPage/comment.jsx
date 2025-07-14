import PropTypes from "prop-types"
import {useState, useEffect, useRef} from "react";
import axios from "axios";

import SubComments from "./subComments.jsx"
import AddComment from "./addComment.jsx"
import useAccordion from "../customHook/useAccordion.jsx"
import Paragraph from "../paragraph/paragraph.jsx"

import "../style.css"
import "./comment.css"

function Comment({postId, comment}) {
  const [paragraphs, setParagraphs] = useState([]);
  const [author, setAuthor] = useState(null);
  const [iconVisibility, setExpandIconVisibility] = useState("iconShow");
  const [collapseIconVisibility, setCollapseIconVisibility] = useState("iconHide");
  const {accordionRef: subCommentsRef, expand: accordionExpand, collapse: accordionCollapse} = useAccordion();
  const {accordionRef: addCommentRef, toggle: accordionToggle} = useAccordion();

  async function addComment(commentData) {
    try {
      const result = await axios.post("http://localhost:3001/addComment", {data:commentData}, {withCredentials: true});
      console.log("PostPage result", result);
      const tempComment = result.data;
      console.log("TEMP", tempComment);
      // setTempComments((prev) => [tempComment, ...prev]);
      console.log("ADD COMMENT FINISH");
    } catch (err) {
      console.error(err);
    }
  }
  
  function iconOnClickHandler() {
    accordionExpand();
    setExpandIconVisibility("iconHide");
    setCollapseIconVisibility("iconShow");
  }

  function collapseIconOnClickHandler() {
    accordionCollapse();
    setExpandIconVisibility("iconShow");
    setCollapseIconVisibility("iconHide");
  }
  function NOTWORKING() {
    console.log("gg");
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
    <div className="comment" onClick={accordionToggle}>
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

      {
        (comment.comments.length == 0) ? 
        (<div className="divider"/>) :
        (<div className="divider">
          <div className={`icon ${iconVisibility}`} onClick={iconOnClickHandler}>
            <div>
              <div className="iconHorizontal"></div>
              <div className="iconVerticle"></div>
            </div>
          </div>
          <div className={`icon ${collapseIconVisibility}`} onClick={collapseIconOnClickHandler}>
            <div>
              <div className="iconHorizontal"></div>
            </div>
          </div>
        </div>)
      }

      <div className="addCommentVisibility" ref={addCommentRef}>
        {/* <TempSubComments postId={postData.id} comments={tempComments}/> */}
        <AddComment postId={postId} commentId={comment._id} onSubmit={addComment}/>
      </div>


      <div className="subCommentsVisibility" ref={subCommentsRef}>
        {/* <TempSubComments postId={postData.id} comments={tempComments}/> */}
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