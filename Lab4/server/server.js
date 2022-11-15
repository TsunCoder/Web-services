const express = require("express");
const bodyParser = require("body-parser");
const data = require("./data/data");
const path = require("path");
const bcrypt = require("bcrypt");
const { request } = require("http");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/login.html")); // Delete "l" to make status 404
  // request.get(""); Status 500
});

app.post("/login", async (req, res) => {
  try {
    let foundUser = await data.find((data) => req.body.email === data.email);
    if (foundUser) {
      let submittedPass = req.body.password;
      let storedPass = foundUser.password;
      console.log(typeof submittedPass);
      console.log(typeof storedPass);
      // const passwordMatch = await bcrypt.compare(storedPass, submittedPass);
      // console.log(passwordMatch);
      if (submittedPass === storedPass) {
        let userName = foundUser.name;
        let mark = foundUser.mark;
        
        res.status(200).send({ name: userName, mark: mark }); // Status code 200
      } else {
        res.send("User unavailable!");
      }
    }
  } catch (err) {
    console.log(err);
  }
});

var PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is start at http://localhost:${PORT}/`);
});
