const Photo = require('../models/photos');

function photosIndex(req,res) {
  Photo
    .find()
    .exec()
    .then(photos => {
      res.render('photos/index', {photos});
    });
}


module.exports = {
  index: photosIndex
};
