var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// DB
var mongoose = require('mongoose');
require('./models/Author');
require('./models/Book');
require('./models/Customer');
require('./models/Employee');
require('./models/Order');
var dbInfo = require('./mongo-config');

var dev = false;
if (!dev) {
  mongoose.connect('mongodb://' + dbInfo.user + ':' + dbInfo.pw + '@ds041939.mlab.com:41939/heroku_kr842t2g');
} else {
  mongoose.connect('mongodb://localhost/bookstore');
}

var routes = require('./routes/index'),
    books = require('./routes/books'),
    authors = require('./routes/authors'),
    customers = require('./routes/customers'),
    employees = require('./routes/employees'),
    orders = require('./routes/orders');

var app = express();
var port = process.env.PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use(books);
app.use(authors);
app.use(customers);
app.use(employees);
app.use(orders);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(port, function() {
  console.log('Our app is running on port: ' + port);
});