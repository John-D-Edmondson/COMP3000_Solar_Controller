// usersService.js
const { default: mongoose } = require('mongoose');
const User = require('../models/userModel'); // Adjust the path based on your project structure
const { panelsGetOne, panelsUpdateOne } = require('./panelsService');
const Panel = require('../models/panelModel');


const usersGetAll = async () => {
  try {
    const result = await User.find().select('-password');
    return result;
  } catch (error) {
    return { error: 'Internal Server Error', code:1 };
  }
};

const usersGetOne = async (_id) => {
    try {
        const result = await User.findById(_id).select('-password');
        if (!result){
          return {error: "No user found with provided ID", code: 2}
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

const usersCreateOne = async (userData) => {
    try {
        const newUser = new User(userData);
        const savedUser = await newUser.save();
     
        return savedUser._id;
    } catch (error) {
      console.log(error)
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

const usersDeleteOne = async (_id) => {
    try{
        const result = await User.deleteOne({ _id: _id });
        console.log(result);

        if (result.deletedCount === 0) {
          return {error: "No user found with provided ID", code: 2}
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

const usersUpdateOne = async (_id, userData, session) => {
  try {
    console.log(_id);
    const updatedUser = await User.findOneAndUpdate(
      { _id },
      { $set: userData },
      { new: true, runValidators: true, session }
    ).select('-password'); //to remove password

    console.log(updatedUser);

    if (!updatedUser) {
      // User with the specified _id not found
      if (session) {
        await session.abortTransaction();
        session.endSession();
      }
      return { error: `User with ID ${_id} not found` };
    }
    console.log(updatedUser);
    return updatedUser;
  } catch (error) {
    console.log(error);
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

const usersAddPanel = async (_id, panels) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Check that panel does not have an existing userId
    const panelToUpdate = await Panel.findById(panels.panels);
    if(panelToUpdate) {
      if(panelToUpdate.userId){
        return {error: 'Panel has existing user'};
      }
    }
    //update user, session updates within the method if failure
    const resultUpdateUser = await usersUpdateOne(_id, panels, session);
    if(resultUpdateUser.error){
      return resultUpdateUser;
    }
    //update panel, session updates within the method if failure
    const resultUpdatePanel = await panelsUpdateOne(panels.panels, { userId: _id}, session);
    if(resultUpdatePanel.error) {
      return resultUpdatePanel;
    }

    //commit after success only
    await session.commitTransaction();
    session.endSession();

    return { success: 'Panel added to user and updated successfully' };

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error('Error in usersAddPanel:', error);
    return { error: 'Internal Server Error' };
  }
}

const usersRemovePanel = async (_id, panels) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {

    //Check that user owns the panel
    const resultFindUser = await User.findById(_id);
    if (resultFindUser && resultFindUser.panels) {
      // User has panels
      if (!resultFindUser.panels.includes(panels.panels)) {
        // PanelId is in the array
        return {error: 'PanelId not owned by user, please check data'}
    }
  }

  //Update the user - update only saved if panel updated
    const resultUpdateUser = await User.findOneAndUpdate(
                                          { _id: _id },
                                          { $pull: panels },
                                          { new: true },
                                        );

    if(!resultUpdateUser){
      session.abortTransaction();
      session.endSession();
      return {error: 'userId not found'};
    }
    // update panel with null for userId
    const resultUpdatePanel = await panelsUpdateOne(panels.panels, { userId: null}, session);
    console.log(resultUpdatePanel)
    if(resultUpdatePanel.error) {
      return resultUpdatePanel;
    }

    //commit only when both transactions complete
    await session.commitTransaction();
    session.endSession();

    return { success: 'Panel removed from user and updated successfully' };

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error('Error in usersAddPanel:', error);
    return { error: 'Internal Server Error' };
  }
}

module.exports = {
  usersGetAll,
  usersGetOne,
  usersCreateOne,
  usersDeleteOne,
  usersUpdateOne,
  usersAddPanel,
  usersRemovePanel,
};