const mongo = require("mongodb");
//**** */
const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser())

const allowedOrigins = [
  "http://1.34.178.127:3333",
  "http://1.34.178.127:5555",
  "http://localhost:5173",
  "http://wendys.com.tw:3333"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions))

const JWT_SECRET = "murmurSecretKey";

const {MongoClient, ObjectId} = require("mongodb");
var url = "mongodb://localhost:27017/mydb";
const client = new MongoClient(url);
const db = client.db("murmur");
const coll_post = db.collection("post");
const coll_comment = db.collection("comment");
const coll_userData = db.collection("userData");

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
app.listen(5555, () => {
  console.log("Server listining on Port 5555");
})

process.on("SIGINT", async () => {
    await closeDB();
    console.log("Process end! Bye!");
    process.exit(0);
});

class UserDataBackEnd {
  constructor({userId = null, name, mail, password, nameZH, introduction, likes = [], createdAt = new Date()}) {
    this._id = userId ? new ObjectId(userId) : new ObjectId();
    this.name = name;
    this.mail = mail;
    this.password = password;
    this.nameZH = nameZH;
    this.introduction = introduction;
    this.likes = likes;
    this.createdAt = createdAt;
  }
}

class UserDataBack2Front {
  constructor(UserDataBackEnd) {
    this.userId = UserDataBackEnd._id.toString();
    this.name = UserDataBackEnd.name;
    this.nameZH = UserDataBackEnd.nameZH;
    this.introduction = UserDataBackEnd.introduction;
  }
}

class PostDataBackEnd {
  constructor({postId = null, author, content, tag = null, likes = [], commentsNum = 0, createdAt = null}) {
    this._id = postId ? new ObjectId(postId) : new ObjectId();
    this.author = author;
    this.content = content;
    this.tag = tag;
    this.likes = Array.isArray(likes) ? likes : [];
    this.commentsNum = commentsNum;
    this.createdAt = createdAt ? new Date(createdAt) : new Date();
  }
}

class PostDataBack2Front {
  constructor(postDataBackEnd) {
    this.postId = postDataBackEnd._id.toString();
    this.commentId = postDataBackEnd._id.toString();
    this.parentId = postDataBackEnd._id.toString();
    this.author = postDataBackEnd.author;
    this.content = postDataBackEnd.content;
    this.tag = postDataBackEnd.tag;
    this.likesNum = postDataBackEnd.likes.length;
    this.commentsNum = postDataBackEnd.commentsNum;
    this.createdAt = postDataBackEnd.createdAt.toISOString();
    this.like = false;
  }
}

class CommentDataBackEnd {
  constructor({commentId = null, postId = null, parentId = null, author = null, content = null, likes = [], commentsNum = 0, commentCreatedAt = null}) {
    this._id = commentId ? new ObjectId(commentId) : new ObjectId();
    this.postId = postId ? new ObjectId(postId) : null;
    this.parentId = parentId ? new ObjectId(parentId) : null;
    this.author = author;
    this.content = content;
    this.likes = Array.isArray(likes) ? likes : [];
    this.commentsNum = commentsNum;
    this.createdAt = commentCreatedAt ? new Date(commentCreatedAt) : new Date();
  }
}

class CommentDataBack2Front {
  constructor(commentDataBackEnd) {
    this.postId = commentDataBackEnd.postId.toString();
    this.commentId = commentDataBackEnd._id.toString();
    this.parentId = commentDataBackEnd.parentId.toString();
    this.author = commentDataBackEnd.author;
    this.content = commentDataBackEnd.content;
    this.likesNum = commentDataBackEnd.likes.length;
    this.commentsNum = commentDataBackEnd.commentsNum;
    this.createdAt = commentDataBackEnd.createdAt.toISOString();
    this.like = false;
  }
}

async function findUserData(mail, password) {
  const result = await coll_userData.findOne({mail: mail, password: password});
  return result;
}

async function insertUserData(userData) {
  const result = await coll_userData.insertOne(userData);
  console.log(result);
  return result;
}

async function findOne() {
  const doc = await coll_post.findOne();
  return doc;
};

async function findPostById(id) {
  const post = await coll_post.findOne({_id: new ObjectId(id)});
  return post;
};

async function findCommentById(id) {
  const comment = await coll_comment.findOne({_id: new ObjectId(id)});
  return comment;
};

app.post("/posts", async (req, res) => {
  console.log("POSTS");
  try {
    let postsData = [];
    const cursor = await coll_post.find().limit(100).sort({createdAt: -1});

    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      const postData = new PostDataBack2Front(doc);
      postsData.push(postData);
    }

    res.json(postsData);
    console.log("POSTS", postsData);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({error: "Internal Server Error"});
  }
});


