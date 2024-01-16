const { loginService } = require('../services');

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const user = await loginService.findUserByEmail(email);

  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  console.log(user);
  req.user = user;

  next();
};

module.exports = validateLogin;