import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../../bootstrap/bootstrap.css";
import "../../bootstrap/bootstrap.js";
import "./style.css";
import Navbar from "./Navbar.jsx";
import Feed from "./feed/Feed.jsx";
import Login from "./login/Login.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="murmur feed">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Feed/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
