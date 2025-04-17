const mongo = require("mongodb");
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

const {MongoClient} = require("mongodb");
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

async function insert(author, createAt, content) {
  const db = client.db("murmur");
  const coll = db.collection("posts");
  if(createAt == null) {
    createAt = new Date("2025-01-01T10:00:00");
  }
  console.log(typeof createAt);
  console.log(createAt);

  const result = await coll.insertOne({ author, createAt, content });
  console.log(result.insertedId);
}

async function insertUserData(userData) {
  const result = await coll_userData.insertOne(userData);
  console.log(result);
  return result;
}

async function findUserData(mail, password) {
  const result = await coll_userData.findOne({mail: mail, password: password});
  return result;
}

async function findOne() {
  await client.connect();
  const db = client.db("murmur");
  const coll = db.collection("posts");
  const doc = await coll.findOne({
    createAt: {
      $gte: new Date("2024-12-01T00:00:00").toISOString(),
      $lte: new Date("2025-01-05T23:59:59").toISOString(),
    },
  });
  return doc;
};

async function find() {
  await client.connect();
  const db = client.db("murmur");
  const coll = db.collection("posts");
  const cursor = coll
    .find({
      createAt: {
        $gte: new Date("2020-01-01T00:00:00Z").toISOString(),
        $lte: new Date("2025-01-30T23:59:59Z").toISOString(),
      },
    }).limit(5);
  return cursor;
};

app.post("/posts", (req, res) => {
  console.log("POSTS");
  find().then(async(cursor)=>{
    let postsData = [];
    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      const postData =
      {
        id: doc._id.toString(),
        author: doc.author,
        content: doc.content,
        createdAt: doc.createAt
      };
      postsData.push(postData);
    }
    res.json(postsData);
  })
})

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
  const {author, content, tag} = req.body;
  console.log({author, content, tag});
});


app.get("/auth", (req, res) => {
  console.log("AUTH");
  const token = req.cookies.murmurToken;
  if (!token) return res.status(401).json({ error: "No token" });
    
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ ID: decoded.ID, name: decoded.name });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});