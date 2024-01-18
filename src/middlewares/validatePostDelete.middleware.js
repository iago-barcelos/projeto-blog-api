const { getPostById } = require('../services/post.service');

const validatePostDelete = async (req, res, next) => {
  const { id: postId } = req.params;
  const { id: userId } = res.locals.user;

  const post = await getPostById(postId);

  console.log('esses são os dados do post: ', post);

  const { dataValues } = post.data;
  
  if (!dataValues) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  if (post.data.dataValues.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  next();
};

module.exports = validatePostDelete;