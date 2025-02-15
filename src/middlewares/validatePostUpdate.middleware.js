const { getPostById } = require('../services/post.service');

const validatePostUpdate = async (req, res, next) => {
  const { title, content } = req.body;
  const { id: postId } = req.params;
  const { id: userId } = res.locals.user;

  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const post = await getPostById(postId);

  if (post.data.dataValues.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  
  next();
};

module.exports = validatePostUpdate;