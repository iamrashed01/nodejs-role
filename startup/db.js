const mongoose = require('mongoose');

let db = {};

db.connect = function () {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      console.log('mongoDB Server Connected Successfully.')
    })
    .catch(err => {
      console.log('mongoDB Server Couldn\'t Connect');
    })
}

module.exports = db;