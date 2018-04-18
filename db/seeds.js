const mongoose  = require('mongoose');
mongoose.Promise = require('bluebird');

const { databaseURI } = require('../config/environment');
mongoose.connect(databaseURI);

const Photo = require('../models/photos');
const User  = require('../models/users');

Photo.collection.drop();
User.collection.drop();


User
  .create([
    {
      username: 'b',
      email: 'b@b',
      password: 'b',
      passwordConfirmation: 'b',
      profilephoto: 'http://www.fillmurray.com/300/300',
      bio: 'b'
    },
    {
      username: 's',
      email: 's@s',
      password: 's',
      passwordConfirmation: 's',
      profilephoto: 'http://www.fillmurray.com/300/300',
      bio: 's'
    }
  ])
  .then(users => {
    console.log(`${users.length} users added!`);

    return Photo.create([{
      photourl: 'https://popups.blob.core.windows.net/popup-images/315e9db2-3030-450b-a1f3-190eeffd9dec-med.jpg',
      caption: 'ciao',
      comments: [],
      user: users[0]._id
    },{
      photourl: 'https://ilovecakeandtea.files.wordpress.com/2017/02/screen-shot-2017-02-19-at-14-01-13.png',
      caption: 'ciao',
      comments: [],
      user: users[1]._id
    },{
      photourl: 'https://media.timeout.com/images/103739460/image.jpg',
      caption: 'ciao',
      comments: [],
      user: users[0]._id
    },{
      photourl: 'https://i.redd.it/xy6g3u2l0nvx.jpg',
      caption: 'ciao',
      comments: [],
      user: users[0]._id
    }]);
  })
  .then(photos => console.log(`${photos.length} photos added!`))
  .catch(err => console.log(err))
  .finally(()=> mongoose.connection.close());



// Photo.create([{
//   photourl: 'https://popups.blob.core.windows.net/popup-images/315e9db2-3030-450b-a1f3-190eeffd9dec-med.jpg',
//   caption: 'ciao',
//   comments: []
// },{
//   photourl: 'https://ilovecakeandtea.files.wordpress.com/2017/02/screen-shot-2017-02-19-at-14-01-13.png',
//   caption: 'ciao',
//   comments: []
// },{
//   photourl: 'https://media.timeout.com/images/103739460/image.jpg',
//   caption: 'ciao',
//   comments: []
// },{
//   photourl: 'https://i.redd.it/xy6g3u2l0nvx.jpg',
//   caption: 'ciao',
//   comments: []
// }])
//
//   .then(photos => console.log(`${photos.length} photos added!`))
//
//   .catch(err => console.log(err))
//   .finally(()=> mongoose.connection.close());
