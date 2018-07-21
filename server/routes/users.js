var express = require('express');
const userController = require('../controllers/userController');
var router = express.Router();

/* GET users listing. */
router.post('/registerWithForm', userController.registerWithForm);

router.post('/loginWithFB', userController.loginWithFB);

router.post('/login', userController.login);

module.exports = router;
