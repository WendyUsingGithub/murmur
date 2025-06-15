import "../../../bootstrap/bootstrap.js";
import "../style.css";
import "./write.css";

import {useRef} from "react";


function Write() {

  const submitIconRef = useRef(null);

  function onInputHandler(event) {
    const textArea = event.currentTarget;
    const textAreaValue = event.currentTarget.value.trim();
    const submitIcon = submitIconRef.current;

    console.log("onInputHandler", textAreaValue);

    textArea.style.height = "auto";
    textArea.style.height = `${textArea.scrollHeight}px`;

    if (textAreaValue !== "") {
      submitIcon.classList.add("active");
    } else {
      submitIcon.classList.remove("active");
    }
  }

  function onClickHandler(event) {
    const textArea = event.currentTarget.value.trim();
    const submitIcon = submitIconRef.current;
  
    if (textArea === "") {
      submitIcon.classList.remove("active");
    } else {
      submitIcon.classList.add("active");
    }
  }

  function onBlurHandler(event) {
    const textArea = event.currentTarget.value.trim();
    const submitIcon = submitIconRef.current;

    if (textArea === "") {
      submitIcon.classList.remove("active");
    }
  }
  
  function submitHandler() {

  }

  return (
      <div className="container write">
      <div className="content">
        <div className="row">
          <div className="col-2"/>
          <div className="col-8">
            <div className="middle">
            <div className="divider"/>
              <div className="author">
                <span className="author-name">
                    black_cat
                </span>
              </div>

              <textarea rows="10" placeholder="自言自語是最棒的" 
                className="textArea"
                onClick={onClickHandler}
                onBlur={onBlurHandler}
                onInput={onInputHandler}/>

              <div className="post-tags">
                <div className="post-tag">
                  <input className="post-input"/>
                </div>
                <span ref={submitIconRef} className="material-symbols-outlined"
                  onClick={submitHandler}>
                  send
                </span>
              </div>
              <div className="divider"/>
            </div>
          </div>
          <div className="col-2"/>
        </div>
      </div>
    </div>
  )
}

export default Write