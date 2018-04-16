const User = require('../models/users');

function usersIndex(req, res) {
  User
    .find()
    .exec()
    .then(users => {
      res.render('users/index', {users});
    });
}

module.exports = {
  index: usersIndex
}
