import PropTypes from "prop-types"
import {useState, useEffect} from "react";
import useAccordion from "../customHook/useAccordion.jsx";
import Paragraph from "../paragraph/paragraph.jsx"
import {useNavigate} from "react-router-dom";

import "../style.css"
import "./tempComment.css"

function TempComment({comment}) {
  const navigate = useNavigate();
  const [paragraphs, setParagraphs] = useState([]);
  const [author, setAuthor] = useState(null);
  const {accordionRef, expand} = useAccordion();

  function onClickHandler() {
    navigate(`/postpage/${comment.postId}/${comment.id}`);
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
    setTimeout(() => {
      expand();
    }, 100);
  }, [comment]);

  return (
    <div className="comment tempComment" ref={accordionRef} onClick={onClickHandler}>
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