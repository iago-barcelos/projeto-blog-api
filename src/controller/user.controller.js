const jwt = require('jsonwebtoken');
const { userService } = require('../services');

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    await userService.createUser(displayName, email, password, image);

    const secret = process.env.JWT_SECRET;

    const jwtSettings = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: { email } }, secret, jwtSettings);

    return res.status(201).json({ token });
  } catch (error) {
    console.error(error.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  createUser,
  getAllUsers,
};