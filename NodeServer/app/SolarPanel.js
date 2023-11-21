const mongoose = require('mongoose');

const SolarPanelSchema = new mongoose.Schema({
  apiKey: String,
  latitude: String,
  longitude: String,
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


