const { categoryService } = require('../services');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const newCategory = await categoryService.createCategory(name);
  
    const { status, data } = newCategory;
  
    return res.status(status).json(data);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createCategory,
};