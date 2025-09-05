import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import "../style.css";

import {useState, useEffect} from "react";
import axios from "axios";
import Post from "../post/Post.jsx";

function Feed() {
  const [postsData, setDatas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.post("http://1.34.178.127:5555/feed", {wendy:"wendy"}, {withCredentials: true});
        setDatas(result.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container feed">
      <div className="content">
        <div className="row">
          <div className="col-2 d-none d-lg-block"></div>
          <div className="col-12 col-lg-6">
            <div className="posts">
              {postsData.map((postData) =>
                <Post key={postData.postId} PostData={postData}/>
              )}
            </div>
          </div>
          <div className="col-2 d-none d-lg-block"></div>
        </div>
      </div>
    </div>
  );
}

export default Feed