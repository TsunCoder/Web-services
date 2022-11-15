const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authController = {
  login: (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({ $or: [{ username: username }] }).then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            res.json({
              error: err,
            });
          }
          if (result) {
            let token = jwt.sign({ name: user.name }, "verySecretValue", {
              expiresIn: "1h",
            });
            res.json({
              message: "Login successful!",
              token,
            });
          } else {
            res.json({
              message: "Password does not match!",
            });
          }
        });
      }
    });
  },
};

module.exports = authController;
