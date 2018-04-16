const Photo = require('../models/photos');

function photosIndex(req,res) {
  Photo
    .find()
    .exec()
    .then(photos => {
      res.render('photos/index', {photos});
    });
}

function photosShow(req,res) {
  Photo
    .findById(req.params.id)
    .exec()
    .then(photo => res.render('photos/show', {photo}));
}

module.exports = {
  index: photosIndex,
  show: photosShow
};
