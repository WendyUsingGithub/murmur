import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import "./notification.css";
import "../style.css";

import {useContext, useState, useEffect} from "react";
import axios from "axios";
import Notification from "./Notification.jsx";
import AuthContext from "../auth/AuthContext.jsx";

function Notifications() {
  const {user} = useContext(AuthContext);
  const [notificationsData, setDatas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.post("http://1.34.178.127:5555/notifications", {wendy:"wendy"}, {withCredentials: true});
        setDatas(result.data);
      } catch (err) {
        console.error(err);
      }
    }
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  if(user) {
    return (
      <div className="container notification">
        <div className="content">
          <div className="row">
            <div className="col-2 d-none d-lg-block"></div>
            <div className="col-12 col-lg-6">
              <div>          
                {notificationsData.map((notificationData) =>
                  <Notification key={notificationData.postId} notificationData={notificationData}/>
                )}
              </div>
            </div>
            <div className="col-2 d-none d-lg-block"></div>
          </div>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="container notification">
        <div className="content">
          <div className="row">
            <div className="col-2 d-none d-lg-block"></div>
            <div className="col-12 col-lg-6">
              <div>
                <div className="author">
                  <span className="author-name">
                    Stranger
                  </span>
                </div>
                <div className="yourContent single-line">
                  <p>登入後才有通知哦</p>
                </div>
                <div className="hisContent single-line">
                  <p>登入後才有通知哦</p>
                </div>
                <div className="divider"></div>
              </div>
            </div>
            <div className="col-2 d-none d-lg-block"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Notifications