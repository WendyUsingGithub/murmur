import '../../bootstrap/bootstrap.css';
import '../../bootstrap/bootstrap.js';
import './feed.css';
import './style.css';

function Container()
{
  return(
    <div className="container">
      <div className="content">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
              <div className="middle">
                  Post
              </div>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </div>
  )
}

export default Container;