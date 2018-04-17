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

function usersUpdate(req,res){
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      user = Object.assign(user, req.body);
      return user.save();
    })
    .then(user => res.redirect(`/users/${user._id}`));
}

module.exports = {
  index: usersIndex,
  show: usersShow,
  edit: usersEdit,
  update: usersUpdate
};
