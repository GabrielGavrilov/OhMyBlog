const express = require('express');
const router = express.Router();
const controller = require('../controllers/AuthController');
const auth = require('../middleware/Auth');

router.get('/', auth, controller.getUserInformation);

router.post('/', controller.loginUser);
router.post('/signup', controller.createUser);

router.delete('/', controller.logoutUser);

module.exports = router;
