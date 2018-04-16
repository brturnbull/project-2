const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const users = require('../controllers/users');
const photos = require('../controllers/photos');

router.get('/', (req, res) => res.render('home'));

//resource users
router.route('/users')
  .get(users.index);

// router.route('/users/new')


router.route('/users/:id')
  .get(users.show);


router.route('/users/:id/edit')
  .get(users.edit);

//resource photos
router.route('/photos')
  .get(photos.index);

//end of photos

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
