const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const userRoute = require('./routes/router')

const app = express();
app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/testdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (err) => console.log(err));

db.once("open", () => {
  console.log("Database Connected");
});

app.use('/api/user', userRoute)

var port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server is start at http://localhost:${port}/`);
});
