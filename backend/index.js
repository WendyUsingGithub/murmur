const mongo = require("mongodb");
//**** */
const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

const JWT_SECRET = "murmurSecretKey";
const port = 3001;

const {MongoClient, ObjectId} = require("mongodb");
var url = "mongodb://localhost:27017/mydb";
const client = new MongoClient(url);
const db = client.db("murmur");
const coll_post = db.collection("post");
const coll_userData = db.collection("userData");
const coll_comment = db.collection("comment");

async function connectDB() {
  try {
    await client.connect();
    console.log("Connect to MongoDB successfully");

  } catch (error) {
    console.error("Fail to connect to MongoDB", error);
    process.exit(1);
  }
}

async function closeDB() {
  try {
    await client.close();
    console.log("Disconnect to MongoDB successfully");
  } catch (error) {
    console.error("Fail to disconnect to MongoDB:", error);
  }
}

connectDB();
app.listen(3001, () => {
  console.log("Server listining on http://localhost:3001");
})

process.on("SIGINT", async () => {
    await closeDB();
    console.log("Process end! Bye!");
    process.exit(0);
});

class UserData {
  constructor(name, mail, password) {
    this.name = name;
    this.mail = mail;
    this.password = password;
    this.createAt = new Date();
  }
}

async function insert(author, content, tag, likes, createdAt, comments = []) {

  const formattedComments = comments.map(comment => {
    const [commentAuthor, commentContent, commentCreatedAt, subComments=[]] = comment;

    const formattedSubComments = subComments.map(subComment => {
      const [subCommentAuthor, subCommentContent, subCommentCreatedAt] = subComment;
      return {
        _id: new ObjectId(),
        author: subCommentAuthor,
        content: subCommentContent,
        createdAt: new Date(subCommentCreatedAt)
      }
    });
    return {
      _id: new ObjectId(),
      author: commentAuthor,
      content: commentContent,
      createdAt: commentCreatedAt ? new Date(commentCreatedAt) : new Date(),
      comments: formattedSubComments
    }
  });

  const post = {
    author: author,
    content: content,
    tag: tag,
    likes: likes,
    createdAt: createdAt ? new Date(createdAt) : new Date(),
    comments: formattedComments
  };

  const result = await coll_post.insertOne(post);
  console.log("Inserted post with ID:", result.insertedId);
  return result.insertedId;
}

async function insertUserData(userData) {
  const result = await coll_userData.insertOne(userData);
  console.log(result);
  return result;
}

async function addComment(postId, commentId, author, content, createdAt) {
  const addCommentId = new ObjectId();

  if(!commentId) {
    const formattedComment = {
      _id: addCommentId,
      author: author,
      content: content,
      createdAt: createdAt ? new Date(createdAt) : new Date(),
      comments: []
    }
    const result = await coll_post.updateOne(
      {_id: new ObjectId(postId)},
      {$push: {comments: formattedComment}}
    )
    if(result.modifiedCount==1) {
      return addCommentId;
    }
  }
  else {
    const formattedComment = {
      _id: addCommentId,
      author: author,
      content: content,
      createdAt: createdAt ? new Date(createdAt) : new Date(),
    }
    const result = await coll_post.updateOne(
      {
        _id: new ObjectId(postId),
        "comments._id": new ObjectId(commentId)
      },
      {
        $push: {"comments.$.comments": formattedComment}
      }
    );
  }
}

async function findUserData(mail, password) {
  const result = await coll_userData.findOne({mail: mail, password: password});
  return result;
}

async function findOne() {
  const doc = await coll_post.findOne({
    createdAt: {
      $gte: new Date("2020-01-01T10:00:00"),
      $lte: new Date("2026-01-01T10:00:00"),
    },
  });
  return doc;
};

function find() {
  const cursor = coll_post
    .find({
      createdAt: {
        $gte: new Date("2020-01-01T10:00:00"),
        $lte: new Date("2026-01-01T10:00:00"),
      },
    }).limit(100);
  return cursor;
};

