var express = require('express');
var router = express.Router();

/* GET ALL USERS */
router.get('/', function(req, res, next) {
  res.send('getting all users');
});

/* GET SINGLE USER*/
router.get('/:id', function(req, res, next){
    // Extract the id parameter from the URL
    const userId = req.params.id;    // Send a response with the extracted id
    res.send(`Getting user ${userId}`);
})

/* POST CREATE NEW USER. */
router.post('/', function(req, res, next){
   // Extracting data from the request body
   const { firstName, lastName, email } = req.body;
   const userId = 'not implemented'; 
   res.send(`${firstName} ${lastName}, ${email} is created with an ID number of ${userId}`);
 });

 /* PUT UPDATE USER. */
 router.put('/:id', function(req, res, next){
  // Extracting data from the request body
  const userId = req.params.id;
  const updatedData = req.body;
  // Constructing a response message with all fields from updatedData
  let responseMessage = `User ${userId} updated - Data: `;
  for (const key in updatedData) {
    if (Object.hasOwnProperty.call(updatedData, key)) {
      responseMessage += `${key}: ${updatedData[key]}, `;
    }
  }
  
    // Removing the trailing comma and space
    const trimmedResponse = responseMessage.slice(0, -2);
  res.send(trimmedResponse);
});

 /* DELETE USER BY ID. */
router.delete('/:id', function(req, res, next){
  const userId = req.params.id;    // Send a response with the extracted id
  res.send(`deleting user ${userId}`);
})


module.exports = router;
