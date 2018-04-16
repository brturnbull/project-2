const express = require('express');
const PORT = process.env.PORT || 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const routes = require('./config/routes');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const flash = require('express-flash');
const session = require('express-session');
const User = require('./models/users');
const morgan = require('morgan');

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));
app.use(expressLayouts);

const {port, databaseURI} = require('./config/environment');

mongoose.connect(databaseURI);

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride(req => {
  if(req.body && typeof req.body === 'object' && '_method' in req.body){
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}))
// // sets the session

app.use(session({
  secret: 'secret token',
  resave: false,
  saveUnitialized: false,
}));

app.use(flash());
app.use(morgan('dev'));
app.use(expressLayouts);


// actually implements the session
app.use((req, res, next) =>{
  if(!req.session.userId) return next();

  User
    .findById(req.session.userId)
    .then((user) =>{
      req.session.userId = user._id;
      res.locals.user = user;
      req.currentUser = user;
      res.locals.isLoggedIn = true;
      next();
    });
});


app.use((err, req, res, next) =>{
  console.log('In error callback middleware');

  if(err) {
    console.log('FATAL ERROR');
    err.status  = err.status || 500;
    err.message = err.message || 'Internal Server Error';
    res.status(err.status);
    res.locals.err = err;
    return res.render(`statics/${err.status}`);
  }

  next();
});


app.use(routes);
app.listen(PORT, () => console.log(`Up and running on port ${PORT}`));
