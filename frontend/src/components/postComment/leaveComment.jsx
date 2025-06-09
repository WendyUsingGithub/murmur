import "../../../bootstrap/bootstrap.js";
import "../style.css";
import "./leaveComment.css";

import {useRef} from "react";


function LeaveComment() {

  const submitIconRef = useRef();

  return (
    <div className="leave-comment">
      <textarea rows="1" placeholder="留言" className="content"></textarea>
      <span ref={submitIconRef} className="material-symbols-outlined">
        send
      </span>
      <div className="divider"></div>
    </div>
  )
}

export default LeaveComment