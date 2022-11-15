const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String },
  password: { type: String },
  name: { type: String },
  mark: { type: Number },
});

const user = mongoose.model("user", userSchema);
module.exports = user;
