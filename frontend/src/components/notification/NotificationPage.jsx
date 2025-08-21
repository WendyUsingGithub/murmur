import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import Notifications from "./Notifications.jsx";
import "../style.css";

function NotificationPage() {
  return (
    <div className="container feed">
      <div className="content">
        <div className="row">
          <div className="col-2 d-none d-lg-block"></div>
          <div className="col-12 col-lg-6">
            <Notifications/>
          </div>
          <div className="col-2 d-none d-lg-block"></div>
        </div>
      </div>
    </div>
  );
}

export default NotificationPage;