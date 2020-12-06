const multer = require('multer');
const upload = multer();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const route = express.Router();
const User = require('../model/user');
const validate = require('../validation/user');

route.get('/', (req, res) => {
  res.send('user lists');
})

route.post('/', upload.none(), async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message, success: false });

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json({ message: 'user already registered', success: false });

  user = await new User(_.pick(req.body, ['first_name', 'last_name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  res.status(200).json({ data: _.pick(user, ['first_name', 'last_name', 'email', 'admin']), message: 'User created successfully', success: true });
})

module.exports = route;