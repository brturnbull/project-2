const mongoose  = require('mongoose');
mongoose.Promise = require('bluebird');

const { databaseURI } = require('../config/environment');
mongoose.connect(databaseURI);

const Photo = require('../models/photos');

Photo.collection.drop();

Photo.create([{
  photourl: 'https://placeholdit.co//i/200x200?&bg=pink',
  caption: 'ciao'
},{
  photourl: 'https://placeholdit.co//i/200x200?&bg=pink',
  caption: 'ciao'
},{
  photourl: 'https://placeholdit.co//i/200x200?&bg=pink',
  caption: 'ciao'
},{
  photourl: 'https://placeholdit.co//i/200x200?&bg=pink',
  caption: 'ciao'
}])

  .then(photos => console.log(`${photos.length} photos added!`))

  .catch(err => console.log(err))
  .finally(()=> mongoose.connection.close());
