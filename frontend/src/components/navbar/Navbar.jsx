import NavbarSM from "./NavbarSM";
import NavbarLG from "./NavbarLG.jsx";

function Navbar() {
  const width = window.innerWidth;
  if (width >= 992) return <NavbarLG/>;
  else return <NavbarSM/>;
}

export default Navbar;