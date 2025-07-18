import PropTypes from "prop-types"
import {useState, useEffect, useRef} from "react";

import Paragraph from "../paragraph/paragraph.jsx"

import "../style.css"
import "./tempComment.css"

function TempComment({comment}) {
  const [paragraphs, setParagraphs] = useState([]);
  const [author, setAuthor] = useState(null);
  const tempCommentRef = useRef(null);

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
    <div className="tempComment" ref={tempCommentRef}>
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
      <div className="divider"/>
    </div>  
  )
}

TempComment.propTypes = {
  comment: PropTypes.object.isRequired,
}

export default TempComment