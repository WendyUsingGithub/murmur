import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import "../style.css";
// import "./profile.css"

import {useContext} from "react";
import AuthContext from "../auth/AuthContext";
import {useParams} from "react-router-dom";
import SearchByField from "../searchByField/searchByField.jsx";

function Tag() {
  const {user} = useContext(AuthContext);
  const {tag} = useParams();
  console.log("user", user);

  return (
    <div className="container profile">
      <div className="content">
        <div className="row">
          <div className="col-2 d-none d-lg-block">

          <div className="left-panel">
            <div className="post">
              <div className="author">
                <span className="author-name">
                  三花貓貓
                </span>
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
            {/* {user.name}
            {user.ID} */}
            <SearchByField type="post" field="tag" target={tag}/>
          </div>
          <div className="col-2 d-none d-lg-block">
            <div className="right-panel">
              <div className="tags">
                <p>
                  我喜歡#可愛<br/>家裡有#貓<br/>我愛吃#乾乾<br/>我討厭#窮
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tag;