// MongoDBConnect.js
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const connectToMongoDB = async () => {
    const mongoURI =process.env.MONGODB_URI;
    console.log(mongoURI);
    try {
      await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  };

module.exports = connectToMongoDB;