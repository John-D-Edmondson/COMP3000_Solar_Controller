// panelsService.js
const { default: mongoose } = require('mongoose');
const Panel = require("../models/panelModel");

//GET ALL PANELS
const panelsGetAll = async () => {
    try {
      const result = await Panel.find().select('-apiKey');
    
      return result;
    } catch (error) {
      return { error: 'Internal Server Error', code:1 };
    }
  };

  // GET PANEL BY ID
const panelsGetOne = async (_id) => {
    try {
        const result = await Panel.findById(_id).select('-apiKey');

        if (!result){
            return {error: "No panel found with provided ID", code: 2}
        } else {
            return result;
        }
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
        // Handle CastError (e.g., invalid ObjectId format)
        return { error: "invalid id provided", code: 3}
        } else {
        // Handle other types of errors
        return { error:  'Internal Server Error', code:1};
        }
        
    }
}

// POST CREATE PANEL
const panelsCreateOne = async (panelData) => {
    try {

        const newPanel = new Panel(panelData);
        const savedPanel = await newPanel.save();
     
        return savedPanel._id;
    } catch (error) {
      console.log(error);
      // Check for a unique key violation (e.g., duplicate email)
      if (error.code === 11000 || error.code === 11001) {
        return { error: 'Duplicate key violation. User with the same key already exists.', code: 11000 };
      }
      
      if (error.name === 'ValidationError') {
        // Handle validation errors (e.g., required fields not provided)
        return { error: 'Validation error. Check the provided data.', code: 4, message: error.message };
      }
      // Handle other types of errors as needed
      // using code 1 to cover all other errors
      return { error: 'Internal Server Error', code:1 };
        
    }
} 

// DELETE PANEL BY ID
const panelsDeleteOne = async (_id) => {
    try{
        const result = await Panel.deleteOne({ _id: _id });
        console.log(result);

        if (result.deletedCount === 0) {
          return {error: "No panel found with provided ID", code: 2}
        } else {
          return {code: 4};
        }
    } catch(error) {
      
      if (error instanceof mongoose.Error.CastError) {
        // Handle CastError (e.g., invalid ObjectId format)
       return { error: "invalid id provided", code: 3}
      } else {
        // Handle other types of errors
        return { error:  'Internal Server Error', code:1};
      }
    }
}

const panelsUpdateOne = async (_id, panelData, session) => {
    try {
        
        // remove apiKey from data - cannot be updated
        const { apiKey, ...allowedUpdates } = panelData;
        const updatedPanel = await Panel.findOneAndUpdate(
          { _id },
          { $set: allowedUpdates },
          { new: true, runValidators: true, session  }
        ).select('-apiKey'); //to remove password
       
    
        if (!updatedPanel) {
          // User with the specified _id not found
          if (session) {
            await session.abortTransaction();
            session.endSession();
          }
          return { error: `Panel with ID ${_id} not found` };
        }
    
        return updatedPanel;
      } catch (error) {
        if (session) {
            await session.abortTransaction();
            session.endSession();
          }
        if (error.name === 'ValidationError') {
          // Handle validation errors (e.g., required fields not provided)
          return { error: 'Validation error. Check the provided data.', code: 4, message: error.message };
        }
        if (error instanceof mongoose.Error.CastError) {
          // Handle CastError (e.g., invalid ObjectId format)
         return { error: "invalid id provided", code: 3}
        } else {
          // Handle other types of errors
          return { error:  'Internal Server Error', code:1};
        }
    
        }
}

module.exports = {
    panelsCreateOne,
    panelsGetAll,
    panelsGetOne,
    panelsDeleteOne,
    panelsUpdateOne,
  };