import "../../bootstrap/bootstrap.css";
import "../../bootstrap/bootstrap.js";
import "./style.css";
import "./js.js";

function Navbar() {
  return(
    <div id="navbar" className="navbar">
    <a href="file:///C:/Users/ASUS/Desktop/murmur/feed.html" className="logo">m</a>
    <span className="items center-alignment-horizontal">
        <form className="search ">
        <input onBlur={(e) => {e.target.value = ""}} type="search" required></input>
        <div className="item icon center-alignment">
            <span style = {{scale:"1.1"}} className="material-symbols-outlined">
              search
            </span>
        </div>       
        </form>  
        <a href="markdown.html" className="item center-alignment">
        <div className="icon">
            <span className="material-symbols-outlined">
              stylus
            </span>
        </div>
        </a>
        <a href="markdown.html" className="item center-alignment">
        <div className="icon">
            <span className="material-symbols-outlined">
              for_you
            </span>
        </div>
        </a>  
    </span>
    </div>
  )
}

export default Navbar

