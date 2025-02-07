import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import "../style.css";
import "./post.css";

function Post({author, content}) {
  
  const [parapraphs, setparapraphs] = useState([]);

  useEffect(() => {
    function parseContent(content)
    {
      const sentences = content.split("\n\n");
      for(let i=0; i<sentences.length; i++) {
        sentences[i] = sentences[i].replaceAll("\n", "<br>");
      }
    
      const parapraphsHTML = sentences.map((sentence, index) => (
        <p key={index} dangerouslySetInnerHTML={{__html:sentence}}/>
      ));
      setparapraphs(parapraphsHTML);
    }
    parseContent(content);
  }, [content]); 


  return (

    <div className="post">
      <div className="author">
          <span className="author-name">
              {author}
          </span>
      </div>
      
      {parapraphs}
          
      <div className="interact">
        <span tabIndex="0" className="item">
            <span className="material-symbols-outlined">
            favorite
            </span>
            <span className="number">
            25
            </span>
        </span>
        <span className="item">
            <span tabIndex="0" style={{scale: "0.95"}} className="material-symbols-outlined">
            tooltip
            </span>
            <span className="number">
            3K
            </span>
        </span>
      </div>

      <div className="divider"></div>
    </div>
  )
}

Post.propTypes = {
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
}

export default Post