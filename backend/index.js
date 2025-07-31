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


async function findUserData(mail, password) {
  const result = await coll_userData.findOne({mail: mail, password: password});
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
  try {
    let postsData = [];
    const cursor = await coll_post.find().limit(100).sort({createdAt: -1});

    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      const postData = {
        postId: doc._id.toString(),
        commentId: doc._id.toString(),
        parentId: doc._id.toString(),
        author: doc.author,
        content: doc.content,
        likes: doc.likes,
        // commentsNum: doc.comments.length,
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


async function ancestor(postId, parentId, ancestorArr) {
  console.log("IN ANCESTOR");

  if(postId == parentId) {
    console.log("FIND POST");
    result = await findPostById(parentId);
    if(result) {
      const postData = {
        id: result._id.toString(),
        author: result.author,
        content: result.content,
        tag: result.tag,
        likes: result.likes,
        createdAt: result.createAt
      };
      ancestorArr.push(postData);
      console.log("HERE");   
    }
  }
  else {
    result = await findCommentById(parentId);
    if(result) {
      const postData = {
        id: result._id.toString(),
        postId: result.postId,
        parentId: result.parentId,
        author: result.author,
        content: result.content,
        tag: result.tag,
        likes: result.likes,
        createdAt: result.createAt
      };
      ancestorArr.push(postData);
      await ancestor(postId, postData.parentId, ancestorArr);
    }
  }
}

app.post("/ancestor", async (req, res) => {
  console.log("ancestor");
  try {
    const {postId, commentId, parentId} = req.body;
    const ancestorArr = [];

    await ancestor(postId, parentId, ancestorArr);

    ancestorArr.reverse();
    res.json(ancestorArr);
    console.log("ancestorArr!!", ancestorArr);
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
      createdAt: doc.createAt
    };
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

  console.log(req.body);

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

    console.log(field, target);

    const cursor = await coll_post.find({[field]: target}).limit(100).sort({createdAt: -1});

    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      const postData = {
        postId: doc._id.toString(),
        commentId: doc._id.toString(),
        parentId: doc._id.toString(),
        author: doc.author,
        content: doc.content,
        createdAt: doc.createdAt
      };
      postsData.push(postData);
      console.log("postData");
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

  console.log(req.body);

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

    const cursor = await coll_comment.find({[field]: target}).limit(100).sort({createdAt: -1});

    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      const postData = {
        postId: doc.postId.toString(),
        commentId: doc._id.toString(),
        parentId: doc.parentId.toString(),
        author: doc.author,
        content: doc.content,
        createdAt: doc.createdAt
      };
      postsData.push(postData);
      console.log("postData");
    }

    res.json(postsData);
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
      const commentData = {
        postId: doc.postId.toString(),
        commentId: doc._id.toString(),
        parentId: doc.parentId.toString(),
        author: doc.author,
        content: doc.content,
        createdAt: doc.createdAt
      };
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
    const commentData = {
      postId: doc.postId.toString(),
      commentId: doc._id.toString(),
      parentId: doc.parentId.toString(),
      author: doc.author,
      content: doc.content,
      tag: doc.tag,
      likes: doc.likes,
      createdAt: doc.createAt
    };
    res.json(commentData);
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

async function addComment(postId, parentId, author, content, createdAt) {
  const commentId = new ObjectId();
  const comment = {
    _id: commentId,
    postId: new ObjectId(postId),
    parentId: new ObjectId(parentId),
    author: author,
    content: content,
    createdAt: new Date()
  };
  const result = await coll_comment.insertOne(comment);
  return commentId;
}

app.post("/addComment", async(req, res) => {
  const {postId, parentId, content} = req.body.data;
  const token = req.cookies.murmurToken;
  
  if (!token) return res.status(401).json({error: "Please Login"});
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const {ID, name} = decoded;
    const addCommentId = await addComment(postId, parentId, name, content);

    const comment = {
      id: addCommentId,
      postId: postId,
      parentId: parentId,
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