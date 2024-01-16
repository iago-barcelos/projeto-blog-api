const { User } = require('../models');

const createUser = (displayName, email, password, image) => {
  User.create({ displayName, email, password, image });
};

const getAllUsers = () => {
  const allUsers = User.findAll({ attributes: { exclude: 'password' } });

  return allUsers;
};

module.exports = {
  createUser,
  getAllUsers,
};