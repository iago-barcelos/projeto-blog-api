const { BlogPost, Category, PostCategory } = require('../models');

const createPost = async (title, content, categoryIds, id) => {
  const validateCategoryId = await categoryIds.map((category) => Category.findByPk(category));

  const promises = await Promise.all(validateCategoryId);

  const findError = promises.some((category) => category === null);

  if (findError) return { message: 'one or more "categoryIds" not found' };

  const newPost = await BlogPost.create({ title, content, userId: id });

  console.log(newPost);

  await PostCategory.bulkCreate(categoryIds
    .map((categoryId) => ({ postId: newPost.dataValues.id, categoryId })));

  return newPost;
};

module.exports = {
  createPost,
};