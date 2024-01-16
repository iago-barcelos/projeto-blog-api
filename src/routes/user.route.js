const route = require('express').Router();
const { userController } = require('../controller');

const validateUser = require('../middlewares/validateUser.middleware');
const validateToken = require('../middlewares/validateToken.middleware');

route.post('/', validateUser, userController.createUser);
route.get('/', validateToken, userController.getAllUsers);

module.exports = route;