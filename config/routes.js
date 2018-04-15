const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');

router.get('/', (req, res) => res.render('home'));




router.route('/signup')
  .get(registrations.new);
// .post(registrations.create);
//
router.route('/signin')
  .get(sessions.new);
// // .post(sessions.create);
//
// router.route('/logout')
//   .get(sessions.delete);

module.exports = router;
