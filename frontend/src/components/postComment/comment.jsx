import PropTypes from "prop-types"
import {useState, useEffect} from "react";

import "../style.css"
import "./comment.css"

function Comment(author, content) {

  const [comment, setComment] = useState([]);

  useEffect(() => {
    function parseContent(content) {
      const sentences = content.split("\n\n");
      for(let i=0; i<sentences.length; i++) {
        sentences[i] = sentences[i].replaceAll("\n", "<br>");
      }
    const commentHTML = sentences.map((sentence, index) => (
      <p key={index} dangerouslySetInnerHTML={{__html:sentence}}/>
    ));
    setComment(commentHTML);
  }
  parseContent(content);  
}, [content]);

  return (
    <div className="comment">
      <div className="author">
        <span className="author-name">
          orange_cat
        </span>
      </div>

      <div className="comment-content">
        <p>
          我們不妨可以這樣來想:做好貓咪這件事，可以說已經成為了全民運動。
          {comment}
        </p>
      </div>
      <div className="divider"></div>
    </div>

  )

}

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
}

export default Comment