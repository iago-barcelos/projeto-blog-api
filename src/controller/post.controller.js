const { postService } = require('../services');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;

  const { id } = res.locals.user;

  const newPost = await postService.createPost(title, content, categoryIds, id);

  if (newPost.message) return res.status(400).json(newPost);

  return res.status(201).json(newPost);
};

const getAllPosts = async (req, res) => {
  try {
    const getPosts = await postService.getAllPosts();
    return res.status(200).json(getPosts);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createPost,
  getAllPosts,
};