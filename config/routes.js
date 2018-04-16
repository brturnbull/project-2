const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const users = require('../controllers/users');

router.get('/', (req, res) => res.render('home'));

//resource photos
router.route('/users')
  .get(users.index);


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
