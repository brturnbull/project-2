const Photo = require('../models/photos');

function photosIndex(req,res) {
  Photo
    .find()
    .exec()
    .then(photos => {
      console.log('inside photosIndex', photos);
      res.render('photos/index', {photos});
    });
}

function photosShow(req,res) {
  Photo
    .findById(req.params.id)
    .exec()
    .then(photo => {
      res.render('photos/show', {photo});
    });
}

function photosNew(req,res){
  res.render('photos/new', {error: null});
}

function photosCreate(req,res){
  req.body.user = req.currentUser;

  Photo
    .create(req.body)
    .then(() => res.redirect('/photos'));
}

function photosDelete(req,res){
  Photo
    .findById(req.params.id)
    .exec()
    .then(photo => photo.remove())
    .then(() => res.redirect('/photos'));
}

function photosEdit(req,res) {
  Photo
    .findById(req.params.id)
    .exec()
    .then(photo => res.render('photos/edit', {photo}));
}

module.exports = {
  index: photosIndex,
  show: photosShow,
  edit: photosEdit,
  new: photosNew,
  create: photosCreate,
  delete: photosDelete
};
