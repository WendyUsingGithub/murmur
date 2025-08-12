import {Link} from "react-router-dom";
import {useState, useRef, useEffect} from "react";
import "./navbar.css";

function MobileNavbar() {
  const navbarRef = useRef(null);
  const [visibility, setVisibility] = useState("navbarShow");

  return (
    <div ref={navbarRef} className={`navbar ${visibility}`}>
      <span className="icons center-alignment-horizontal">
        <Link to="/write" className="search">
          <div className="icon center-alignment">
            <span className="material-symbols-outlined">search</span>
          </div>
        </Link>

        <Link to="/write">
          <div className="icon center-alignment">
            <span className="material-symbols-outlined">keep</span>
          </div>
        </Link>

        <Link to="/">
          <div className="icon center-alignment">
            <span className="material-symbols-outlined">pentagon</span>
          </div>
        </Link>
        
        <Link to="/write">
          <div className="icon center-alignment">
            <span className="material-symbols-outlined">stylus</span>
          </div>
        </Link>
        
        <Link to="/login">
          <div className="icon center-alignment">
            <span className="material-symbols-outlined">for_you</span>
          </div>
        </Link>
      </span>
    </div>
  );
}

export default MobileNavbar;