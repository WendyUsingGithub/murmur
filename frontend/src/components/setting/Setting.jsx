import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import "../style.css";
import "./setting.css";

import Loader from "../loader/Loader.jsx"
import AuthContext from "../auth/AuthContext.jsx";

import {useContext, useState, useRef, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Setting() {
  const {user, setUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const [active, setActive] = useState("left");
  const [focus, setFocus] = useState([[null, null], [null, null, null]]);

  const nameZHRef = useRef(null);
  const textAreaRef = useRef(null);

  const [nameZHInitial, setNameZHInitial] = useState("")
  const [introductionInitial, setIntroductionInitial] = useState("")

  const [loading, setLoading] = useState(true);
  const [signIn, setSignIn] = useState(false);

  useEffect(() => {
    function checkAuth() {
      if(user) setSignIn(true);
      setLoading(false);
    }
    setLoading(true);
    checkAuth();

    async function fetchAuthorData() {
      try {
        const result = await axios.post("http://1.34.178.127:5555/authorData", {author: user.name});
        setNameZHInitial(result.data.nameZH);
        setIntroductionInitial(result.data.introduction);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAuthorData();
    
  }, []);


//   function onInputHandler(event) {
//     const textArea = event.currentTarget;
//     const textAreaValue = event.currentTarget.value.trim();
//     // const submitIcon = submitIconRef.current;

//     textArea.style.height = "auto";
//     textArea.style.height = `${textArea.scrollHeight}px`;

//   }

//   function onClickHandler(event) {
//     const textArea = event.currentTarget.value.trim();
//     // const submitIcon = submitIconRef.current;
  
//   }

//   function onBlurHandler(event) {
//     const textArea = event.currentTarget.value.trim();
//     // const submitIcon = submitIconRef.current;

//   }

//   function inputOnClickHandler(event) {
//     let value = event.currentTarget.dataset.value;
//     if(active === "left") {
//       if(value === "mail") setFocus((prev) => [["focus", prev[0][1]], [...prev[1]]]);
//       else setFocus((prev) => [[prev[0][0], "focus"], [...prev[1]]]);
//     }
//     else {
//       if(value === "name") setFocus((prev) => [[...prev[0]], ["focus", prev[1][1], prev[1][2]]]);
//       else if(value === "mail") setFocus((prev) => [[...prev[0]], [prev[1][0], "focus", prev[1][2]]]);
//       else setFocus((prev) => [[...prev[0]], [prev[1][0], prev[1][1], "focus"]]);
//     }
//   }

//   async function loginHandler(event) {
//     event.preventDefault();
//     const mail = loginMailRef.current.value;
//     const password = loginPasswordRef.current.value;
//     const loginData = {mail, password};
    
//     if(!mail || !password) {
//       console.log("input missing");
//       return;
//     }

//   //   try {
//   //     setLoading(true);
//   //     const result = await axios.post("http://1.34.178.127:5555/login", loginData, {withCredentials: true});
//   //     console.log(result);
//   //     console.log(result.data)
//   //     if(result.status==200) {
//   //       setUser(result.data);
//   //       console.log(user)
//   //       navigate("/");
//   //     }
//   //     else {
//   //       navigate("/login");    
//   //     }
//   //     localStorage.setItem("murmurToken", JSON.stringify({name: result.data.name, ID: result.data.ID}));
//   //   } catch (error) {
//   //     console.log(error);
//   //     console.log("Login Fail");
//   //     navigate("/login"); 
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // }

//   // async function registerHandler(event) {
//   //   event.preventDefault();
//   //   const name = registerNameRef.current.value;
//   //   const mail = registerMailRef.current.value;
//   //   const password = registerPasswordRef.current.value;
//   //   const registerData = {name, mail, password};

//   //   if(!name || !mail || !password) {
//   //     console.log("input missing")
//   //     return;
//   //   }

//   //   try {
//   //     setLoading(true);

//   //     const result = await axios.post("http://1.34.178.127:5555/register", registerData, {withCredentials: true});
//   //     console.log(result.data.name)
//   //     console.log(result.data.ID)

//   //     setSignIn(true);
//   //     setUser(result.data);
//   //     console.log(user)
//   //     navigate("/");
//   //   } catch (error) {
//   //     console.log("Login Fail");
//   //     navigate("/login");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // }
// }

  return(
    // <Loader loading={loading} signIn={signIn} navigate="/setting">
      <div className="login container setting">
        <div className="content">
          <div className="row">
            <div className="col-2 d-none d-lg-block"></div>
            <div className="col-12 col-lg-6">
   
              <div> 
                <div className="actions">

                  <div>
                    <form className="inputs">

                      <div className="title">中文名</div>
                      <div className="input">
                        <input ref={nameZHRef}
                          type="text" required=""
                          defaultValue={nameZHInitial}
                          placeholder="ddefdfefgefgrfrfef"/>
                        <label htmlFor="input" className="label"></label>
                      </div>

                      <div className="title">自我介紹</div>
                        <textarea ref={textAreaRef} rows="10"
                          defaultValue={introductionInitial}
                          placeholder="自我介自我介紹自我介紹自我介紹自我介紹自我介紹自我介紹自我介紹自我介紹自我介紹紹"
                          className="textArea"/>
                    </form>

                    <div className="center-alignment">
                      <button className="submit">
                        <span className="material-symbols-outlined">
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </div>


                </div>
              </div>
           
            </div>
            <div className="col-2 d-none d-lg-block"></div>
          </div>
        </div>
      </div>
    // </Loader>
  )
}

export default Setting

