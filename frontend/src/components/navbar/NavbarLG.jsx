import {Link, useLocation} from "react-router-dom";
import "./navbar.css";

function NavbarLG() {
  const location = useLocation();

  return (
    <div className="navbar">
      <Link to="/" className="logo">
          <span className={`material-symbols-outlined ${(location.pathname === "/") ? "fill" : ""}`}>adjust</span>
      </Link>
      <span className="icons center-alignment-horizontal">
        <Link to="/notification">
          <div className="icon center-alignment">
            <span className={`material-symbols-outlined ${location.pathname.startsWith("/notification") ? "fill" : ""}`}>keep</span>
          </div>
        </Link>

        <Link to="/write">
          <div className="icon center-alignment">
            <span className={`material-symbols-outlined ${location.pathname.startsWith("/write") ? "fill" : ""}`}>stylus</span>
          </div>
        </Link>
        
        <Link to="/login">
          <div className="icon center-alignment">
             <span className={`material-symbols-outlined ${(location.pathname.startsWith("/login") || location.pathname.startsWith("/user")) ? "fill" : ""}`}>for_you</span>
          </div>
        </Link>
      </span>
    </div>
  );
}

export default NavbarLG;
