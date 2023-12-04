const mongoose = require('mongoose');

const SolarPanelSchema = new mongoose.Schema({
  panelID: Number,
  apiKey: String,
  latitude: String,
  longitude: String,
  customerID: Number
});

const SolarPanel = mongoose.model('SolarPanel', SolarPanelSchema);

// Function to retrieve solar panel data by API key
const getSolarPanelByApiKey = async (apiKey) => {
  return SolarPanel.findOne({ apiKey });
};

module.exports = {
  SolarPanel,
  getSolarPanelByApiKey,
};


