const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  fbid: String,
  password: {
    type: String,
    minlength: 10,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
})

const User = mongoose.model("User", userSchema);

module.exports = User;