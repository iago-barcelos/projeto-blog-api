const route = require('express').Router();
const { postController } = require('../controller'); 

const validatePost = require('../middlewares/validatePost.middleware');
const validateToken = require('../middlewares/validateToken.middleware');
const validatePostUpdate = require('../middlewares/validatePostUpdate.middleware');
const validatePostDelete = require('../middlewares/validatePostDelete.middleware');

route.post('/', validateToken, validatePost, postController.createPost);
route.get('/', validateToken, postController.getAllPosts);
route.get('/:id', validateToken, postController.getPostById);
route.put('/:id', validateToken, validatePostUpdate, postController.updatePost);
route.delete('/:id', validateToken, validatePostDelete, postController.deletePost);

module.exports = route;