const { Router } = require('express');
const controller = require('../controllers/index-controller');

const router = Router();

router.get('/', controller.getIndex);
router.get('/delete/:id', controller.deleteMessage);

module.exports = router;
