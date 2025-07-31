import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import "../style.css";
import "./user.css";

import Loader from "../loader/Loader.jsx"
import AuthContext from "../auth/AuthContext.jsx";
import SearchByField from "../searchByField/searchByField.jsx";


import {useContext, useState, useRef, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function User() {
  const {user, setUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const [active, setActive] = useState("left");
  const [indicatorPos, setIndicatoPos] = useState("left");
  const [postVisibility, setPostVisibility] = useState("show");
  const [commentVisibility, setCommentVisibility] = useState("hide");


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
      setPostVisibility(value === "left" ? "show" : "hide");
      setCommentVisibility(value === "right" ? "show" : "hide");
    }
  }
  function mouseEnterHandler(event) {
    setIndicatoPos(event.currentTarget.dataset.value);
  }
  function mouseLeaveHandler() {
    setIndicatoPos(active);
  }

  return(

    <div className="container user login">
      <div className="content">
        <div className="row">
          <div className="col-2 d-none d-lg-block">
            <div className="left-panel">
              <div className="post">
                <div className="author">
                  <div className="header">
                    三花貓
                  </div>
                  <div className="subHeader">
                    {user.name}
                  </div>   
                </div>
                
                <p>
                  三花血統，思想複雜如我的毛色。我的人生哲學是：每一條貓毛都有其位置，每一次踩踏都是一次結構批判。
                </p>
                
                <p>
                  我不是故意在凌晨三點衝刺走廊，我是在證明慣性可以打破時間的虛假安寧。我不是挑食，我是在進行口腹感官的純粹實驗——在雞肉與鮪魚泥之間追問自由意志的邊界。我不服從命令，不是叛逆，而是抵抗命令本身作為語言暴力的可能性。
                </p>
                <p>
                  別期待我回應呼喚，我不是來討好你們的。我是來提醒這個世界：秩序，是可以從一隻貓的尾巴開始崩塌的。
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

                <div className={postVisibility}>
                  <SearchByField type="post" field="author" target={user.name}/>
                </div>

                <div className={commentVisibility}>
                  <SearchByField type="comment" field="author" target={user.name}/>
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

export default User

