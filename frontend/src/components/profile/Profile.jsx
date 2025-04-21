import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import "../style.css";

function Profile() {
  return (
    <div className="login container">
      <div className="content">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8 center-alignment">
            <div className="middle">
              <div>Profile {name}</div>
            </div>
            </div>
          <div className="col-2"></div>
        </div>
      </div>
    </div>
  )
}

export default Profile

