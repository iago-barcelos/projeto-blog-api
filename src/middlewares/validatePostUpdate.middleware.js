const { getPostById } = require('../services/post.service');

const validatePostUpdate = async (req, res, next) => {
  const { title, content } = req.body;
  const { id: postId } = req.params;
  const { id: userId } = res.locals.user;

  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  console.log('postId aqui', postId);

  const post = await getPostById(postId);

  console.log('post no middleware', post);
  if (post.data.dataValues.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  /* console.log('res.locals.user = ', userId); */
  
  next();
};

module.exports = validatePostUpdate;