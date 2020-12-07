const multer = require('multer');
const upload = multer();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const route = express.Router();
const User = require('../model/user');
const validate = require('../validation/user');

// get users
route.get('/',async (req, res) => {
  const user = await User.find().select('-_id first_name last_name email');
  res.json({data: user, message: 'User Lists', success: true});
})

// create user
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

// update user
route.put('/', upload.none(), async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message, success: false });

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: 'email or password not matched', success: false });

  let validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).json({ message: 'email or password not matched', success: false });

  user.first_name = req.body.first_name;

  res.status(200).json({ data: user, message: 'User updated successfully', success: true });

})

module.exports = route;