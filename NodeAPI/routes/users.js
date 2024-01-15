var express = require('express');
const { usersGetAll, usersGetOne, usersCreateOne, usersDeleteOne } = require('../services/usersService');
var router = express.Router();


/* GET ALL USERS */
router.get('/', async function(req, res, next) {
  try {
    const allUsers = await usersGetAll();
    res.json(allUsers);
  } catch (error) {
    console.error('Error getting all users:', error);
    res.status(500).send('Internal Server Error');
  }
});

/* GET SINGLE USER*/
router.get('/:id', async function(req, res, next){
    const userId = req.params.id;
    try {
      const user = await usersGetOne(userId);
      res.json(user);
    } catch {
      console.error(`Error getting user:${userId}`, error);
      res.status(500).send('Internal Server Error');
    }
})

/* POST CREATE NEW USER. */
router.post('/', async function(req, res, next){
   const userData = req.body;
   try {
    const newUserId = await usersCreateOne(userData);
    res.send(`new user created with id: ${newUserId}`)
   } catch (error) {
    console.error(`Error creating new user`, error);
    res.status(500).send('Internal Server Error');
   }
 });

 /* PUT UPDATE USER. */
 router.put('/:id', function(req, res, next){
 
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
router.delete('/:id', async function(req, res, next){
  const userId = req.params.id;
  try {
    const deleteResult = await usersDeleteOne(userId);
    if (deleteResult === true){
      res.status(204).end();
    } else {
      res.status(404).json({ error: `User with ID ${userIdToDelete} not found or deletion unsuccessful` });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Internal Server Error');
  }
})


module.exports = router;
