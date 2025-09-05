import {Route, Routes, BrowserRouter, useLocation} from "react-router-dom";
import {CSSTransition, SwitchTransition} from 'react-transition-group';
import "../../bootstrap/bootstrap.css";
import "../../bootstrap/bootstrap.js";
import "./style.css";
import Auth from "./auth/Auth.jsx";
import Navbar from "./navbar/Navbar.jsx";
import Feed from "./feed/Feed.jsx";
import Page from "./page/Page.jsx";
import Noti from "./page/Noti.jsx";
import Login from "./login/Login.jsx";
import User from "./user/user.jsx";
import Profile from "./profile/profile.jsx";
import Tag from "./tag/Tag.jsx";
import Write from "./write/Write.jsx";
import Notifications from "./notification/Notifications.jsx";

function App() {
  return (
    <Auth>
      <BrowserRouter>
        <div className="murmur first-load">
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
            <Route path="/page/:postId/:commentId" element={<Page/>}/>
            <Route path="/noti/:postId/:commentId/:scroll" element={<Noti/>}/>
            <Route path="/profile/:name" element={<Profile/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/write" element={<Write/>}/>
            <Route path="/tag/:tag" element={<Tag/>}/>
            <Route path="/user" element={<User/>}/>
            <Route path="/notification" element={<Notifications/>}/>
          </Routes>
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
}

export default App;

