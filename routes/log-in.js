const { Router } = require('express');
const passport = require('passport');

const controller = require('../controllers/log-in-controller');

const router = Router();

router.get('/', controller.getLogIn);
router.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in',
  })
);

module.exports = router;
