const mongoose = require('mongoose');

const SolarPanelSchema = new mongoose.Schema({
  panelID: Number,
  apiKey: String,
  latitude: String,
  longitude: String,
  customerID: Number
});

const Panel = mongoose.model('Panel', SolarPanelSchema);

// Function to retrieve solar panel data by API key
const getSolarPanelByApiKey = async (apiKey) => {
  console.log(apiKey);
  return Panel.findOne({ apiKey });
};

module.exports = {
  Panel,
  getSolarPanelByApiKey,
};


