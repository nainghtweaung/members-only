const { Router } = require('express');
const controller = require('../controllers/new-post-controller');

const router = Router();

router.get('/', controller.getNewPost);
router.post('/', controller.postNewPost);

module.exports = router;
