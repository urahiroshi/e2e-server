var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var trials = require('./routes/trials');
var results = require('./routes/results');
var screenshots = require('./routes/screenshots');
var projects = require('./routes/projects');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// Extend limit allow to send large data such as screenshot.
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/trials', trials);
app.use('/results', results);
app.use('/screenshots', screenshots);
app.use('/projects', projects);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.error(err.stack);
  if (err.name === 'ValidationError') {
    res.status(400);
    res.json({ errorType: err.name, errorDetail: err.errors });
  } else if (err.name === 'NotFoundError') {
    res.status(404);
    res.json({ errorType: 'NotFoundError' });
  } else {
    res.status(500);
    res.json({ errorType: 'SystemError' });
  }
});


module.exports = app;
