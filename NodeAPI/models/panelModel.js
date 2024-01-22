// panelModel.js
const mongoose = require('mongoose');

const panelSchema = new mongoose.Schema({
  longitude: {
    type: Number,
    validate: {
      validator: function (value) {
        return value >= -180 && value < 180;
      },
      message: 'Longitude must be within the range [-180, 180)',
    },
  },
  latitude: {
    type: Number,
    validate: {
      validator: function (value) {
        return value >= -90 && value < 90;
      },
      message: 'Latitude must be within the range [-90, 90)',
    },
  },
  apiKey: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{16}$/.test(value);
      },
      message: 'API key must be exactly 16 characters and can include letters, numbers, and symbols',
    },
  },

  userId: {
      type: String,
      ref: 'User', // Assuming 'Panel' is the model name for the other collection
      validate: [ 
        {
          validator: function (value) {
            if (!value){
              return true
            } else {
              return mongoose.Types.ObjectId.isValid(value);
            }
            
          },
          message: 'Invalid userId format for user',
        },
      ]
  },
});

const Panel = mongoose.model('Panel', panelSchema);

module.exports = Panel;