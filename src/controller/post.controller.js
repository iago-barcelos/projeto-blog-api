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

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const postById = await postService.getPostById(id);

    const { status, data } = postById;

    return res.status(status).json(data);
  } catch (error) {
    console.error(error);
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;
    const updatedPost = await postService.updatePost(id, title, content);

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const deletedPost = await postService.deletePost(id);
  return res.status(204).json(deletedPost);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};