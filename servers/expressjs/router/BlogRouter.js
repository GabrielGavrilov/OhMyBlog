const express = require('express');
const router = express.Router();
const controller = require('../controllers/BlogController');
const auth = require('../middleware/Auth');

router.get('/', controller.getAllBlogs);
router.get('/:id', controller.findBlogById);

router.post('/', auth, controller.createBlog);

router.put('/:id', auth, controller.updateBlog);

router.delete('/:id', auth, controller.deleteBlog);

module.exports = router;
