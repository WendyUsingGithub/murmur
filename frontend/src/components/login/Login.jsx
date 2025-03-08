import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import "./login.css";

import {useState, useRef} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";


function Login()
{
  const navigate = useNavigate();

  const [active, setActive] = useState("left");
  const [indicatorPos, setIndicatoPos] = useState("left");
  const [focus, setFocus] = useState([[null, null], [null, null, null]]);
  const [loginVisibility, setLoginVisibility] = useState("show");
  const [registerVisibility, setRegisterVisibility] = useState("hide");

  const loginMailRef = useRef(null);
  const loginPasswordRef = useRef(null);
  const registerUserNameRef = useRef(null);
  const registerMailRef = useRef(null);
  const registerPasswordRef = useRef(null);

  const [loading, setLoading] = useState(false);

  function onClickHandler(event)
  {
    let value = event.currentTarget.dataset.value;
    if (value !== active) {
      setActive(value);
      setIndicatoPos(value);
      setLoginVisibility(value === "left" ? "show" : "hide");
      setRegisterVisibility(value === "right" ? "show" : "hide");
    }
  }
    function mouseEnterHandler(event)
  {
    setIndicatoPos(event.currentTarget.dataset.value);
  }
  function mouseLeaveHandler()
  {
    setIndicatoPos(active);
  }

  function inputOnClickHandler(event)
  {
    let value = event.currentTarget.dataset.value;

    if(active === "left") {
      if(value === "mail") setFocus((prev) => [["focus", prev[0][1]], [...prev[1]]]);
      else setFocus((prev) => [[prev[0][0], "focus"], [...prev[1]]]);
    }
    else {
      if(value === "username") setFocus((prev) => [[...prev[0]], ["focus", prev[1][1], prev[1][2]]]);
      else if(value === "mail") setFocus((prev) => [[...prev[0]], [prev[1][0], "focus", prev[1][2]]]);
      else setFocus((prev) => [[...prev[0]], [prev[1][0], prev[1][1], "focus"]]);
    }
  }

  function inputOnBlurHandler(event)
  {
    let value = event.currentTarget.dataset.value;
    let input = event.currentTarget.value;

    if(input.trim() != "") return;

    if(active === "left") {
      if(value === "mail") setFocus((prev) => [ [null, prev[0][1]], [...prev[1]]]);
      else setFocus((prev) => [ [prev[0][0], null], [...prev[1]]]);
    }
    else {
      if(value === "username") setFocus((prev) => [[...prev[0]], [null, prev[1][1], prev[1][2]]]);
      else if(value === "mail") setFocus((prev) => [[...prev[0]], [prev[1][0], null, prev[1][2]]]);
      else setFocus((prev) => [[...prev[0]], [prev[1][0], prev[1][1], null]]);
    }
  }

  async function loginHandler(event)
  {
    console.log("?????");
    event.preventDefault();

    const loginData = {
      email: loginMailRef.current.value,
      password: loginPasswordRef.current.value
    };

    setLoading(true);

    try {
      setLoading(true);
      // const res = await axios.post("http://127.0.0.1:3001/login", loginData);

      // localStorage.setItem("token", res.data.token);
      // setLoading(false);
      // navigate("/"); // 登入成功後導向 Feed 頁面

    } catch (error) {
      console.log("Login Fail");
    }
  }

  async function registerHandler(event)
  {
    // event.preventDefault();

    // const registerData = {
    //   username: registerUserNameRef.current.value,
    //   email: registerMailRef.current.value,
    //   password: registerPasswordRef.current.value
    // };

    // try {
    //   const res = await axios.post("http://127.0.0.1:3001/register", registerData);

    //   localStorage.setItem("token", res.data.token);
    //   navigate("/"); // 登入成功後導向 Feed 頁面
    // } catch (error) {
    //   console.log("Login Fail");
    // }
  }

  if(loading) {
    return(
      <div className="login container">
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
  else {
    return(
      <div className="login container">
        <div className="content">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              <div className="middle">
                <div> 
                  <div className="actions">
                    <button className="action"
                      data-value="left"
                      onClick={onClickHandler}
                      onMouseEnter={mouseEnterHandler}
                      onMouseLeave={mouseLeaveHandler}>
                      <span>登入</span>
                    </button>
                    <button className="action"
                      data-value="right"
                      onClick={onClickHandler}
                      onMouseEnter={mouseEnterHandler}
                      onMouseLeave={mouseLeaveHandler}>
                      <span>註冊</span>
                    </button>
                    <div className={`indicator ${indicatorPos}`}></div>

                    <div className={loginVisibility}>
                      <div className="slide-up">
                        <form className="inputs">
                          <div className={`input ${focus[0][0]}`}>
                            <input
                              type="text" required=""
                              data-value="mail"
                              ref={loginMailRef}
                              onClick={inputOnClickHandler}
                              onBlur={inputOnBlurHandler}/>
                            <label htmlFor="input" className="label">信箱</label>
                          </div>
                          <div className={`input ${focus[0][1]}`}>
                            <input
                              type="text" required=""
                              data-value="password"
                              ref={loginPasswordRef}
                              onClick={inputOnClickHandler}
                              onBlur={inputOnBlurHandler}/>
                            <label htmlFor="input" className="label">密碼</label>
                          </div>
                        </form>
                        <div className="center-alignment">
                          <button className="submit" onClick={loginHandler}>
                            <span className="material-symbols-outlined">
                              arrow_forward
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className={registerVisibility}>
                      <div className="slide-up">
                        <form className="inputs">
                          <div className={`input ${focus[1][0]}`}>
                            <input type="text" required=""
                              data-value="username"
                              ref={registerUserNameRef}
                              onClick={inputOnClickHandler}
                              onBlur={inputOnBlurHandler}/>
                            <label htmlFor="input" className="label">名稱</label>
                          </div>
                          <div className={`input ${focus[1][1]}`}>
                            <input type="text" required=""
                              data-value="mail"
                              ref={registerMailRef}
                              onClick={inputOnClickHandler}
                              onBlur={inputOnBlurHandler}/>
                            <label htmlFor="input" className="label">信箱</label>
                          </div>
                          <div className={`input ${focus[1][2]}`}>
                            <input type="text" required=""
                              data-value="password"
                              ref={registerPasswordRef}
                              onClick={inputOnClickHandler}
                              onBlur={inputOnBlurHandler}/>
                            <label htmlFor="input" className="label">密碼</label>
                          </div>
                        </form>
                        <div className="center-alignment">
                          <button className="submit" onClick={registerHandler}>
                            <span className="material-symbols-outlined">
                              arrow_forward
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login

