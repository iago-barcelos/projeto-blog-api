const { User } = require('../models');

const createUser = (displayName, email, password, image) => {
  User.create({ displayName, email, password, image });
};

const getAllUsers = () => {
  const allUsers = User.findAll({ attributes: { exclude: 'password' } });

  return allUsers;
};

const getUserById = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: 'password' } });

  if (!user) {
    return { status: 404, data: { message: 'User does not exist' } };
  }

  return { status: 200, data: user };
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};