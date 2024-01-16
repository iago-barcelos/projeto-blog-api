const route = require('express').Router();
const { categoryController } = require('../controller');

const validateToken = require('../middlewares/validateToken.middleware');
const validateCategory = require('../middlewares/validateCategory.middleware');

route.post('/', validateToken, validateCategory, categoryController.createCategory);

module.exports = route;