import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import "../style.css";

import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

function Notification({notificationData}) {
  const navigate = useNavigate();

  function onClickHandler() {
    navigate(`/noti/${notificationData.postId}/${notificationData.parentId}/${notificationData.commentId}`);
  }

  return (
    <div onClick={onClickHandler}>
      <div className="author">
        <span className="author-name">
          {notificationData.hisAuthor}
        </span>
      </div>
      <div className="yourContent single-line">
        <p>{notificationData.yourContent}</p>
      </div>
      <div className="hisContent single-line">
        <p>{notificationData.hisContent}</p>
      </div>
      <div className="divider"></div>
    </div>
  )
}

Notification.propTypes = {
  notificationData: PropTypes.object
}

export default Notification