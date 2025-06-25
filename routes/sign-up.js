const { Router } = require('express');
const controller = require('../controllers/sign-up-controller');
const validateSignUp = require('../middleware/validateSignUp');

const router = Router();

router.get('/', controller.signUpGet);
router.post('/', validateSignUp, controller.signUpPost);
router.get('/join', controller.getJoinMembership);
router.post('/join', controller.postJoinMembership);

module.exports = router;
