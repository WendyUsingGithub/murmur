import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import Posts from "./posts.jsx";
import "../style.css";

function Profile()
{
  return (
    <div className="container">
      <div className="content">
        <div className="row">
          <div className="col-2">
            <div className="post">
              <div className="author">
                <span className="author-name">
                  寶寶貓咪
                </span>
              </div>
              <p>
                我們不妨可以這樣來想:做好貓咪這件事，可以說已經成為了全民運動。<br />對貓咪進行深入研究，在現今時代已經無法避免了。我們不得不面對一個非常尷尬的事實，那就是，如果別人做得到，那我也可以做到。
              </p>
              <p>
                若無法徹底理解貓咪，恐怕會是人類的一大遺憾。
              </p>
            </div>
          </div>
          <div className="col-8">
            <div className="middle">
              <Posts/>
            </div>
          </div>
          <div className="col-2">
            <div className="right-panel">
              <p>
                我喜歡#可愛<br />家裡有#貓<br />我愛吃#乾乾<br />我討厭#窮
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

