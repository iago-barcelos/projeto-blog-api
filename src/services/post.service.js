const { BlogPost, Category, PostCategory, User } = require('../models');

const createPost = async (title, content, categoryIds, id) => {
  const newPost = await BlogPost.create({ title, content, userId: id });

  await PostCategory.bulkCreate(categoryIds
    .map((categoryId) => ({ postId: newPost.dataValues.id, categoryId })));

  return newPost;
};

const getAllPosts = () => BlogPost.findAll({
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, 
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

const getPostById = async (id) => {
  const postById = await BlogPost.findByPk(id, { include: [
    { model: User, 
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    { model: Category,
      as: 'categories',
      through: { model: PostCategory, as: 'posts_categories', attributes: [],
      },
    }],
  attributes: { exclude: ['user_id'] },
  });

  if (!postById) return { status: 404, data: { message: 'Post does not exist' } };

  /* console.log('post pelo id:', postById); */

  return { status: 200, data: postById };
};

const updatePost = async (id, title, content) => {
  await BlogPost.update({ title, content }, { where: { id } });
  const postById = await getPostById(id);
  return postById.data;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
};