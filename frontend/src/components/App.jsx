import {Route, Routes, BrowserRouter, useLocation} from "react-router-dom";
import {CSSTransition, SwitchTransition} from 'react-transition-group';
import "../../bootstrap/bootstrap.css";
import "../../bootstrap/bootstrap.js";
import "./style.css";
import Auth from "./auth/Auth.jsx";
import Navbar from "./Navbar.jsx";
import Feed from "./feed/Feed.jsx";
import Login from "./login/Login.jsx";
import Profile from "./profile/Profile.jsx";
import PostComment from "./postComment/postComment.jsx";
import Write from "./write/Write.jsx";

import './index.css';

function App() {
  return (
    <Auth>
      <BrowserRouter>
        <div className="murmur">
          <Navbar/>
          <RoutesLocation/>
        </div>
      </BrowserRouter>
    </Auth>
  );
}

function RoutesLocation() {
  const location = useLocation();
  return (
    <SwitchTransition>
      <CSSTransition key={location.pathname} classNames="forward" timeout={300}>
        <div>
          <Routes location={location}>
            <Route path="/" element={<Feed/>}/>
            <Route path="/postComment/:id" element={<PostComment/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/write" element={<Write/>}/>
          </Routes>
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
}

export default App;

