import "../../../bootstrap/bootstrap.js";
import "../style.css";
import "./addComment.css";

import PropTypes from "prop-types"
import {useRef} from "react";

function AddComment({postId, onSubmit}) {
  const submitIconRef = useRef(null);
  const textAreaRef = useRef(null);

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
    const textArea = event.currentTarget.value.trim();
    const submitIcon = submitIconRef.current;

    if (textArea === "") {
      submitIcon.classList.remove("active");
    }
  }

  async function submitHandler() {
    try {
      const textArea = textAreaRef.current.value;
      const commentData = {
        postId: postId,
        content: textArea
      }
      onSubmit(commentData);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="addComment">
      <textarea rows="1" placeholder="留言" 
        ref={textAreaRef}
        className="textArea"
        onClick={onClickHandler}
        onBlur={onBlurHandler}
        onInput={onInputHandler}/>
      <span ref={submitIconRef} className="material-symbols-outlined"
        onClick={submitHandler}>
        send
      </span>
      <div className="circular-loader"/>
      <div className="divider"></div>
    </div>
  )
}

AddComment.propTypes = {
  postId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default AddComment