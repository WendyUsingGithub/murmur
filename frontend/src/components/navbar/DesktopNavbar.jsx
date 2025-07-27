import {Link} from "react-router-dom";
import {useState, useRef, useEffect} from "react";
import "./navbar.css";

function DesktopNavbar() {
  const navbarRef = useRef(null);
  const prevScrollY = useRef(window.scrollY);
  const [visibility, setVisibility] = useState("navbarShow");

  function scrollHandler() {
    let currentScrollY = window.scrollY;
    if (navbarRef.current) {
      if (prevScrollY.current >= currentScrollY) {
        setVisibility("navbarShow");
      } else {
        setVisibility("navbarHide");
      }
    }
    prevScrollY.current = currentScrollY;
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <div ref={navbarRef} className={`navbar ${visibility}`}>
      <Link to="/" className="logo">
          <span className="material-symbols-outlined">pentagon</span>
      </Link>
      <span className="icons_desktop center-alignment-horizontal">
        {/* <form className="search">
          <input onBlur={(e)=>{e.target.value="";}} type="search" required />
          <div className="item icon center-alignment">
            <span className="material-symbols-outlined">search</span>
          </div>
        </form> */}
        <Link to="/write">
          <div className="icon center-alignment">
            <span className="material-symbols-outlined">keep</span>
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

export default DesktopNavbar;
