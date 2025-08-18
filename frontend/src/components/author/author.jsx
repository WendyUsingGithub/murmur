import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import "../style.css";
import "./author.css";

import AuthContext from "../auth/AuthContext.jsx";
import SearchByField from "../searchByField/searchByField.jsx";

import {useParams} from "react-router-dom";
import {useContext, useState, useRef, useEffect} from "react";
import axios from "axios";

function Author() {
  // const {user, setUser} = useContext(AuthContext);
  const {author} = useParams();
  const [nameZH, setNameZH] = useState(null)
  const [introduction, setIntroduction] = useState(null)
  const [active, setActive] = useState("left");
  const [indicatorPos, setIndicatoPos] = useState("left");
  const [loginVisibility, setLoginVisibility] = useState("show");
  const [registerVisibility, setRegisterVisibility] = useState("hide");

  function onClickHandler(event) {
    let value = event.currentTarget.dataset.value;
    if (value !== active) {
      setActive(value);
      setIndicatoPos(value);
      setLoginVisibility(value === "left" ? "show" : "hide");
      setRegisterVisibility(value === "right" ? "show" : "hide");
    }
  }
  function mouseEnterHandler(event) {
    setIndicatoPos(event.currentTarget.dataset.value);
  }
  function mouseLeaveHandler() {
    setIndicatoPos(active);
  }

  useEffect(() => {
    async function fetchAuthorData() {
      try {
        const result = await axios.post("http://1.34.178.127:5555/authorData", {author: author});
        setNameZH(result.data.nameZH);
        setIntroduction(result.data.introduction);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAuthorData();
  })
  return(

    <div className="container author login">
      <div className="content">
        <div className="row">
          <div className="col-2 d-none d-lg-block">
            <div className="left-panel">
              <div className="post">
                <div className="header">
                  {nameZH}
                </div>
                <div className="subHeader">
                  {author}
                </div>  
                <p>
                  {introduction}
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div> 
              <div className="actions">
                <button className="action"
                  data-value="left"
                  onClick={onClickHandler}
                  onMouseEnter={mouseEnterHandler}
                  onMouseLeave={mouseLeaveHandler}>
                  <span>文章</span>
                </button>
                <button className="action"
                  data-value="right"
                  onClick={onClickHandler}
                  onMouseEnter={mouseEnterHandler}
                  onMouseLeave={mouseLeaveHandler}>
                  <span>回覆</span>
                </button>
                <div className={`indicator ${indicatorPos}`}></div>

                <div className={loginVisibility}>
                  <SearchByField type="post" field="author" target={author}/>
                </div>

                <div className={registerVisibility}>
                  <SearchByField type="comment" field="author" target={author}/>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-2 d-none d-lg-block">
          </div>
        </div>
      </div>
    </div>
  )
}

export default Author

