var express = require('express');
const { usersGetAll, usersGetOne, usersCreateOne, usersDeleteOne, usersUpdateOne } = require('../services/usersService');
var router = express.Router();


/* GET ALL USERS */
router.get('/', async function(req, res, next) {
  try {
    const result = await usersGetAll();

    if (result.code === 1) {
      res.status(500).send({error: 'Internal server error'});
    } else {
      res.status(200).json(result);
    }
    
  } catch (error) {
    console.error('Error getting all users:', error);
    res.status(500).send('Internal Server Error');
  }
});

/* GET SINGLE USER*/
router.get('/:id', async function(req, res, next){
    const userId = req.params.id;
    console.log(userId);
    try {
      const result = await usersGetOne(userId);
      if (result.code === 2) {
        res.status(404).send({error: 'No user found'});
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      console.log(error);
      if (error.code === 3) {
        res.status(400).send({error: "invald ID"});
      } else {
        res.status(500).send('Internal Server Error');
      }
  }
})

/* POST CREATE NEW USER. */
router.post('/', async function(req, res, next){
   const userData = req.body;
   try {
    const result = await usersCreateOne(userData);

    if (result.code === 11000) {
      // Handle specific error (e.g., duplicate key violation)
      res.status(400).json({ error: "existing email" });
    } else if (result.code === 1) {
      res.status(500).send({error: 'Internal Server Error'});
    } else if (result.code === 4) {
      res.status(400).send({error: "data failed validation"});
    } else {
      // no errors send _id
      res.status(201).json({ _id: result });
    }

   } catch (error) {
    
    res.status(500).send('Internal Server Error');
   }
 });

 /* PUT UPDATE USER. */
 router.put('/:id', async function(req, res, next){
  const userId = req.params.id;
  const updatedData = req.body;
  try {
    const result = await usersUpdateOne(userId, updatedData);
    if (!result) {
      res.status(404).send({error: 'no user found'});
    } else if (result.code === 3) {
      res.status(400).send({error: "invald ID"});
    } else {
      res.status(200).json(result);
    }
    
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

 /* DELETE USER BY ID. */
router.delete('/:id', async function(req, res, next){
  const userId = req.params.id;
  console.log(userId);
  try {
    const result = await usersDeleteOne(userId);
    console.log(result.code);
    if (result.code == 2){
      res.status(404).json({ error: `User not found or deletion unsuccessful` });
    } else if (result.code == 3) {
      res.status(400).send({error: "invald ID"});
    }  
    else {
      res.status(204).end();
    }
  } catch (error) {
    console.log(error);
      res.status(500).send('Internal Server Error');
  }
})


module.exports = router;
