var express         = require('express');
var session         = require('express-session');
var app             = express();
var compression     = require('compression');
var path            = require('path');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var multer          = require('multer');
var cors            = require("./libs/enable_cors")(app);
var upload          = multer({ dest: path.join(__dirname, 'uploads')});
var passport        = require('passport'); //authentication

// SETUP
app.use(compression()); // GZIP all assets
app.set('partials',path.join(__dirname,'views/partials'));
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));
app.set('view cache', true);
app.enable('trust proxy');//set proxy on true, ip ophalen
app.use(logger('dev')); //logger
app.use(cookieParser()); //cookies
app.use(bodyParser.urlencoded({ extended: true  })); //using auth + formdata
app.use(bodyParser.json()); // parse application/json

app.use(express.static(__dirname + '/public'));

//authentication
app.use(session({
  secret: 'bob-app',
  resave: true,
  expires: true,
  saveUninitialized: false,
  path:"/*" //NEEDED
}));
app.use(passport.initialize());
app.use(passport.session());
require('./libs/auth');


//api routes
var auth        = require('./routes/api/auth');
var autotypes   = require('./routes/api/autotypes');
var bobs        = require('./routes/api/bobs');
var chatrooms   = require('./routes/api/chatrooms');
var cities      = require('./routes/api/cities');
var countries   = require('./routes/api/countries');
var destinations= require('./routes/api/destinations');
var friends     = require('./routes/api/friends');
var parties     = require('./routes/api/parties');
var statuses    = require('./routes/api/statuses');
var trips       = require('./routes/api/trips');
var user        = require('./routes/api/user');
var users       = require('./routes/api/users');

var error       = require('./routes/error');

app.use('/api/auth', auth);

app.use('/api/autotypes', autotypes);
app.use('/api/bobs', bobs);
app.use('/api/chatrooms', chatrooms);
app.use('/api/cities', cities);
app.use('/api/countries', countries);
app.use('/api/destinations', destinations);
app.use('/api/friends', friends);
app.use('/api/parties', parties);
app.use('/api/statuses',statuses);
app.use('/api/trips', trips);
app.use('/api/user', user);
app.use('/api/users', users);

app.use('/404',error);

app.use('/', function(req, res, next) {
  res.redirect('/api');
});


//standard
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('views/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('views/error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
