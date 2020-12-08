const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { JsonWebTokenError } = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
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
});

userSchema.methods.generateAccessToken = function(){
  return jwt.sign({
    admin: this.admin,
    email: this.email,
  }, process.env.PRIVATE_KEY);
}
const User = mongoose.model("User", userSchema)

module.exports = User;