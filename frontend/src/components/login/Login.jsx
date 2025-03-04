import { useState} from "react";

import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import "./login.css";

function Login()
{
  const [active, setActive] = useState("left");
  const [indicatorPos, setIndicatoPos] = useState("left");
  const [focus, setFocus] = useState([[null, null], [null, null, null]]);
  const [loginVisibility, setLoginVisibility] = useState("show");
  const [registerVisibility, setRegisterVisibility] = useState("hide");

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
                          <input type="text" required=""
                            data-value="mail"
                            onClick={inputOnClickHandler}
                            onBlur={inputOnBlurHandler}/>
                          <label htmlFor="input" className="label">信箱</label>
                        </div>
                        <div className={`input ${focus[0][1]}`}>
                          <input type="text" required=""
                            data-value="password"
                            onClick={inputOnClickHandler}
                            onBlur={inputOnBlurHandler}/>
                          <label htmlFor="input" className="label">密碼</label>
                        </div>
                      </form>
                      <div className="center-alignment">
                        <button className="submit">
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
                            onClick={inputOnClickHandler}
                            onBlur={inputOnBlurHandler}/>
                          <label htmlFor="input" className="label">名稱</label>
                        </div>
                        <div className={`input ${focus[1][1]}`}>
                          <input type="text" required=""
                            data-value="mail"
                            onClick={inputOnClickHandler}
                            onBlur={inputOnBlurHandler}/>
                          <label htmlFor="input" className="label">信箱</label>
                        </div>
                        <div className={`input ${focus[1][2]}`}>
                          <input type="text" required=""
                            data-value="password"
                            onClick={inputOnClickHandler}
                            onBlur={inputOnBlurHandler}/>
                          <label htmlFor="input" className="label">密碼</label>
                        </div>
                      </form>
                      <div className="center-alignment">
                        <button className="submit">
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

export default Login

