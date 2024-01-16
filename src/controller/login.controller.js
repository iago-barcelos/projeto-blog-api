const signToken = require('../utils/signToken');

const logging = (req, res) => {
  try {
    const { id, email } = req.user;
    
    const token = signToken({ id, email });
  
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = logging;