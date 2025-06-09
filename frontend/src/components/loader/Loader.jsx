import PropTypes from "prop-types";
import {Navigate} from "react-router-dom";
import {useState, useEffect} from "react";

import "./loader.css";

function Loader({loading, signIn, children, navigate}) {
  // console.log("loading signIn", loading, signIn);
  
  const [withinOneSecond, setWithinOneSecond] = useState(true);

  useEffect(() => {
    if (loading) {
      setWithinOneSecond(true);
      setTimeout(() => {
        setWithinOneSecond(false);
      }, 1000);
    }
  }, []);

  if (loading) {
    if(withinOneSecond) {
      return (
        <div className="container">
          <div className="content">
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="container">
          <div className="content">
            <div className="row">
              <div className="col-2"></div>
              <div className="col-8 center-alignment">
                <div className="middle">
                  <div className="loader"></div>
                </div>
                </div>
              <div className="col-2"></div>
            </div>
          </div>
        </div>
      );
    }
  }

  if (signIn && navigate) {
    return <Navigate to={navigate}/>;
  }

  return children;
}

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
  signIn: PropTypes.bool,
  children: PropTypes.node.isRequired,
  navigate: PropTypes.string
};

export default Loader;