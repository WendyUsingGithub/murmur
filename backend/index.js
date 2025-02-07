const cors = require("cors");
const express = require("express");
var mongo = require("mongodb");

const app = express();
app.use(express.json());
app.use(cors());

const { MongoClient } = require("mongodb");
var url = "mongodb://localhost:27017/mydb";
const client = new MongoClient(url);

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

// insert(
//   "calico_cat",
//   "2025-01-01T02:00:00.000Z",
//   "我們不妨可以這樣來想:做好貓咪這件事，可以說已經成為了全民運動。\n對貓咪進行深入研究，在現今時代已經無法避免了。我們不得不面對一個非常尷尬的事實，那就是，如果別人做得到，那我也可以做到。\n\n若無法徹底理解貓咪，恐怕會是人類的一大遺憾。"
// );
// insert(
//   "tabby",
//   "2025-01-20T01:30:00.000Z",
//   "我想, 把貓的意義想清楚，對各位來說並不是一件壞事。\n貓似乎是一種巧合。\n實際上，貓可能比你想的還要更複雜。\n每個人的一生中，幾乎可說碰到貓這件事，是必然會發生的。"
// );
// insert(
//   "black_cat",
//   "2024-06-06T05:20:00.000Z",
//   "一般來講，我們都必須務必慎重的考慮考慮。這種事實對本人來說意義重大，相信對這個世界也是有一定意義的。\n貓的出現，必將帶領人類走向更高的巔峰。\n深入的探討貓，是釐清一切的關鍵。\n一般來講，我們都必須務必慎重的考慮考慮。"
// );
// insert(
//   "tuxedo_cat",
//   "2024-12-31T23:59:59.000Z",
//   "經過上述討論，所謂貓，關鍵是貓需要如何解讀。這必定是個前衛大膽的想法。對我個人而言，貓不僅僅是一個重大的事件，還可能會改變我的人生。"
// );
// insert(
//   "black_cat",
//   "2025-01-19T19:45:00.000Z",
//   "一般來講，我們都必須務必慎重的考慮考慮。這種事實對本人來說意義重大，相信對這個世界也是有一定意義的。\n貓的出現，必將帶領人類走向更高的巔峰。\n深入的探討貓，是釐清一切的關鍵。\n一般來講，我們都必須務必慎重的考慮考慮。"
// );

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

app.listen(3001, () => {
    console.log("Server listining on http://127.0.0.1:3001");
})