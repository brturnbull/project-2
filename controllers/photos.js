const Photo = require('../models/photos');

function photosIndex(req,res) {
  Photo
    .find()
    .populate('user')
    .exec()
    .then(photos => {
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

function photosEdit(req,res) {
  Photo
    .findById(req.params.id)
    .exec()
    .then(photo => res.render('photos/edit', {photo}));
}

function photosCreate(req,res) {
  req.body.user = req.currentUser;

  Photo
    .create(req.body)
    .then(() => res.redirect('/photos'))
    .catch((error) => {
      if(error.name === 'ValidationError'){
        return res.badRequest('/photos/new', error.toString);
      }
    });
}
function photosDelete(req,res){
  Photo
    .findById(req.params.id)
    .exec()
    .then(photo => photo.remove())
    .then(() => res.redirect('/photos'));
}

function photosUpdate(req,res){
  Photo
    .findById(req.params.id)
    .exec()
    .then(photo => {
      photo = Object.assign(photo, req.body);
      return photo.save();
    })
    .then(photo => res.redirect(`/photos/${photo._id}`));
}

module.exports = {
  index: photosIndex,
  show: photosShow,
  edit: photosEdit,
  new: photosNew,
  create: photosCreate,
  delete: photosDelete,
  update: photosUpdate
};
