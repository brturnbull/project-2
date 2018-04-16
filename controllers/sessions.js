const User = require('../models/users');

function newRoute(req, res) {
  res.render('sessions/index');
}

function createRoute(req, res) {
  User.findOne({email: req.body.email})
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)){
        req.flash('danger', 'You must be logged in');
        res.status(401).render('sessions/index', {message: 'Wrong credentials'});
      }

      req.session.userId = user.id;
      res.redirect('/');
    });
}

function deleteRoute(req,res){
  return req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  new: newRoute,
  create: createRoute,
  delete: deleteRoute
};
