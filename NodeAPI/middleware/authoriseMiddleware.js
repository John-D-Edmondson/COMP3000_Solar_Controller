// Middleware to verify JWT
require('dotenv').config(); 
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token; // Assuming you're using cookies
    console.log(token);
    console.log(process.env.JWT_SECRET);
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId; // Attach the user ID to the request for further use
      next();
    } catch (error) {
        console.log(error);
      res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
  };

  module.exports = verifyToken;