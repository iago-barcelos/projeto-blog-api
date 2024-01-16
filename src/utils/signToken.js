const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtSettings = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const signToken = (data) => jwt.sign({ data }, secret, jwtSettings);

module.exports = signToken;