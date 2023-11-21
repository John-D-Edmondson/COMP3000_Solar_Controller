// mockedData.js

const mockedSolarPanels = [
    {
      apiKey: '1111111111111111',
      longitude: "-4.1",
      latitude: "50.4"
    },

  ];
  
  // Mocked function to retrieve solar panel data by API key
  const getSolarPanelByApiKey = async (apiKey) => {
    return mockedSolarPanels.find(panel => panel.apiKey === apiKey) || null;
  };
  
  module.exports = {
    getSolarPanelByApiKey,
  };