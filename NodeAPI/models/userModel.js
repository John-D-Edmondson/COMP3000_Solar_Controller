// userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Validate that the field contains only letters and has a minimum length of 2
        return /^[a-zA-Z ]{2,}$/.test(value);
      },
      message: 'First name must contain only letters and have a minimum length of 2',
    },
  },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Validate that the field contains only letters and has a minimum length of 2
        return /^[a-zA-Z ]{2,}$/.test(value);
      },
      message: 'Last name must contain only letters and have a minimum length of 2',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        // Custom regular expression for basic email format validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); 
      },
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Custom validator for password complexity
        // Requires at least 8 characters, one letter, and one number
        return /^(?=.*[A-Z][a-z])(?=.*\d).{8,}$/.test(value);
        
      },
      message: 'Password must be at least 8 characters long and contain at least one letter and one number',
    },
  },
  panels: [
    {
      type: String,
      ref: 'Panel', // Assuming 'Panel' is the model name for the other collection
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: 'Invalid ObjectId format for panel',
      },
    },
  ],
});

userSchema.pre('save', async function (next) {
  try {
    const saltRounds = 10; // You can adjust the number of salt rounds as needed
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;