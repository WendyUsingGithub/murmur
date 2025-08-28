// import {PostDataFrontEnd} from "../frontEndClass.js";
// import "../style.css";
// import "./feedPosts.css";

import {useState, useEffect} from "react";
import axios from "axios";
// import Post from "../post/Post.jsx";

function Notification() {
  // const [notificationsData, setDatas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.post("http://1.34.178.127:5555/notifications", {wendy:"wendy"}, {withCredentials: true});
        console.log("RESULT", result);

        // let notificationsData = [];
        // for(let i=0; i<result.data.length; i++) {
        //   const notificationData = new PostDataFrontEnd(result.data[i]);
        //   notificationsData.push(notificationData);
        //   console.log("notificationData", notificationData);
        // }
        // setDatas(notificationsData);
        
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {/* {notificationsData.map((notificationData) =>
        <Post key={notificationData.postId} PostDataFrontEnd={notificationData}/>
      )} */}
    </div>
  )
}

export default Notification