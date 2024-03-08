var express = require('express');
const { usersGetAll, usersGetOne, usersCreateOne, usersDeleteOne, usersUpdateOne, usersAddPanel, usersRemovePanel } = require('../services/usersService');
const User = require('../models/userModel');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { verifyToken, verifyUserPasswordOnUpdate } = require('../middleware/authoriseMiddleware');

require('dotenv').config(); 


/* GET ALL USERS */
router.get('/', verifyToken, async function(req, res, next) {
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
      res.status(400).send({error: result.message});
    } else {
      // no errors send _id
      res.status(201).json({ _id: result });
    }

   } catch (error) {
  
    
    res.status(500).send('Internal Server Error');
   }
 });

 /* PUT UPDATE USER. */
 router.put('/:id', verifyToken, verifyUserPasswordOnUpdate, async function(req, res, next){
  const userId = req.params.id;
  const updatedData = req.body;
  try {
    const result = await usersUpdateOne(userId, updatedData);
    if (!result) {
      res.status(404).send({error: 'no user found'});
    } else if (result.code === 3) {
      res.status(400).send({error: "invald ID"});
    } else if (result.code === 4) {
      res.status(400).send({error: result.message});
    } else {
      res.status(200).send(({success: 'User updated'}));
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


router.put('/addpanel/:id', async function (req, res, next){
  
  const userId = req.params.id;
  const panels = req.body;
  console.log(userId);
  console.log(panels);
  try {
    const result = await usersAddPanel(userId, panels);
    if (result.success){
      res.status(200).json(result);
    } else if (result.error){
      res.status(404).json(result)
    }
  } catch (error){
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
})

router.put('/removepanel/:id', async function(req, res, next){
  const userId = req.params.id;
  const panels = req.body;
  console.log(userId);
  console.log(panels);
  try {
    const result = await usersRemovePanel(userId, panels);
    if (result.success){
      res.status(200).send(result.success);
    } else if (result.error){
      res.status(404).send(result.error)
    }
  } catch (error){
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
})

router.post('/login', async function(req, res, next) {
  const { email, password } = req.body;
  console.log("entering login");

  // Find user by email
  try {
    const user = await User.findOne({ 'email': email });
    const passwordMatch = await bcrypt.compare(password, user.password);
      // Check if user exists and password is correct
    if (user && passwordMatch) {
      // Generate a JWT
      console.log("user found and password matches");
      console.log(process.env.JWT_SECRET);

      const token = jwt.sign({ userId: user._id }, "Qq123456", { expiresIn: '1h' });
      console.log(token);

      res.cookie('token', token, { httpOnly: true });

      res.status(200).json({message: 'Successful login', userId: user._id});

    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }

});

router.get('/manage/nanage', verifyToken, async function (req, res, next){
    const userId = req.userId;
    console.log(userId);
    try {
      const user = await usersGetOne(userId);
      res.status(200).json(user);
    } catch (error){
      res.status(500).send('Internal Server error');
    }
})

module.exports = router;
