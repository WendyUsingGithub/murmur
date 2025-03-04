import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import Posts from "./posts.jsx";
import "../style.css";

function Feed()
{
  return (
    <div className="container">
      <div className="content">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <div className="middle">
              <Posts/>
            </div>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
