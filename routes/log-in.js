const { Router } = require('express');
const passport = require('passport');

const controller = require('../controllers/log-in-controller');

const router = Router();

router.get('/', controller.getLogIn);
router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
    }
    if (!user) {
      return res.status(401).render('log-in', { message: info.message });
    }
    req.logIn(user, (err) => {
      next(err);

      return res.redirect('/');
    });
  })(req, res, next);
});

module.exports = router;
