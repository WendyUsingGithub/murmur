import "../../../bootstrap/bootstrap.js";
import "../style.css";
import "./write.css";

import {useContext, useRef} from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom";
import AuthContext from "../auth/AuthContext.jsx";

function Write() {

  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  const submitIconRef = useRef(null);
  const textAreaRef = useRef(null);
  const tagRef = useRef(null);

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
  
  async function submitHandler() {
    try {
      const textArea = textAreaRef.current.value;
      const tag = tagRef.current.value;
      const writeData =
      {
        content: textArea,
        tag: tag,
      }
      const result = await axios.post("http://1.34.178.127:5555/write", {data:writeData}, {withCredentials: true});
      console.log(result.data);
      if(result.data) {
        navigate(`/postPage/${result.data.postId}/${result.data.postId}`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container write">
      <div className="content">
        <div className="row">
          <div className="col-2 d-none d-lg-block"></div>
          <div className="col-12 col-lg-6">
            <div className="author">
              <span className="author-name">
                {user.name}
              </span>
            </div>

            <textarea ref={textAreaRef} rows="10" 
              placeholder="自言自語是最棒的"
              className="textArea"
              onClick={onClickHandler}
              onBlur={onBlurHandler}
              onInput={onInputHandler}/>

            <div className="post-tags">
              <div className="post-tag">
                <input ref={tagRef} className="post-input"/>
              </div>
              <span ref={submitIconRef} className="material-symbols-outlined"
                onClick={submitHandler}>
                send
              </span>
            </div>

            <div className="divider"/>
            
          </div>
          <div className="col-2 d-none d-lg-block"></div>
        </div>
      </div>
    </div>
  )
}

export default Write