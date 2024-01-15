var express = require('express');
var router = express.Router();

/* GET ALL PANELS */
router.get('/', function(req, res, next) {
  res.send('getting all panels');
});

/* GET SINGLE PANEL*/
router.get('/:id', function(req, res, next){
    // Extract the id parameter from the URL
    const panelId = req.params.id;    // Send a response with the extracted id
    res.send(`Getting panel ${panelId}`);
})

/* POST CREATE NEW PANEL. */
router.post('/', function(req, res, next){
   // Extracting data from the request body
   const { serialNumber } = req.body;
   const panelId = 'not implemented'; 
   res.send(`${serialNumber} is created with an ID number of ${panelId}`);
 });

 /* PUT UPDATE PANEL. */
 router.put('/:id', function(req, res, next){
  // Extracting data from the request body
  const panelId = req.params.id;
  const updatedData = req.body;
  let responseMessage = `Panel: ${panelId} updated - Data: `;
  for (const key in updatedData) {
    if (Object.hasOwnProperty.call(updatedData, key)) {
      responseMessage += `${key}: ${updatedData[key]}, `;
    }
  }
  
    // Removing the trailing comma and space
    const trimmedResponse = responseMessage.slice(0, -2);
  res.send(trimmedResponse);

});

 /* DELETE PANEL BY ID. */
router.delete('/:id', function(req, res, next){
  const panelId = req.params.id;    // Send a response with the extracted id
  res.send(`deleting panel ${panelId}`);
})


module.exports = router;
