const { Category } = require('../models');

const createCategory = async (name) => {
  const newCategory = await Category.create({ name });

  return { status: 201, data: newCategory };
};

module.exports = {
  createCategory,
};