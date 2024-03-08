// userService.js

const BASE_URL = 'http://localhost:3001'; // Update with your API base URL

const userService = {
  userRegister: async (formData) => {
    try {
      const response = await fetch(`${BASE_URL}/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Handle non-successful response (e.g., server error, validation error)
        const errorData = await response.json();

        throw new Error(errorData.message || 'User registration failed');
      }

      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error('Error during user registration:', error.message);
      throw error;
    }
  },
  userLogin: async (formData) => {
    console.log(formData);
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.status === 200) {
        // Parse the JSON body of the response
        const responseData = await response.json();
  
        // Return an object containing the status and data
        return {
          success: true,
          data: responseData,
        };
      } else {
        return {
          success: false,
          data: await response.text()
        }
      }
      
    } catch (error) {
      console.error('Error during login:', error.message);
      return(error); 
     
    }
  },
  userManage: async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/users/manage/nanage`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
      });
      if (response.status === 200) {
        const userData = await response.json();
        return userData;
      } else {
        return (response.message);
      }
    } catch(error) {
      console.log(`error getting user details: ${error.message}`);
    }
  },
  userUpdateDetails: async (formData) => {
    try {
        const response = await fetch(`${BASE_URL}/users/${formData._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.status === 200) {
          // Handle non-successful response (e.g., server error, validation error)
          const errorData = await response.json();
  
          throw new Error(errorData.message || 'User update failed');
        }
  
        const resultUpdateUser = await response.json();
        console.log(resultUpdateUser);
        return ({message: resultUpdateUser, status: response.status});
      } catch (error) {
        console.error('error updating user', error.message);
        throw error;
      }

  },
  userUpdatePassword: async (formData) => {
    try {
        const response = await fetch(`${BASE_URL}/users/${formData._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          credentials:"include",
        });
  
        if (!response.status === 200) {
          // Handle non-successful response (e.g., server error, validation error)
          const errorData = await response.json();
  
          throw new Error(errorData.message || 'User update failed');
        }
  
        const resultUpdateUser = await response.json();
        console.log(resultUpdateUser);
        return ({message: resultUpdateUser, status: response.status});
      } catch (error) {
        console.error('error updating user', error.message);
        throw error;
      }

  },

};

export default userService;