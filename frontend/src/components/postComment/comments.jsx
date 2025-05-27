// import propTypes from "prop-types"


function Comments({postId, content}) {
  console.log("Comments!!!");

  console.log(postId);
  console.log(content);

  // const [comments, setComments] = useState([]);

  // useEffect(() => {
  //   console.log(comm)
  // }

  // )

  return (
    <p>{content[0].content}</p>
  )
}

export default Comments