async function ancestor(postId, parentId, ancestorArr) {
  if(postId === parentId) {
    result = await findPostById(parentId);
    if(result) {
      const postData = new PostDataBack2Front(result);
      ancestorArr.push(postData);
    }
  }
  else {
    result = await findCommentById(parentId);
    if(result) {
      const commentData = new CommentDataBack2Front(result);
      ancestorArr.push(commentData);
      await ancestor(postId, commentData.parentId, ancestorArr);
    }
  }
}

app.post("/ancestor", async (req, res) => {
  try {
    const {postId, commentId, parentId} = req.body;
    const ancestorArr = [];

    await ancestor(postId, parentId, ancestorArr);
    ancestorArr.reverse();
    res.json(ancestorArr);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({error: "Internal Server Error"});
  }
});

app.post("/post", async (req, res) => {
  const {id} = req.body;
  try {
    const doc = await findPostById(id);
    const postData = new PostDataBack2Front(doc);
    res.json(postData);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/searchPostByField", async (req, res) => {
  const {author} = req.body;
  const {tag} = req.body;
  let field;
  let target;

  try {
    let postsData = [];
    if (author) {
      field = "author";
      target = author;
    }
    else if (tag) {
      field = "tag";
      target = tag;
    }

    const cursor = await coll_post.find({[field]: target}).limit(100).sort({createdAt: -1});

    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      const postData = new PostDataBack2Front(doc);
      postsData.push(postData);
    }

    res.json(postsData);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({error: "Internal Server Error"});
  }
});

app.post("/searchCommentByField", async (req, res) => {
  const {author} = req.body;
  const {tag} = req.body;
  let field;
  let target;

  try {
    let commentsData = [];
    if (author) {
      field = "author";
      target = author;
    }
    else if (tag) {
      field = "tag";
      target = tag;
    }

    const cursor = await coll_comment.find({[field]: target}).limit(100).sort({createdAt: -1});

    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      const commentData = new CommentDataBack2Front(doc);
      commentsData.push(commentData);
    }

    res.json(commentsData);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({error: "Internal Server Error"});
  }
});

app.post("/comments", async (req, res) => {
  try {
    const {postId, commentId} = req.body;
    const comments = [];
    const cursor = await coll_comment.find({
      postId: new ObjectId(postId),
      parentId: new ObjectId(commentId)
    });

    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      const commentData = new CommentDataBack2Front(doc);
      comments.push(commentData);
    }
    res.json(comments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/comment", async (req, res) => {
  const {id} = req.body;
  try {
    const doc = await findCommentById(id);
    const commentData = new CommentDataBack2Front(doc);
    res.json(commentData);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/register", async (req, res) => {
  const {name, mail, password} = req.body;

  try {
    const existingUser = await findUserData(mail, password);

    if (!existingUser) {
      const userData = new UserDataBackEnd({name, mail, password});
      const result = await insertUserData(userData);
      const token = jwt.sign({ID:result.insertedId.toString(), name: name}, JWT_SECRET, {expiresIn: "365d"});

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

async function addPost(author, content, tag) {
  const postData = new PostDataBackEnd({author, content, tag});
  const result = await coll_post.insertOne(postData);
  if(result) return postData._id;
}


app.post("/write", async (req, res) => {
  const {content, tag} = req.body.data;
  const token = req.cookies.murmurToken;
  
  if (!token) return res.status(401).json({error: "Please Login"});
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const {ID, name} = decoded;
    const result = await addPost(name, content, tag);

    res.status(200).json({postId: result});
  } catch (err) {
    res.status(401).json({error: "Invalid token"});
  }
})

async function addComment(postId, parentId, author, content) {
  const commentData = new CommentDataBackEnd({postId, parentId, author, content})
  const result = await coll_comment.insertOne(commentData);
  await updateCommentsNum(postId, parentId);
  return commentData;
}

async function updateCommentsNum(postId, parentId) {
  if(postId === parentId) {
    result = await findPostById(postId);
    if(result) {
      await coll_post.updateOne({_id: new ObjectId(postId)}, {$inc: {commentsNum: 1}});
    }
  }
  else {
    result = await findCommentById(parentId);
    if(result) {
      await coll_comment.updateOne({_id: new ObjectId(parentId)}, {$inc: {commentsNum: 1}});
      await updateCommentsNum(postId, result.parentId.toString());
    }
  }
}

app.post("/addComment", async(req, res) => {
  const {postId, parentId, content} = req.body.data;
  const token = req.cookies.murmurToken;
  
  if (!token) return res.status(401).json({error: "Please Login"});
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const {ID, name} = decoded;
    const commentPostEndData = await addComment(postId, parentId, name, content);
    const commentFrontEndData = new CommentDataBack2Front(commentPostEndData);
    res.status(200).json(commentFrontEndData);
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

app.post("/authorData", async (req, res) => {
  const {author} = req.body;
  let field;
  let target;

  try {
    const docs = await coll_userData.find({name: author}).toArray();
    const doc = docs[0];
    const userData = new UserDataBack2Front(doc);

    res.json(userData);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({error: "Internal Server Error"});
  }
});