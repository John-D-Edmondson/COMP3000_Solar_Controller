let port = 8080;
let express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const suncalc = require('suncalc');
const { getSolarPanelByApiKey } = process.env.NODE_ENV === 'mock' ? require('./tests/mockedData') : require('./SolarPanel');



let app = express();
app.use(bodyParser.json());

// MongoDB connection setup (replace with your actual MongoDB connection string)
mongoose.connect('mongodb+srv://johnedmondson83:Password@cluster0.zliwnea.mongodb.net/SolarTilt', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello there!!' });
});

app.post('/calculate-ideal-angle', async (req, res) => {
    const { apiKey } = req.body;
    console.log(apiKey);
    
    try {
      const solarPanel = await getSolarPanelByApiKey(apiKey);
  
      if (!solarPanel) {
        return res.status(404).json({ error: 'Solar panel not found' });
      }

      const currentDate = new Date();

      // Calculate solar position using SunCalc
      const { altitude, azimuth } = suncalc.getPosition(currentDate, solarPanel.latitude, solarPanel.longitude);
      const adjustedAltitude = altitude * (180/Math.PI);
      const adjustedAzimuth = (azimuth * (180 / Math.PI) + 180) % 360;
      res.json({ elevation: adjustedAltitude, azimuth: adjustedAzimuth });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


app.listen(port, () => {
 console.log('Running on port: ' + port);
});

module.exports = app;