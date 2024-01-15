// usersService.js
const User = require('../models/userModel'); // Adjust the path based on your project structure

const usersGetAll = async () => {
  try {
    const users = await User.find();
    console.log(users);
    return users;
  } catch (error) {
    console.error('Error fetching all users:', error);
  }
};

const usersGetOne = async (_id) => {
    try {
        const user = await User.findById(_id);
        console.log(user);
        return user;
    } catch (error) {
        console.error(`Error fetching user ${_id}`, error);
    }
}

const usersCreateOne = async (userData) => {
    try {
        const newUser = new User(userData);
        const savedUser = await newUser.save();
        return savedUser._id;
    } catch (error) {
        console.error(`Error creating user`, error);
    }
} 

const usersDeleteOne = async (_id) => {
    try{
        const deleteResult = await User.deleteOne({ _id: new ObjectId(_id) });
        if (deleteResult.ok === 1) {
            console.log(`User with ID ${_id} deleted successfully`);
            return true;
          } else {
            console.log(`User with ID ${_id} not found`);
            return false;
          }
    } catch(error) {
        console.error(`Error deleting user:${_id}`, error);
    }
}

module.exports = {
  usersGetAll,
  usersGetOne,
  usersCreateOne,
  usersDeleteOne,
};