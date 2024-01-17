const { BlogPost, Category, PostCategory, User } = require('../models');

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

const getAllPosts = () => BlogPost.findAll({
  include: [
    {
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      through: { 
        attributes: [],
        model: PostCategory,
        as: 'posts_categories',
      },
    },
  ],
  attributes: { exclude: ['user_id'] },
});

module.exports = {
  createPost,
  getAllPosts,
};