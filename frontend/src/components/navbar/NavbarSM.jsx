import {Link, useLocation} from "react-router-dom";
import {useState, useRef, useEffect} from "react";
import "./navbar.css";

function NavbarSM() {
  const location = useLocation();
  const navbarRef = useRef(null);
  const [visible, setVisible] = useState("navbarShow");
  const [initialHeight, setInitialHeight] = useState(null);

  useEffect(() => {
    if (!window.visualViewport) return;
    setInitialHeight(window.visualViewport.height);

    function handleResize() {
      const currentHeight = window.visualViewport.height;
      if (currentHeight < initialHeight * 0.8) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    }
    
    window.visualViewport.addEventListener("resize", handleResize);
    return () => {
      window.visualViewport.removeEventListener("resize", handleResize);
    };
  }, [initialHeight]);


  return (
    <div ref={navbarRef} className={`navbar ${visible ? "navbarShow" : "navbarHide"}`}>
      <span className="icons center-alignment-horizontal">
        <Link to="/login">
          <div className="icon center-alignment">
            <span className="material-symbols-outlined">for_you</span>
          </div>
        </Link>

        <Link to="/notification">
          <div className="icon center-alignment">
            <span className="material-symbols-outlined">keep</span>
          </div>
        </Link>

        <Link to="/">
          <div className="icon center-alignment">
            <span  style={{scale:"1.1"}} className={`material-symbols-outlined ${(location.pathname === "/") ? "fill" : ""}`}>adjust</span>
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

export default NavbarSM;