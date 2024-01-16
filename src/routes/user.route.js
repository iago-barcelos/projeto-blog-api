const route = require('express').Router();
const { userController: { createUser } } = require('../controller');

const validateUser = require('../middlewares/validateUser.middleware');

route.post('/', validateUser, createUser);

module.exports = route;