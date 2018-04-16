const User = require('../models/users');

//go to the index page for registrations
function newRoute(req, res) {
  res.render('registrations/index');
}

//create new using the content in the forms (req.body)
function createRoute(req, res){
  User
    .create(req.body)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      if(err.name === 'ValidationError'){
        return res.status(400).render('registrations/index', {message: err.toString()})
      }
    });
}

module.exports = {
  new: newRoute,
  create: createRoute
};
