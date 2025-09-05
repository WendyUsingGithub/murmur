import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import "../style.css";
import "./profile.css";

import SearchByField from "../searchByField/searchByField.jsx";

import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";

function Profile() {
  const {name} = useParams();
  const [data, setData] = useState(null);
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
    async function fetchProfileData() {
      try {
        const result = await axios.post("http://1.34.178.127:5555/profileData", {name});
        console.log("result", result);
        setData(result.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProfileData();
  }, [])
  
  if(data) {
    return(
      <div className="container profile login">
        <div className="content">
          <div className="row">
            <div className="col-12 col-lg-2">
              <div className="intro">
                <div className="header">
                  {data.nameZH}
                </div>
                <div className="subHeader">
                  {data.name}
                </div>
                <p>
                  {data.introduction}
                </p>
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
                    <SearchByField type="post" field="profile" target={name}/>
                  </div>

                  <div className={registerVisibility}>
                    <SearchByField type="comment" field="profile" target={name}/>
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
}

export default Profile

