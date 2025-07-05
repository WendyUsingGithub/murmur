import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import "../style.css";

import {useContext} from "react";
import AuthContext from "../auth/AuthContext";


function Profile() {
  const {user} = useContext(AuthContext);
  console.log("user", user);

  return (
    <div className="container feed">
      <div className="content">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <div className="middle">
              {user.name}
              {user.ID}
            </div>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

