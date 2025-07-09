import PropTypes from "prop-types"
import {useState, useEffect, useRef} from "react";

import SubComments from "./subComments.jsx"
import Paragraph from "../paragraph/paragraph.jsx"

import "../style.css"
import "./comment.css"

function Comment({comment}) {

  const [paragraphs, setParagraphs] = useState([]);
  const [author, setAuthor] = useState(null);
  const [subCommentsVisibility, setSubCommentsVisibility] = useState("subCommentsHide");
  const [iconVisibility, setExpandIconVisibility] = useState("iconShow");
  const [collapseIconVisibility, setCollapseIconVisibility] = useState("iconHide");
  const subCommentsRef = useRef(null);
  
  function iconOnClickHandler() {
    const subComments = subCommentsRef.current;
    subComments.style.maxHeight = `${subComments.scrollHeight}px`;
    setSubCommentsVisibility("subCommentsShow");
    setExpandIconVisibility("iconHide");
    setCollapseIconVisibility("iconShow");
  }

  function collapseIconOnClickHandler() {
    const subComments = subCommentsRef.current;
    subComments.style.maxHeight = "0px";
    setSubCommentsVisibility("subCommentsHide");
    setExpandIconVisibility("iconShow");
    setCollapseIconVisibility("iconHide");
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
      
      <div className="divider">
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
      </div>

      <div className={subCommentsVisibility} ref={subCommentsRef}>
        <SubComments subComments={comment.comments}/>
      </div>
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
}

export default Comment