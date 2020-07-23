const express = require('express');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const createError = require('http-errors');
const mongoose = require('mongoose');
const cors = require('cors');

const usersRouter = require('./routes/users.router.js');
const eventsRouter = require('./routes/events.router.js');

const url = process.env.MONGO_URL;
mongoose.connect(url).then((db) => {
    console.log('Database connection successfully');
}, (err) => {
    console.log(err);
})

const app = express();

app.all('*', (req, res, next) => {
  if (req.secure) {
    return next();
  } else {
    res.redirect(307, 'https://' + req.hostname + ':' + app.get('securePort') + req.url);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(cors());

// Expose public folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/users', usersRouter);
app.use('/events', eventsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
