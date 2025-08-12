import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import "../style.css";
import "./login.css";

import Loader from "../loader/Loader.jsx"
import AuthContext from "../auth/AuthContext.jsx";

import {useContext, useState, useRef, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Login() {
  const {user, setUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const [active, setActive] = useState("left");
  const [indicatorPos, setIndicatoPos] = useState("left");
  const [focus, setFocus] = useState([[null, null], [null, null, null]]);
  const [loginVisibility, setLoginVisibility] = useState("show");
  const [registerVisibility, setRegisterVisibility] = useState("hide");

  const loginMailRef = useRef(null);
  const loginPasswordRef = useRef(null);
  const registerNameRef = useRef(null);
  const registerMailRef = useRef(null);
  const registerPasswordRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [signIn, setSignIn] = useState(false);


  useEffect(() => {
    function checkAuth() {
      if(user) setSignIn(true);
      setLoading(false);
    }
    setLoading(true);
    checkAuth();
  }, []);

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

  function inputOnClickHandler(event) {
    let value = event.currentTarget.dataset.value;
    if(active === "left") {
      if(value === "mail") setFocus((prev) => [["focus", prev[0][1]], [...prev[1]]]);
      else setFocus((prev) => [[prev[0][0], "focus"], [...prev[1]]]);
    }
    else {
      if(value === "name") setFocus((prev) => [[...prev[0]], ["focus", prev[1][1], prev[1][2]]]);
      else if(value === "mail") setFocus((prev) => [[...prev[0]], [prev[1][0], "focus", prev[1][2]]]);
      else setFocus((prev) => [[...prev[0]], [prev[1][0], prev[1][1], "focus"]]);
    }
  }

  function inputOnBlurHandler(event) {
    let value = event.currentTarget.dataset.value;
    let input = event.currentTarget.value;

    if(input.trim() != "") return;

    if(active === "left") {
      if(value === "mail") setFocus((prev) => [ [null, prev[0][1]], [...prev[1]]]);
      else setFocus((prev) => [ [prev[0][0], null], [...prev[1]]]);
    }
    else {
      if(value === "name") setFocus((prev) => [[...prev[0]], [null, prev[1][1], prev[1][2]]]);
      else if(value === "mail") setFocus((prev) => [[...prev[0]], [prev[1][0], null, prev[1][2]]]);
      else setFocus((prev) => [[...prev[0]], [prev[1][0], prev[1][1], null]]);
    }
  }

  async function loginHandler(event) {
    event.preventDefault();
    const mail = loginMailRef.current.value;
    const password = loginPasswordRef.current.value;
    const loginData = {mail, password};
    
    if(!mail || !password) {
      console.log("input missing");
      return;
    }

    try {
      setLoading(true);
      const result = await axios.post("http://1.34.178.127:5555/login", loginData, {withCredentials: true});
      console.log(result);
      console.log(result.data)
      if(result.status==200) {
        setUser(result.data);
        console.log(user)
        navigate("/");
      }
      else {
        navigate("/login");    
      }
      localStorage.setItem("murmurToken", JSON.stringify({name: result.data.name, ID: result.data.ID}));
    } catch (error) {
      console.log(error);
      console.log("Login Fail");
      navigate("/login"); 
    } finally {
      setLoading(false);
    }
  }

  async function registerHandler(event) {
    event.preventDefault();
    const name = registerNameRef.current.value;
    const mail = registerMailRef.current.value;
    const password = registerPasswordRef.current.value;
    const registerData = {name, mail, password};

    if(!name || !mail || !password) {
      console.log("input missing")
      return;
    }

    try {
      setLoading(true);

      const result = await axios.post("http://1.34.178.127:5555/register", registerData, {withCredentials: true});
      console.log(result.data.name)
      console.log(result.data.ID)

      setSignIn(true);
      setUser(result.data);
      console.log(user)
      navigate("/");
    } catch (error) {
      console.log("Login Fail");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }

  return(
    <Loader loading={loading} signIn={signIn} navigate="/user">
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
                              data-value="name"
                              ref={registerNameRef}
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
    </Loader>
  )
}

export default Login

