const mongoose = require('mongoose');
const schema = mongoose.Schema

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  fbid: String,
  password: String,
})

const User = mongoose.model("User", userSchema);

module.exports = User;
