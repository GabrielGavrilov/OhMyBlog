const express = require('express');
const router = express.Router();
const controller = require('../controllers/AuthController');

router.get('/', controller.getUserInformation);

router.post('/', controller.loginUser);
router.post('/signup', controller.createUser);

router.delete('/', controller.logoutUser);

module.exports = router;
