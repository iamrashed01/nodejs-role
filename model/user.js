const mongoose = require("mongoose");

const User = mongoose.model("User", new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    min: 3,
    max: 255
  },
  last_name: {
    type: String,
    required: true,
    min: 3,
    max: 255
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    min: 3,
    max: 255,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  }
}))

module.exports = User;