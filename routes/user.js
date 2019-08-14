const router = require('express').Router();
const user = require('../controllers/user');

router.post('/', user.register);
router.post('/login', user.login);

const authentication = require('../middleware/authentication');
router.use(authentication);
router.get('/', user.getProfile);

module.exports = router;