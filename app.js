var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose');

// Подключение к MongoDB (Mongoose 7+ не требует useNewUrlParser и useUnifiedTopology)
mongoose.connect('mongodb://127.0.0.1:27017/testMongoose2024')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catsRouter = require('./routes/cats');

var session = require("express-session")

var app = express();

// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var session = require("express-session");
var MongoStore = require("connect-mongo");

app.use(session({
  secret: "ThreeCats",
  cookie: { maxAge: 60 * 1000 },
  proxy: true,
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/testMongoose2024'
  })
}));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cats', catsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', { title: 'Three Cats', error: err });
});

module.exports = app;
