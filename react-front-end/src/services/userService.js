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
//   userUpdateDetails: async (formData) => {

//     try {
//         const response = await fetch(`${BASE_URL}/users/`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(formData),
//         });
  
//         if (!response.ok) {
//           // Handle non-successful response (e.g., server error, validation error)
//           const errorData = await response.json();
  
//           throw new Error(errorData.message || 'User registration failed');
//         }
  
//         const userData = await response.json();
//         return userData;
//       } catch (error) {
//         console.error('Error during user registration:', error.message);
//         throw error;
//       }

//   },
};

export default userService;