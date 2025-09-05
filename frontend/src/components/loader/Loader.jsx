import PropTypes from "prop-types";
import {Navigate} from "react-router-dom";
import {useState, useEffect} from "react";

import "./loader.css";

function Loader({loading, signIn, navigate, children}) {  
  const [withinOneSecond, setWithinOneSecond] = useState(true);

    useEffect(() => {
    let timer;
    if (loading) {
      setWithinOneSecond(true);
      timer = setTimeout(() => setWithinOneSecond(false), 1500);
    } else {
      setWithinOneSecond(true);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  if (signIn && navigate) {
    return <Navigate to={navigate}/>;
  }
  else if (loading && withinOneSecond) {
    return (
      <div className="container">
        <div className="content">
        </div>
      </div>
    );
  }
  else if(loading && !withinOneSecond){
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
    )
  }
  else {
    return children;
  }
}

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
  signIn: PropTypes.bool,
  navigate: PropTypes.string,
  children: PropTypes.node,
};

export default Loader;