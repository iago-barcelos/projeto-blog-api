const { loginService } = require('../services');

const checkDisplayName = (displayName) => (!displayName || displayName.length < 8);

const checkEmail = (email) => {
  const emailRegex = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;
  const checking = emailRegex.test(email);
  return checking;
};

const checkPassword = (password) => (!password || password.length < 6);

const validateUser = async (req, res, next) => {
  const { displayName, email, password } = req.body;

  if (checkDisplayName(displayName)) {
    return res.status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }

  if (!checkEmail(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  if (checkPassword(password)) {
    return res.status(400)
      .json({ message: '"password" length must be at least 6 characters long' });
  }

  const user = await loginService.findUserByEmail(email);

  if (user) {
    return res.status(409).json({ message: 'User already registered' });
  }

  next();
};

module.exports = validateUser;