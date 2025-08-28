import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import "../style.css";
import "./post.css";

import PropTypes from "prop-types";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Paragraph from "../paragraph/paragraph.jsx"

import axios from "axios";

function Notification({notificationData})
{
  console.log("!!!!Notification");
  const navigate = useNavigate();
  const [paragraphs, setParagraphs] = useState([]);
  const [isLike, setIsLike] = useState(PostDataFrontEnd.like);
  const [likes, setLikes] = useState(PostDataFrontEnd.likesNum);

  function onClickHandler() {
    navigate(`/postPage/${notificationData.postId}/${notificationData.commentId}`);
  }


  useEffect(() => {
    function parseContent(content) {
      const paragraphs = content.split("\n\n");
      for(let i=0; i<paragraphs.length; i++) {
        paragraphs[i] = paragraphs[i].replaceAll("\n", "<br>");
      }
      setParagraphs(paragraphs);
    }
    parseContent(PostDataFrontEnd.content);
  }, [notificationData.content]);

  return (
    <div className="post" onClick={onClickHandler}>

      某某某回復了你的文章留言
      <div className="parapraphs">
        {paragraphs.map((paragraph, index) =>
          <Paragraph key={index} sentence={paragraph}/>
        )}
      </div>
      ...

      <div className="divider"></div>
    </div>
  )
}

Notification.propTypes = {
  notificationData: PropTypes.object
}

export default Notification