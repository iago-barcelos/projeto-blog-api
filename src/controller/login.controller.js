const jwt = require('jsonwebtoken');

const findUserByEmail = (req, res) => {
  try {
    const { email } = req.body;
    
    const jwtEnv = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const secret = process.env.JWT_SECRET;
  
    const token = jwt.sign({ data: email }, secret, jwtEnv);
  
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  findUserByEmail,
};