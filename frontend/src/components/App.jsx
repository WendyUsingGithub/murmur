import "../../bootstrap/bootstrap.css";
import "../../bootstrap/bootstrap.js";
import "./App.css";
import "./style.css";
import "./js.js";

import Navbar from "./Navbar.jsx";
import Container from "./Container.jsx";

function App()
{
  return (
    <div className="murmur feed">
      <Navbar/>
      <Container/>
    </div>
  )
}

export default App