const path = require('node:path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');

const signUpRouter = require('./routes/sign-up');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello');
});

app.use('/sign-up', signUpRouter);

app.listen(5000, () => {
  console.log('listening on port 5000');
});
