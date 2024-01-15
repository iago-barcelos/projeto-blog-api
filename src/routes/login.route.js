const route = require('express').Router();
const { loginController: { findUserByEmail } } = require('../controller');

const validateLogin = require('../middlewares/validateLogin.middleware');

route.post('/', validateLogin, findUserByEmail);

module.exports = route;