const signToken = require('../utils/signToken');
const { userService } = require('../services');

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    await userService.createUser(displayName, email, password, image);

    const token = signToken(email);

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

const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getUserById(id);

  const { status, data } = user;

  return res.status(status).json(data);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};