const User = require('../models/users');

function usersIndex(req, res) {
  User
    .find()
    .exec()
    .then(users => {
      res.render('users/index', {users});
    });
}

function usersShow(req,res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => res.render('users/show', {user}));
}

function usersEdit(req,res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => res.render('users/edit', {user}));
}

module.exports = {
  index: usersIndex,
  show: usersShow,
  edit: usersEdit
};
