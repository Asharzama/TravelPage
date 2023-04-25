const express = require("express");
const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("client"));

app.post("/send", async (req, res) => {
  const database = await client.connect();
  const result = database.db("travel_page");
  const response = result.collection("contacts");
  await response.insertOne(req.body)
  res.sendFile(__dirname + "/client/contact.html");
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
