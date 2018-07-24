var express = require('express');
const authentication = require('../middlewares/authentication');
var router = express.Router();

router.get('/', authentication.decodeToken);

module.exports = router;
