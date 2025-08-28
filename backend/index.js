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
const coll_user = db.collection("user");

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


class UserData {
  constructor({userId = null, name, mail, password, nameZH, introduction, notifications = [], createdAt = new Date()}) {
    this._id = userId ? new ObjectId(userId) : new ObjectId();
    this.name = name;
    this.mail = mail;
    this.password = password;
    this.nameZH = nameZH;
    this.introduction = introduction;
    this.notifications = notifications;
    this.createdAt = createdAt;
  }
}

function UserDataBack2Front(UserData) {
  UserData._id = null;
  UserData,mail = null;
  UserData.password = null;
  UserData.createdAt = null;
}

class PostData {
  constructor({postId = null, author, content, tag = null, likes = [], commentsNum = 0, createdAt = new Date()}) {
    this._id = postId ? new ObjectId(postId) : new ObjectId();
    this.postId = this._id.toString();
    this.commentId = this.postId;
    this.parentId = this.postId;
    this.author = author;
    this.content = content;
    this.tag = tag;
    this.likes = likes;
    this.like = false;
    this.commentsNum = commentsNum;
    this.createdAt = createdAt instanceof Date ? createdAt : new Date(createdAt);
  }
}

function PostDataBack2Front(PostData) {
  PostData._id = null;
  PostData.createdAt = null;
  PostData.likesNum = PostData.likes.length;
}

class CommentData {
  constructor({postId = null, commentId = null, parentId = null, author = null, content = null, likes = [], commentsNum = 0, commentCreatedAt = new Date()}) {
    this._id = commentId ? new ObjectId(commentId) : new ObjectId();
    this.postId = postId;
    this.commentId = this._id.toString();
    this.parentId = parentId;
    this.author = author;
    this.content = content;
    this.likes = likes;
    this.like = false;
    this.commentsNum = commentsNum;
    this.createdAt = commentCreatedAt instanceof Date ? commentCreatedAt : new Date(commentCreatedAt);
  }
}

function CommentDataBack2Front(CommentData) {
  CommentData.likesNum = CommentData.likes.length;
  CommentData.likes= null;
}

class NotificationData {
  constructor({postId, commentId, parentId, author, content, parentContent}) {
    this.postId = postId;
    this.commentId = commentId;
    this.parentId = parentId;
    this.hisAuthor = author;
    this.hisContent = content;
    this.yourContent = parentContent;
  }
}

class NotificationBackEnd {
  constructor({postId, commentId, parentId, author, content, parentContent}) {
    this.postId = new ObjectId(postId);
    this.commentId = new ObjectId(commentId);
    this.parentId = new ObjectId(parentId);
    this.hisAuthor = author;
    this.hisContent = content;
    this.yourContent = parentContent;
  }
}

class NotificationBack2Front {
  constructor(NotificationBackEnd) {
    this.postId = NotificationBackEnd.postId.toString();
    this.commentId = NotificationBackEnd._id.toString();
    this.parentId = NotificationBackEnd.parentId.toString();
    this.hisAuthor = NotificationBackEnd.hisAuthor;
    this.hisContent = NotificationBackEnd.hisContent;
    this.yourContent = NotificationBackEnd.yourContent;
  }
}

function ifLike(req, data) {
  const token = req.cookies.murmurToken;
  if (token) {
    const decoded = jwt.verify(token, JWT_SECRET);
    const name = decoded.name;
    if (data.likes.includes(name)) {
      data.like = true;
    }
  }
}

async function findUserData(name, password) {
  const doc = await coll_user.findOne({name, password});
  return doc;
}

async function insertUserData(userData) {
  const doc = await coll_user.insertOne(userData);
  console.log(doc);
  return doc;
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
  try {
    let postsData = [];
    const cursor = await coll_post.find().limit(100).sort({createdAt: -1});

    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      ifLike(req, doc);
      PostDataBack2Front(doc);
      postsData.push(doc);
    }

    res.json(postsData);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({error: "Internal Server Error"});
  }
});


async function ancestor(req, postId, parentId, ancestorArr) {
  if(postId === parentId) {
    doc = await findPostById(parentId);
    if(doc) {
      ifLike(req, doc);
      PostDataBack2Front(doc);
      ancestorArr.push(doc);
    }
  }
  else {
    doc = await findCommentById(parentId);
    if(doc) {
      ifLike(req, doc);
      CommentDataBack2Front(doc);
      ancestorArr.push(doc);
      await ancestor(req, postId, doc.parentId, ancestorArr);
    }
  }
}

