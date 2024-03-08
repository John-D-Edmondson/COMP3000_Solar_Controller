// Middleware to verify JWT
require('dotenv').config(); 
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token; 
    console.log(`token in request: ${token}`);
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, "Qq123456");
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

const verifyUserPasswordOnUpdate = async (req, res, next) => {
  const { oldPassword, password } = req.body;
  if(!password) next();
  
  try {
    // Verify the token
    const user = await User.findById(req.userId);
    
    if (user && await bcrypt.compare(oldPassword, user.password)){
      next();
    } else {
      res.status(401).json({ message: 'Old password incorrect' })
    }
   
  } catch (error) {
      console.log(error);
    res.status(401).json({ message: 'Old password incorrect' });
  }
};
  module.exports = {verifyToken, verifyCorrectUserId, verifyUserPasswordOnUpdate};