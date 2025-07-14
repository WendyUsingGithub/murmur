import "../../../bootstrap/bootstrap.js";
import "../style.css";
import "./addComment.css";

import PropTypes from "prop-types"
import {useState, useRef} from "react";

function AddComment({postId, commentId, onSubmit}) {
  const [isSubmitting, setSubmitting] = useState(false);
  const submitIconRef = useRef(null);
  const textAreaRef = useRef(null);

  function onInputHandler(event) {
    const textArea = event.currentTarget;
    const textAreaValue = event.currentTarget.value.trim();
    const submitIcon = submitIconRef.current;

    textArea.style.height = "auto";
    textArea.style.height = `${textArea.scrollHeight}px`;

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
    if(!(postId || commentId)) return;
    try {
      const textArea = textAreaRef.current;
      const textAreaValue = textAreaRef.current.value;
      let commentData;

      if(commentId) {
        commentData = {
          postId: postId,
          commentId: commentId,
          content: textAreaValue
        }
      }
      else {
        commentData = {
          postId: postId,
          content: textAreaValue
        }
      }

      setSubmitting(true);
      await onSubmit(commentData);
      textArea.value = "";
      textArea.style.height = "auto";
      textArea.style.height = `${textArea.scrollHeight}px`;
      setSubmitting(false);
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
      {
        isSubmitting ?
        (<div className="circular-loader"/>) : 
        (<span ref={submitIconRef} className="material-symbols-outlined"
          onClick={submitHandler}>
          send
        </span>)
      }
      <div className="divider"></div>
    </div>
  )
}

AddComment.propTypes = {
  postId: PropTypes.string,
  commentId: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
}

export default AddComment