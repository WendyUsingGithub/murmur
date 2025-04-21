import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../../bootstrap/bootstrap.css";
import "../../bootstrap/bootstrap.js";
import "./style.css";
import Navbar from "./Navbar.jsx";
import Feed from "./feed/Feed.jsx";
import Login from "./login/Login.jsx";
import Profile from "./profile/Profile.jsx";
import Write from "./write/Write.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="murmur">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Feed/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/write" element={<Write/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
