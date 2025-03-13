const cors = require("cors");
const express = require("express");
var mongo = require("mongodb");

const app = express();
app.use(express.json());
app.use(cors());

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
  console.log("Server listining on http://127.0.0.1:3001");
})

process.on("SIGINT", async () => {
    await closeDB();
    console.log("Process end! Bye!");
    process.exit(0);
});

class UserData {
  constructor(userName, mail, password) {
    this.userName = userName;
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

async function findOne()
{
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

async function find()
{
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
  const {userName, mail, password} = req.body;
  console.log(userName, mail, password);

  try {
    let result = await findUserData(mail, password);
    if(!result) {
      const userData = new UserData(userName, mail, password);
      result = await insertUserData(userData);
      res.status(200).json({userId:result.insertedId.toHexString()});
    }
    else {
      console.log("Mail has been refistered");
    }
  } catch (error) {
    res.status(500).json({ message:"Internal Server Error", error});
  }


});

app.post("/login", async (req, res) => {
  const {mail, password} = req.body;
  console.log(mail, password);
  try {
    const result = await findUserData(mail, password)
    if (result) {
      console.log("Login Successfully");
      res.status(200).json({userId:result._id.toHexString()});
    }
    else {
      console.log("Login UN Successfully");
      res.status(400).json();
    }
  } catch (error) {
    res.status(500).json({ message:"Internal Server Error", error});
  }
});