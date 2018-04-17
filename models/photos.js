const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
//
// const photos = require('../models/photos.js');

// const commentSchema = new.mongoose.Schema({
//
// })

const photoSchema = new mongoose.Schema({
  caption: {type: String},
  photourl: {type: String},
  user: {type: mongoose.Schema.ObjectId, ref: 'User'},
  // comments: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Photo', photoSchema);
