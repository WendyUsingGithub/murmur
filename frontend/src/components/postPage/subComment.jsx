import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types"
import {useState, useEffect} from "react";

import Paragraph from "../paragraph/paragraph.jsx"
import "./subComments.css"

function SubComment({subComment}) {
  const navigate = useNavigate();
  const [paragraphs, setParagraphs] = useState([]);
  const [author, setAuthor] = useState(null);

  function onClickHandler(e) {
    e.stopPropagation();
    navigate(`/author/${author}`);
  }

  useEffect(() => {
    function parseContent(content) {
      const parapraphs = content.split("\n\n");
      for(let i=0; i<parapraphs.length; i++) {
        parapraphs[i] = parapraphs[i].replaceAll("\n", "<br>");
      }
    setAuthor(subComment.author);
    setParagraphs(parapraphs);
    }
    parseContent(subComment.content);
}, [subComment]);

  return (
    <div className="subComment">
        <div className="author">
          <span className="author-name" onClick={onClickHandler}>
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

SubComment.propTypes = {
  subComment: PropTypes.object.isRequired,
}

export default SubComment