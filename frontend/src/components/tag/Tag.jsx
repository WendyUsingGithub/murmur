import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import "../style.css";

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
          </div>
          <div className="col-12 col-lg-6">
            <SearchByField type="post" field="tag" target={tag}/>
          </div>
          <div className="col-2 d-none d-lg-block">
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tag;