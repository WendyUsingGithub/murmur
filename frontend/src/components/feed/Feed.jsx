import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import FeedPosts from "./feedPosts.jsx";
import "../style.css";

function Feed() {
  return (
    <div className="container feed">
      <div className="content">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <div className="middle">
              <FeedPosts/>
            </div>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </div>
  );
}

export default Feed;

