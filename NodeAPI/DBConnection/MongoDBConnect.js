// MongoDBConnect.js
const mongoose = require('mongoose');
require('dotenv').config(); 

const connectToMongoDB = async () => {
    const mongoURI =process.env.MONGODB_URI;
    try {
      await mongoose.connect(mongoURI);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  };

module.exports = connectToMongoDB;