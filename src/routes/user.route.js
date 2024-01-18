const route = require('express').Router();
const { userController } = require('../controller');

const validateUser = require('../middlewares/validateUser.middleware');
const validateToken = require('../middlewares/validateToken.middleware');

route.post('/', validateUser, userController.createUser);
route.get('/', validateToken, userController.getAllUsers);
route.get('/:id', validateToken, userController.getUserById);
route.delete('/me', validateToken, userController.deleteUserById);

module.exports = route;