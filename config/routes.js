const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const users = require('../controllers/users');
const photos = require('../controllers/photos');

// function secure route ensures users can only see certain pages when they are logged in
function secureRoute(req, res, next){
  if(!req.session.userId){
    //if the request is made by a user with no session id (not logged in )
    return req.session.regenerate(() =>{
      //regenerate: clearing an entire session
      //return an error message and redirect to the home page
      req.flash('danger', 'You must be logged in');
      res.redirect('/');
    });
  }
  // returning the next step to ensure flow of the page
  return next();
}

router.get('/', (req, res) => res.render('home'));

//resource users
router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.show)
  .put(users.update);

router.route('/users/:id/edit')
  .get(users.edit);

//resource photos
router.route('/photos')
  .get(photos.index)
  .post(photos.create);

router.route('/photos/new')
  .get(secureRoute, photos.new);

router.route('/photos/:id')
  .get(photos.show)
  .delete(photos.delete)
  .put(photos.update);

router.route('/photos/:id/edit')
  .get(photos.edit);
//end of photos

//comments
router.route('/photos/:id/comments')
  .post(photos.createComment);

router.route('/photos/:id/comments/:commentId')
  .delete(photos.deleteComment);

//authentication
router.route('/signup')
  .get(registrations.new)
  .post(registrations.create);

router.route('/signin')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);
//end of authentication

module.exports = router;
