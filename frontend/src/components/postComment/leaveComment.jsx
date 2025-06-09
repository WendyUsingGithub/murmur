import "../../../bootstrap/bootstrap.js";
import "../style.css";
import "./leaveComment.css";

import {useRef} from "react";


function LeaveComment() {

  const submitIconRef = useRef(null);

  function onInputHandler(event) {
    const textarea = event.currentTarget;
    const textAreaValue = event.currentTarget.value.trim();
    const submitIcon = submitIconRef.current;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;

    if (textAreaValue !== "") {
      submitIcon.classList.add("active");
    } else {
      submitIcon.classList.remove("active");
      submitIcon.classList.add("empty");
    }
  }

  function onClickHandler(event) {
    const textArea = event.currentTarget.value.trim();
    const submitIcon = submitIconRef.current;
  
    if (textArea === "") {
      submitIcon.classList.add("empty");
      submitIcon.classList.remove("active");
    } else {
      submitIcon.classList.add("active");
      submitIcon.classList.remove("empty");
    }
  }

  function onBlurHandler() {
    const submitIcon = submitIconRef.current;
    submitIcon.classList.remove("active");
    submitIcon.classList.remove("empty");
  }

  return (
    <div className="leave-comment">
      <textarea rows="1" placeholder="留言" 
        className="textArea"
        onClick={onClickHandler}
        onBlur={onBlurHandler}
        onInput={onInputHandler}/>
      <span ref={submitIconRef} className="material-symbols-outlined">
        send
      </span>
      <div className="divider"></div>
    </div>
  )
}

export default LeaveComment