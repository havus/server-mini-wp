const router = require('express').Router();
const post = require('../controllers/post');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });


router.use(authentication);
router.get('/', post.findAll);
router.post('/', post.create);
router.get('/:id', post.findOne);

router.put('/:id', authorization, post.update);
router.delete('/:id', authorization, post.delete);

module.exports = router;