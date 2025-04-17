import {useRef} from "react"
import { useState, useEffect } from "react";
import axios from "axios";

import "../../../bootstrap/bootstrap.css";
import "../../../bootstrap/bootstrap.js";
import "../style.css";
import "./write.css";

function Write()
{
  // const submitIconRef = useRef(null);
  // const contentRef = useRef(null);
  // const tagRef  = useRef(null);
  // const [loading, setLoading] = useState(false);
  // const tempJson = JSON.parse(localStorage.getItem("murmurToken"));
  // const name = tempJson.userName ? tempJson.userName : "bitter";

  // function onInputHandler(event) {
  //   event.currentTarget.style.height = "auto";
  //   event.currentTarget.style.height = event.currentTarget.scrollHeight + "px";

  //   if (event.currentTarget.value.trim() === "") {
  //     submitIconRef.current.classList.remove("active");
  //     submitIconRef.current.classList.add("empty");
  //   } else {
  //     submitIconRef.current.classList.add("active");
  //   }
  // }

  // function onFocusHandler(event) {
  //   if (event.currentTarget.value.trim() === "") {
  //     submitIconRef.current.classList.add("empty");
  //   } else {
  //     submitIconRef.current.classList.add("active");
  //   }
  // }

  // function onBlurHandler() {
  //   submitIconRef.current.classList.remove("active");
  //   submitIconRef.current.classList.remove("empty");
  // }

  // async function onClickHandler() {
  //   setLoading(true);
  //   const content = contentRef.current.value;
  //   const tag = tagRef.current.value;
  //   const articleData = {author, content, tag};

  //   const result = await axios.post("http://localhost:3001/write", articleData);
  // }

  // const [postsData, setDatas] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const result = await axios.post("http://localhost:3001/post", { wendy: "wendy" });
    
  //       console.log("Fetch Data");
  //       console.log(result.data.length);
  //       console.log(result.data[0].author);
  //       console.log(result.data[0].content);

  //       let postsData = [];
  //       for(let i=0; i<result.data.length; i++) {
  //         const postData = 
  //         {
  //           id: i,
  //           author: result.data[i].author,
  //           content: result.data[i].content,
  //         }
  //         postsData.push(postData);
  //       }
  //       setDatas(postsData);
        
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  //   fetchData();
  // }, []);

  // if(loading) {
  //   return (
  //     <div className="login container">
  //       <div className="content">
  //         <div className="row">
  //           <div className="col-2"></div>
  //           <div className="col-8 center-alignment">
  //             <div className="middle">
  //               <div className="loader fade-in"></div>
  //             </div>
  //             </div>
  //           <div className="col-2"></div>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }
  // else {
  //   return (
  //     <div className="container fade-in">
  //       <div className="content">
  //         <div className="row">
  //           <div className="col-2"></div>
  //           <div className="col-8">
  //             <div className="middle">
  //               <div className="write">
  //                 <div className="post">
  //                   <div id="author" className="author">
  //                     <span className="author-name">
  //                       {name}
  //                     </span>
  //                   </div>
  //                   <textarea ref={contentRef} className="content"
  //                     onInput={onInputHandler}
  //                     onFocus={onFocusHandler}
  //                     onBlur={()=>setTimeout(()=>onBlurHandler, 50)}
  //                     rows="1"
  //                     placeholder="寫點什麼">
  //                     </textarea>
  //                   <span ref={submitIconRef} className="material-symbols-outlined"
  //                     onClick={onClickHandler}>
  //                     send
  //                   </span>
  //                   <div id="post-tags" className="post-tags">
  //                     <span className="post-tag">
  //                       <input
  //                         ref={tagRef}
  //                         onInput={onInputHandler}
  //                         onFocus={onFocusHandler}
  //                         onBlur={()=>setTimeout(()=>onBlurHandler, 50)}
  //                         type="text"
  //                         maxLength="20"/>
  //                     </span>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="col-2"></div>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }
}


export default Write