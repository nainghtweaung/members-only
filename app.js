const path = require('node:path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');

require('./config/passport');
const indexRouter = require('./routes/index');
const signUpRouter = require('./routes/sign-up');
const logInRouter = require('./routes/log-in');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'cats',
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //   maxAge: 1000 * 2,
    // },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   console.log(req.user);
//   console.log(req.session);
//   next();
// });

app.use('/', indexRouter);
app.use('/sign-up', signUpRouter);
app.use('/log-in', logInRouter);
app.get('/log-out', function (req, res, next) {
  console.log(req.user);
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

app.listen(5000, () => {
  console.log('listening on port 5000');
});
