const mongoose = require('mongoose');

const SolarPanelSchema = new mongoose.Schema({
  apiKey: String,
  latitude: String,
  longitude: String,
});

const SolarPanel = mongoose.model('SolarPanel', SolarPanelSchema);

module.exports = SolarPanel;
