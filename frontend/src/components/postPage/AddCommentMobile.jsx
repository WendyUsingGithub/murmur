import "../../../bootstrap/bootstrap.js";
import "../style.css";
import "./addComment.css";

import PropTypes from "prop-types"
import {useState, useRef} from "react";

function AddCommentMobile({postId, commentId, onSubmit}) {
  const [isSubmitting, setSubmitting] = useState(false);
  const [isEmpty, setEmpty] = useState("");
  const [isActive, setActive] = useState("");
  // const submitIconRef = useRef(null);
  const textAreaRef = useRef(null);

  function onInputHandler(event) {
    const textArea = event.currentTarget;
    const textAreaValue = event.currentTarget.value.trim();

    textArea.style.height = "auto";
    textArea.style.height = `${textArea.scrollHeight}px`;

    if (textAreaValue !== "") {
      setActive("active");
      setEmpty("");
    } else {
      setActive("");
      setEmpty("empty");
    }
  }

  function onClickHandler(event) {
    const textArea = event.currentTarget.value.trim();
  
    if (textArea === "") {
      setEmpty("empty");
      setActive("");
    } else {
      setActive("active");
      setEmpty("");
    }
  }

  function onBlurHandler() {
    const textAreaValue = textAreaRef.current.value.trim();

    if (textAreaValue === "") {
      setActive("");
      setEmpty("");
    }
  }

  async function submitHandler() {
    try {
      const textArea = textAreaRef.current;
      const textAreaValue = textAreaRef.current.value;
      let commentData;

      if(commentId == "post") {
        commentData = {
          postId: postId,
          parentId: postId,
          content: textAreaValue
        }
      }
      else {
        commentData = {
          postId: postId,
          parentId: commentId,
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

  function backspaceHandler() {
      textAreaRef.current.value = "";
  }

  function closeHandler() {
      textAreaRef.current.value = "";
  }
  
  return (
    <div className="addComment">
      <textarea rows="1" placeholder="留言" 
        ref={textAreaRef}
        className="textArea"
        onClick={onClickHandler}
        onBlur={onBlurHandler}
        onInput={onInputHandler}/>

      <div className="divider"></div>

      {
        isSubmitting ?
        (<div className="circular-loader"/>) : 
        (<div className="icons">
          <span className={`material-symbols-outlined ${isEmpty} ${isActive}`} onClick={backspaceHandler}>
            keyboard_backspace
          </span>
          <span className={`material-symbols-outlined ${isEmpty} ${isActive}`} onClick={closeHandler}>
            close
          </span>
          <span className={`material-symbols-outlined ${isEmpty} ${isActive}`} onClick={submitHandler}>
            send
          </span>
        </div>)
      }

      <div className="divider"></div>
      
    </div>
  )
}

AddCommentMobile.propTypes = {
  postId: PropTypes.string,
  commentId: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
}

export default AddCommentMobile