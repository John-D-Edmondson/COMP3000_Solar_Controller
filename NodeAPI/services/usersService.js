// usersService.js
const { default: mongoose } = require('mongoose');
const User = require('../models/userModel'); // Adjust the path based on your project structure


const usersGetAll = async () => {
  try {
    const result = await User.find();
    return result;
  } catch (error) {
    return { error: 'Internal Server Error', code:1 };
  }
};

const usersGetOne = async (_id) => {
    try {
        const result = await User.findById(_id);
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
        console.log(savedUser);
        return savedUser._id;
    } catch (error) {
      console.log(error);
      // Check for a unique key violation (e.g., duplicate email)
      if (error.code === 11000 || error.code === 11001) {
        return { error: 'Duplicate key violation. User with the same key already exists.', code: 11000 };
      }
      
      if (error.name === 'ValidationError') {
        // Handle validation errors (e.g., required fields not provided)
        return { error: 'Validation error. Check the provided data.', code: 4 };
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

const usersUpdateOne = async (_id, userData) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id },
      { $set: userData },
      { new: true, runValidators: true }
    ); //.select('-password'); to remove password
    console.log(updatedUser);

    if (!updatedUser) {
      // User with the specified _id not found
      return { error: `User with ID ${_id} not found` };
    }

    return updatedUser;
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      // Handle CastError (e.g., invalid ObjectId format)
     return { error: "invalid id provided", code: 3}
    } else {
      // Handle other types of errors
      return { error:  'Internal Server Error', code:1};
    }

    // if (error.name === 'ValidationError') {
    //   // Handle validation errors (e.g., required fields not provided)
    //   return { error: 'Validation error. Check the provided data.' };
    // }

  }
}

module.exports = {
  usersGetAll,
  usersGetOne,
  usersCreateOne,
  usersDeleteOne,
  usersUpdateOne,
};