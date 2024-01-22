var express = require('express');
const { panelsCreateOne, panelsGetAll, panelsGetOne, panelsDeleteOne, panelsUpdateOne } = require('../services/panelsService');
var router = express.Router();

/* GET ALL PANELS */
router.get('/', async function(req, res, next) {
  try {
    const result = await panelsGetAll();
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error getting all users:', error);
    res.status(500).send('Internal Server Error');
  }
});

/* GET SINGLE PANEL*/
router.get('/:id', async function(req, res, next){
  const panelId = req.params.id;
  
  try {
    const result = await panelsGetOne(panelId);
    if (result.code === 2) {
      res.status(404).send({error: 'No panel found'});
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

/* POST CREATE NEW PANEL. */
router.post('/', async function(req, res, next){
  const panelData = req.body;
  try {
   const result = await panelsCreateOne(panelData);
   if (result.code === 11000) {
     // Handle specific error (e.g., duplicate key violation)
     res.status(400).json({ error: "existing apiKey" });
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

 /* PUT UPDATE PANEL. */
 router.put('/:id', async function(req, res, next){
  const panelId = req.params.id;
  const updatedData = req.body;
  try {
    const result = await panelsUpdateOne(panelId, updatedData);
    if (!result) {
      res.status(404).send({error: 'no panel found'});
    } else if (result.code === 3) {
      res.status(400).send({error: "invald ID"});
    } else if (result.code === 4) {
      res.status(400).send({error: result.message});
    } else {
      res.status(200).json(result);
    }
    
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }

});

 /* DELETE PANEL BY ID. */
router.delete('/:id', async function(req, res, next){
  const panelId = req.params.id;
  try {
    const result = await panelsDeleteOne(panelId);
    if (result.code == 2){
      res.status(404).json({ error: `panel not found or deletion unsuccessful` });
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
