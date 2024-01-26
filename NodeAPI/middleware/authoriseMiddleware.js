// Middleware to verify JWT
require('dotenv').config(); 
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token; // Assuming you're using cookies
    console.log(`token in request: ${token}`);
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

const verifyCorrectUserId = (req, res, next) => {
    const urlUserId = req.params.id; // Assuming the userId is in the URL parameters
    if (req.userId !== urlUserId) {
      return res.status(403).json({ message: 'Forbidden - You do not have access to this resource' });
    }
    next();
  };

  module.exports = {verifyToken, verifyCorrectUserId};