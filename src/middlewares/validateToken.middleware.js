const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  try {
    const [, token] = authorization.split(' ');
    const verifyToken = jwt.verify(token, secret);

    res.locals.user = {
      id: verifyToken.sub,
      role: verifyToken.role,
    };
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  next();
};

module.exports = validateToken;