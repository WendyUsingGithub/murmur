import {Link} from "react-router-dom";
import {useRef, useEffect} from "react";
import "../../bootstrap/bootstrap.css";
import "../../bootstrap/bootstrap.js";
import "./navbar.css";

function Navbar() {
  const navbarRef = useRef(null);
  const prevScrollY = useRef(window.scrollY);

  function scrollHandler() {
    let currentScrollY = window.scrollY;
    if (navbarRef.current) {
      if (prevScrollY.current >= currentScrollY) {
        navbarRef.current.classList.remove("navbarHide");
        navbarRef.current.classList.add("navbarShow");
      } else {
        navbarRef.current.classList.remove("navbarShow");
        navbarRef.current.classList.add("navbarHide");
      }
    }
    prevScrollY.current = currentScrollY;
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <div ref={navbarRef} className="navbar show">
      <Link to="/" className="logo">m</Link>
      <span className="items center-alignment-horizontal">
        <form className="search">
          <input onBlur={(e)=>{e.target.value="";}} type="search" required />
          <div className="item icon center-alignment">
            <span style={{scale: "1.1"}} className="material-symbols-outlined">
              search
            </span>
          </div>
        </form>
        <Link to="/write" className="item center-alignment">
          <div className="icon">
            <span className="material-symbols-outlined">stylus</span>
          </div>
        </Link>
        <Link to="/login" className="item center-alignment">
          <div className="icon">
            <span className="material-symbols-outlined">for_you</span>
          </div>
        </Link>
      </span>
    </div>
  );
}

export default Navbar;
