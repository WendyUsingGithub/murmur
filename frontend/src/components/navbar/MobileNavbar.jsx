import {Link} from "react-router-dom";
import {useRef, useEffect} from "react";
import "./navbar.css";

function MobileNavbar() {
  const navbarRef = useRef(null);
  const prevScrollY = useRef(window.scrollY);

  function scrollHandler() {
    let currentScrollY = window.scrollY
    prevScrollY.current = currentScrollY;
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <div ref={navbarRef} className="navbar">
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
