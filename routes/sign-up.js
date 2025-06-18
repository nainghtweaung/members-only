const { Router } = require('express');
const controller = require('../controllers/sign-up-controller');
const validateSignUp = require('../middleware/sign-up-validator');

const router = Router();

router.get('/', controller.signUpGet);
router.post('/', validateSignUp, controller.signUpPost);

module.exports = router;
