const router = require('express').Router();
const { post, login } = require('../controllers/users');
const authorization = require('../middleware/authorization');
const users = require('./users');
const articles = require('./articles');
const NotFoundErr = require('../middleware/errors/not-found-err');
const { posts, sign } = require('../middleware/validate/user');


router.post('/signin', sign, login);
router.post('/signup', posts, post);

router.use(authorization);

router.use('/users', users);
router.use('/articles', articles);
router.all('*', () => {
    throw new NotFoundErr('Not found');
});

module.exports = router;
