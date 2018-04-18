const Photo = require('../models/photos');

function photosIndex(req,res) {
  Photo
    .find()
    .populate('user')     
    .exec()
    .then(photos => {
      console.log(photos);

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

//---------------------------- comments ---------------------------------------

function commentCreate(req, res) {
  // finding the photo that the comment must be added to
  Photo
    .findById(req.params.id)
    .exec()
    .then(photo => {
      // adding the current user to the comment form data
      req.body.user = req.currentUser;

      // pushing the comment into the array of comments for the photo
      photo.comments.push(req.body);

      // saving the photo
      return photo.save();
    })
    .then(photo => {
      // redirecting back to the photos show view
      res.redirect(`/photos/${photo.id}`);
    })
    .catch(err => console.log(err));
}

function commentDelete(req,res) {
  Photo
    .findById(req.params.id)
    .exec()
    .then(photo => {

      const comment = photo.comments.id(req.params.commentId);

      comment.remove();

      return photo.save();
    })
    .then(photo => {
      res.redirect(`/photos/${photo.id}`);
    })
    .catch(err => console.log(err));
}
//
// function commentsDelete(req, res) {
//   // finding the photo that the comment must be added to
//   Photo
//     .findById(req.params.photoId)
//     .exec()
//     .then(photo => {
//       // finding comment to delete by it's id
//       const comment = photo.comment.id(req.params.commentId);
//       // deleting that comment
//       comment.remove();
//
//       // saving the photo
//       return photo.save();
//     })
//     .then(photo => {
//       // redirecting back to the photos show view
//       res.redirect(`/photos/${photo._id}`);
//     })
//     .catch(err => console.log(err));
// }


module.exports = {
  index: photosIndex,
  show: photosShow,
  edit: photosEdit,
  new: photosNew,
  create: photosCreate,
  delete: photosDelete,
  update: photosUpdate,
  createComment: commentCreate,
  deleteComment: commentDelete
};
