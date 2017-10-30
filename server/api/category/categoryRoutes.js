let router = require('express').Router();
let controller = require('./categoryController');
let auth = require('../../auth/auth');

let checkUser = [auth.decodeToken, auth.getFreshUser];

router.param('id', controller.params);

router.route('/')
    .get(controller.get)
    .post(checkUser, controller.post);

router.route('/:id')
    .get(controller.getOne)
    .put(checkUser, controller.put)
    .delete(checkUser, controller.delete);



module.exports = router;