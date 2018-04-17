const mongoose  = require('mongoose');
mongoose.Promise = require('bluebird');

const { databaseURI } = require('../config/environment');
mongoose.connect(databaseURI);

const Photo = require('../models/photos');

Photo.collection.drop();

Photo.create([{
  photourl: 'https://popups.blob.core.windows.net/popup-images/315e9db2-3030-450b-a1f3-190eeffd9dec-med.jpg',
  caption: 'ciao'
},{
  photourl: 'https://ilovecakeandtea.files.wordpress.com/2017/02/screen-shot-2017-02-19-at-14-01-13.png',
  caption: 'ciao'
},{
  photourl: 'https://media.timeout.com/images/103739460/image.jpg',
  caption: 'ciao'
},{
  photourl: 'https://i.redd.it/xy6g3u2l0nvx.jpg',
  caption: 'ciao'
}])

  .then(photos => console.log(`${photos.length} photos added!`))

  .catch(err => console.log(err))
  .finally(()=> mongoose.connection.close());
