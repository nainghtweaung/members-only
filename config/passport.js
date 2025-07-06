const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../db/pool');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
      );
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }

      const { rows: hash } = await pool.query(
        'SELECT password FROM users WHERE username = $1',
        [username]
      );
      const isMatch = await bcrypt.compare(password, hash[0].password);

      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [
      id,
    ]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});
