var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var multer = require('multer');
var upload = multer({dest: './uploads'})
var flash = require('connect-flash');
// var expressValidator = require("express-validator");
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db  = mongoose.connection;

var index = require('./routes/index');
var users = require('./routes/users');
var apps = require('./routes/apps');
var services = require('./routes/services');
var about = require('./routes/about');
var contact = require('./routes/contact');
var pug = require('pug');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));




app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Validator
// app.use(expressValidator());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Handle sessions
app.use(session(
  {
    secret: 'secret',
    saveUninitialized: true,
    resave: true
  }
));

//passport
app.use(passport.initialize());
app.use(passport.session());



// Messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Routes
app.use('/', index);
app.use('/users', users);
app.use('/apps',apps);
app.use('/services',services);
app.use('/about',about);
app.use('/contact',contact);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
