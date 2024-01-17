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
        return /^[a-zA-Z]{2,}$/.test(value);
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
        return /^[a-zA-Z]{2,}$/.test(value);
      },
      message: 'First name must contain only letters and have a minimum length of 2',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
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