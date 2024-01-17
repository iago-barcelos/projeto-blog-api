const route = require('express').Router();
const { postController } = require('../controller'); 

const validatePost = require('../middlewares/validatePost.middleware');
const validateToken = require('../middlewares/validateToken.middleware');

route.post('/', validateToken, validatePost, postController.createPost);
route.get('/', validateToken, postController.getAllPosts);

module.exports = route;