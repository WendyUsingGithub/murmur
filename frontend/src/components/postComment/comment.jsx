import PropTypes from "prop-types"
import {useState, useEffect} from "react";

import Paragraph from "../paragraph/paragraph.jsx"

import "../style.css"
import "./comment.css"

function Comment({comment}) {

  const [paragraphs, setParagraphs] = useState([]);
  const [author, setAuthor] = useState();

  function expandIconOnClickHandler() {

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
        <div className="expandIcon" onClick={expandIconOnClickHandler}>
          <div className="expandIconHorizontal"></div>
          <div className="expandIconVerticle"></div>
        </div>
      </div>
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
}

export default Comment