const mongoose  = require('mongoose');
mongoose.Promise = require('bluebird');

const { databaseURI } = require('../config/environment');
mongoose.connect(databaseURI);

const Photo = require('../models/photos');

Photo.collection.drop();

Photo.create([{
  url: 'https://placeholdit.co//i/200x200?&bg=pink',
  comments: [
    'cool beans',
    'yo',
    'blwekhn ewfw wetw qc jgb'
  ]
},{
  url: 'https://placeholdit.co//i/200x200?&bg=pink',
  comments: [
    'Lorem anim id est laborum.',
    'Lorem anim id est laborum.',
    'Lorem anim id est laborum.'
  ]
},{
  url: 'https://placeholdit.co//i/200x200?&bg=pink',
  comments: [
    'Lorem anim id est laborum.',
    'Lorem anim id est laborum.',
    'Lorem anim id est laborum.'
  ]
}])

  .then(photos => console.log(`${photos.length} photos added!`))



  .catch(err => console.log(err))
  .finally(()=> mongoose.connection.close());
