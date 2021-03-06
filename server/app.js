var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

var indexRouter = require('./routes/index');
var todosRouter = require('./routes/todos');
var usersRouter = require('./routes/users');
var authenticationRouter = require('./routes/authentication');


const authentication = require('./middlewares/authentication');

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds147391.mlab.com:47391/just-a-rather-fancy-todo`, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("connected!");
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/todos', authentication.verifyToken, todosRouter);
app.use('/users', usersRouter);
app.use('/authentication', authenticationRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
