let router = require('express').Router();
let verifyUser = require('./auth').verifyUser;
let controller = require('./controller');

router.post('/signin', verifyUser(), controller.signin);
module.exports = router;
