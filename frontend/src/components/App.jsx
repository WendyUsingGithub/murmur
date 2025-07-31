import {Route, Routes, BrowserRouter, useLocation} from "react-router-dom";
import {CSSTransition, SwitchTransition} from 'react-transition-group';
import "../../bootstrap/bootstrap.css";
import "../../bootstrap/bootstrap.js";
import "./style.css";
import Auth from "./auth/Auth.jsx";
import Navbar from "./navbar/Navbar.jsx";
import Feed from "./feed/Feed.jsx";
import PostPage from "./postPage/postPage.jsx";
import Login from "./login/Login.jsx";
import User from "./user/user.jsx";
import Author from "./author/author.jsx";
import Tag from "./tag/Tag.jsx";
import Write from "./write/Write.jsx";

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
            <Route path="/postPage/:postId/:commentId" element={<PostPage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/write" element={<Write/>}/>
            <Route path="/author/:author" element={<Author/>}/>
            <Route path="/tag/:tag" element={<Tag/>}/>
            <Route path="/user" element={<User/>}/>
          </Routes>
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
}

export default App;

