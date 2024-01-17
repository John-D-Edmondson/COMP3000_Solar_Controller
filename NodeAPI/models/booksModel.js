// bookModel.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  serial: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
  },
  latitude: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;