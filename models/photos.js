const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
//
// const photos = require('../models/photos.js');

const commentSchema = new mongoose.Schema({
  content: { type: String },
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

const photoSchema = new mongoose.Schema({
  caption: {type: String},
  photourl: {type: String},
  user: {type: mongoose.Schema.ObjectId, ref: 'User'},
  comments: [commentSchema]
});

module.exports = mongoose.model('Photo', photoSchema);
