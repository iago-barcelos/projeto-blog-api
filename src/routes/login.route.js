const route = require('express').Router();
const { loginController } = require('../controller');

const validateLogin = require('../middlewares/validateLogin.middleware');

route.post('/', validateLogin, loginController);

module.exports = route;