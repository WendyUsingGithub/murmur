import MobileNavbar from "./mobileNavbar";
import DesktopNavbar from "./desktopNavbar.jsx";

function Navbar() {
  const width = window.innerWidth;
  if (width >= 992) return <DesktopNavbar/>;
  else return <MobileNavbar/>;
}

export default Navbar;