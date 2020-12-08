const upload = require('multer')();
const bcrypt = require('bcrypt');
const express = require('express');
const route = express.Router();
const { loginValidation } = require('../validation/auth');
const User = require('../model/user');

route.post('/login', upload.none(), async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message, success: false });

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: 'email or password not matched', success: false });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).json({ message: 'email or password not matched', success: false });

  const token = await user.generateAccessToken();
  res.status(200).json({ access_token: token, message: 'Successfully login', success: true });
})

module.exports = route;