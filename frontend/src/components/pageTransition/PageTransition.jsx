import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "../components/PageTransition.css";

function PageTransition({path, children }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (path) {
      setFadeOut(true);
      const timer = setTimeout(() => setRedirect(true), 300); // 跟動畫一致
      return () => clearTimeout(timer);
    }
  }, [path]);

  if (redirect) {
    return <Navigate to={path} />;
  }

  return (
    <div className={{fadeInOut}}>
      {children}
    </div>
  );
}

PageTransition.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}
export default PageTransition;