app.post("/ancestor", async (req, res) => {
  try {
    const {postId, commentId, parentId} = req.body;
    const ancestorArr = [];

    await ancestor(req, postId, parentId, ancestorArr);
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
    ifLike(req, doc);
    PostDataBack2Front(doc);
    res.json(doc);
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
      ifLike(req, doc);
      PostDataBack2Front(doc);
      postsData.push(doc);
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
      ifLike(req, doc);
      CommentDataBack2Front(doc);
      commentsData.push(doc);
    }

    res.json(commentsData);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({error: "Internal Server Error"});
  }
});

app.post("/comments", async (req, res) => {
  console.log("???");
  try {
    const {postId, commentId} = req.body;
    const comments = [];
    const cursor = await coll_comment.find({
      postId: postId,
      parentId: commentId
    });

    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      ifLike(req, doc);
      CommentDataBack2Front(doc);
      comments.push(doc);
      console.log("comments", comments);
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
    ifLike(req, doc);
    CommentDataBack2Front(doc);
    res.json(doc);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/register", async (req, res) => {
  const {name, mail, password} = req.body;

  try {
    const existingUser = await findUserData(name, password);

    if (!existingUser) {
      const userData = new UserData({name, mail, password});
      const doc = await insertUserData(userData);
      const token = jwt.sign({ID:doc.insertedId.toString(), name: name}, JWT_SECRET, {expiresIn: "365d"});

      res.cookie("murmurToken", token, {
        httpOnly: true,
        sameSite: "Lax",
        maxAge: 1000 * 60 * 60 * 24 * 365
      }).status(200).json({ID: doc.insertedId.toString(), name});

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
    const doc = await findUserData(name, password)
    if (doc) {
      console.log("Login Successfully ");

      const token = jwt.sign({ID:doc._id.toString(), name: doc.name}, JWT_SECRET, {expiresIn: "365d"});
      console.log("token", token);
      res.cookie("murmurToken", token, {
        httpOnly: true,
        sameSite: "Lax",
        maxAge: 1000 * 60 * 60 * 24 * 365
      }).status(200).json({ID:doc._id.toString(), name: doc.name});

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
  const doc = await coll_post.insertOne(postData);
  if(doc) return postData._id;
}


app.post("/write", async (req, res) => {
  const {content, tag} = req.body.data;
  const token = req.cookies.murmurToken;
  
  if (!token) return res.status(401).json({error: "Please Login"});
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const {ID, name} = decoded;
    const doc = await addPost(name, content, tag);

    res.status(200).json({postId: doc});
  } catch (err) {
    res.status(401).json({error: "Invalid token"});
  }
})

async function addComment(postId, parentId, author, content) {
  const commentData = new CommentData({postId, parentId, author, content})
  const doc = await coll_comment.insertOne(commentData);
  await updateCommentsNum(postId, parentId);
  return commentData;
}

async function updateCommentsNum(postId, parentId) {
  if(postId === parentId) {
    doc = await findPostById(postId);
    if(doc) {
      await coll_post.updateOne({_id: new ObjectId(postId)}, {$inc: {commentsNum: 1}});
    }
  }
  else {
    doc = await findCommentById(parentId);
    if(doc) {
      await coll_comment.updateOne({_id: new ObjectId(parentId)}, {$inc: {commentsNum: 1}});
      await updateCommentsNum(postId, doc.parentId.toString());
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
    const comment = await addComment(postId, parentId, name, content);
    CommentDataBack2Front(comment);
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

app.post("/authorData", async (req, res) => {
  const {author} = req.body;
  let field;
  let target;

  try {
    const docs = await coll_user.find({name: author}).toArray();
    const doc = docs[0];
    UserDataBack2Front(doc);

    res.json(doc);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({error: "Internal Server Error"});
  }
});

app.post("/like", async (req, res) => {

  const {postId, commentId} = req.body;
  const token = req.cookies.murmurToken;

  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const {ID, name} = decoded;

    const doc = await coll_post.updateOne({_id: new ObjectId(commentId)}, {$addToSet: {likes: name}});
    console.log("Matched:", doc.matchedCount, "Modified:", doc.modifiedCount);
    res.json(doc);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({error: "Internal Server Error"});
  }
});

app.post("/unlike", async (req, res) => {

  const {postId, commentId} = req.body;
  const token = req.cookies.murmurToken;

  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const {ID, name} = decoded;

    const doc = await coll_post.updateOne({_id: new ObjectId(commentId)}, {$pull: {likes: name}});
    console.log("Matched:", doc.matchedCount, "Modified:", doc.modifiedCount);
    res.json(doc);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({error: "Internal Server Error"});
  }
});

app.post("/notifications", async (req, res) => {

  const {postId, commentId} = req.body;
  const token = req.cookies.murmurToken;

  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const {ID, name} = decoded;

    const doc = await coll_user.findOne({name});
    console.log("DOC", doc);
    const notifications = new NotificationBack2Front(doc.notifications);
    res.json(notifications);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({error: "Internal Server Error"});
  }
});