async function findPostById(id) {
  const post = await coll_post.findOne({_id: new ObjectId(id)});
  return post;
};

app.post("/posts", async (req, res) => {
  try {
    const cursor = await find();
    let postsData = [];

    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      const postData = {
        id: doc._id.toString(),
        author: doc.author,
        content: doc.content,
        likes: doc.likes,
        commentsNum: doc.comments.length,
        createdAt: doc.createAt,
      };
      postsData.push(postData);
    }

    res.json(postsData);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({error: "Internal Server Error"});
  }
});

app.post("/post", async (req, res) => {
  const {id} = req.body;
  try {
    const doc = await findPostById(id);
    const postData = {
      id: doc._id.toString(),
      author: doc.author,
      content: doc.content,
      tag: doc.tag,
      likes: doc.likes,
      comments: doc.comments,
      createdAt: doc.createAt
    };
    res.json(postData);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/register", async (req, res) => {
  console.log("REGISTER");
  const {name, mail, password} = req.body;

  try {
    const existingUser = await findUserData(mail, password);

    if (!existingUser) {
      const userData = new UserData(name, mail, password);
      const result = await insertUserData(userData);
      console.log("result.insertedId.toString()", result.insertedId.toString());
      const token = jwt.sign({ID:result.insertedId.toString(), name: name}, JWT_SECRET, {expiresIn: "365d"});
      console.log("token", token);

      res.cookie("murmurToken", token, {
        httpOnly: true,
        sameSite: "Lax",
        maxAge: 1000 * 60 * 60 * 24 * 365
      }).status(200).json({ID: result.insertedId.toString(), name});

    } else {
      res.status(409).json({message: "Mail already registered"});
    }
  } catch (err) {
    res.status(500).json({message: "Internal Server Error", error: err.message});
  }
});

app.post("/login", async (req, res) => {
  console.log("LOGIN");
  const {mail, password} = req.body;
  console.log(mail, password);
  try {
    const result = await findUserData(mail, password)
    if (result) {
      console.log("Login Successfully");

      const token = jwt.sign({ID:result.insertedId.toString(), name: name}, JWT_SECRET, {expiresIn: "365d"});
      console.log("token", token);

      res.cookie("murmurToken", token, {
        httpOnly: true,
        sameSite: "Lax",
        maxAge: 1000 * 60 * 60 * 24 * 365
      }).status(200).json({ID: result.insertedId.toString(), name});

    }
    else {
      console.log("Login UN Successfully");
      res.status(400).json();
    }
  } catch (error) {
    res.status(500).json({ message:"Internal Server Error", error});
  }
});

app.post("/write", async (req, res) => {
  const {content, tag} = req.body.data;
  const token = req.cookies.murmurToken;
  console.log("token", token);
  
  if (!token) return res.status(401).json({error: "Please Login"});
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const {ID, name} = decoded;
    console.log("decoded", decoded);
    console.log("IDname", ID, name);

    const result = await insert(name, content, tag);
    console.log("result", result);

    res.status(200).json({postId: result});
  } catch (err) {
    res.status(401).json({error: "Invalid token"});
  }
})

app.post("/addComment", async(req, res) => {
  const {postId, commentId, content} = req.body.data;
  const token = req.cookies.murmurToken;
  
  if (!token) return res.status(401).json({error: "Please Login"});
    
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const {ID, name} = decoded;
    const addCommentId = await addComment(postId, commentId, name, content);

    const comment = {
      _id: addCommentId,
      author: name,
      content: content,
      createdAt: new Date(),
      comments: []
    }
    res.status(200).json(comment);
  } catch (err) {
    res.status(401).json({error: "Invalid token"});
  }
})

app.get("/auth", (req, res) => {
  const token = req.cookies.murmurToken;
  if (!token) return res.status(401).json({ error: "No token" });
    
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ ID: decoded.ID, name: decoded.name });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});