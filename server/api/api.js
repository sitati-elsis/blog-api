let router = require('express').Router();

let userRouter = require('./user/userRoutes');
let postRouter = require('./post/postRoutes');
let categoryRouter = require('./category/categoryRoutes');

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/categories', categoryRouter);

module.exports = router;
