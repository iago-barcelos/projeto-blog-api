const { Category } = require('../models');

const validatePost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const validateCategoryId = categoryIds.map((category) => Category.findByPk(category));

  const promises = await Promise.all(validateCategoryId);

  const findError = promises.some((category) => category === null);

  if (findError) return res.status(400).json({ message: 'one or more "categoryIds" not found' });

  next();
};

module.exports = validatePost;