const User = require("../models/user");

const userController = {
  index: (req, res, next) => {
    User.find()
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        res.json({
          message: "Error",
        });
      });
  },

  show: (req, res) => {
    let userId = req.body.userId;
    User.findById(userId)
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  store: (req, res) => {
    let user = new User({
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      mark: req.body.mark,
    });
    user
      .save()
      .then((response) => {
        res.json({
          message: "success",
        });
      })
      .catch((err) => {
        res.json(err);
      });
  },
};

module.exports = userController;
