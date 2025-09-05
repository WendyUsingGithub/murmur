import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import "../style.css";
import "./user.css";

import SearchByField from "../searchByField/searchByField.jsx";
import AuthContext from "../auth/AuthContext.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useState, useEffect, useContext} from "react";
import axios from "axios";

function User() {
  const navigate = useNavigate();
  const {setUser} = useContext(AuthContext);
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

  async function logoutHandler() {
    const result = await axios.get("http://1.34.178.127:5555/logout", {withCredentials: true});
    console.log("result", result);
    if(result) {
      setUser(null);
      // 顯示成功登出 1秒
      navigate("/login");
    }
  }

  useEffect(() => {
    async function fetchAuthorData() {
      try {
        const res = await axios.get("http://1.34.178.127:5555/auth", {withCredentials: true});
        const result = await axios.post("http://1.34.178.127:5555/profileData", {name: res.data.name});
        setData(result.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAuthorData();
  }, [])

  

  if(data) {
    return(
      <div className="container user login">
        <div className="content">
          <div className="row">
            <div className="col-12 col-lg-2">
              <div className="intro">
           
                <div className="row header">
                  <div className="col">
                    <div className="name">
                      {data.nameZH}
                    </div>
                    <div className="nameZH">
                      {data.name}
                    </div>
                  </div>  
                  
                  <div className="col logout-sm">
                      <Link to="/login">
                        <span className="material-symbols-outlined" onClick={logoutHandler}>chip_extraction</span>
                      </Link>
                  </div>                
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
                    <SearchByField type="post" field="author" target={data.name}/>
                  </div>

                  <div className={registerVisibility}>
                    <SearchByField type="comment" field="author" target={data.name}/>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-2 d-none d-lg-block"></div>
          </div>
        </div>

        <div className="logout-lg center-alignment-horizontal">
          <Link to="/login">
            <div className="icon center-alignment" onClick={logoutHandler}>
              <span className="material-symbols-outlined">chip_extraction</span>
            </div>
          </Link>
        </div>
      </div>
    )    
  }
  else {
    return (
      <div className="container">
        <div className="content">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8 center-alignment">
              <div className="middle">
                <div className="loader"></div>
              </div>
              </div>
            <div className="col-2"></div>
          </div>
        </div>
      </div>
    )
  }

}

export default User