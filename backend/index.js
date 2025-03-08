const cors = require("cors");
const express = require("express");
var mongo = require("mongodb");

const app = express();
app.use(express.json());
app.use(cors());

const { MongoClient } = require("mongodb");
var url = "mongodb://localhost:27017/mydb";
const client = new MongoClient(url);

app.listen(3001, () => {
    console.log("Server listining on http://127.0.0.1:3001");
})

async function insert(author, createAt, content) {
  await client.connect();
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

client.connect()
.then(() => {
  db = client.db("murmur");
  coll = db.collection("posts");
})

app.post("/post", (req, res) => {
  console.log("POST");
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
      console.log(postsData);
      res.json(postsData);
  })
})

app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    console.log(sername, email, password);
    
    if (!username || !email || !password) {
        return res.status(400).json({ message: "請提供完整資訊" });
    }

    try {
        const usersCollection = await connectDB();
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "此信箱已被註冊" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await usersCollection.insertOne({ username, email, password: hashedPassword });
        res.status(201).json({ message: "註冊成功", userId: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: "伺服器錯誤", error });
    }
});