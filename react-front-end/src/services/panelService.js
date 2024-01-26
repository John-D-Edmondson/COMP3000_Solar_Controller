// panelService.js

import { json } from "react-router-dom";

const BASE_URL = 'http://localhost:3001'; // Update with your API base URL

const panelService = {
    panelGet: async (_id) => {
        try {
          const response = await fetch(`${BASE_URL}/panels/${_id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (!response.ok) {
            // Handle non-successful response (e.g., server error, validation error)
            const errorData = await response.json();
    
            throw new Error(errorData.message || 'User registration failed');
          }
    
          const panelData = await response.json();
          return panelData;
        } catch (error) {
          console.error('Error getting panel data:', error.message);
          throw error;
        }
      },
    panelAdd: async (userId, panelData) => {
   
      try {
        const response = await fetch(`${BASE_URL}/users/addpanel/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            panels: panelData,
          }),
        });
        
        if (response.status === 404) {
          const errorData = await response.json();
          if(errorData.error === "Panel has existing user"){
            return ({error: 'panel Id already owned', status:405})
          } else {
            return ({error: 'panel Id not found', status:404})
          }          
        }
      
        const resultPanelData = await response.json();
        return resultPanelData;
      } catch (error) {
        console.error('Error adding panel:', error.status);
        return { error: 'An unexpected error occurred.', status: 500 };
      }
      },
    panelRemove: async (userId, panelData) => {
      try {
        const response = await fetch(`${BASE_URL}/users/removepanel/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            panels: panelData,
          }),
        });
        return {status:response.status};
      } catch (error) {
        console.error('Error removing panel:', error);
        return { error: 'An unexpected error occurred.', status: 500 };
      }
      },
    panelUpdate: async (panelData) => {
      try {
        const response = await fetch(`${BASE_URL}/panels/${panelData._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            longitude: panelData.longitude,
            latitude: panelData.latitude
          }),
        });
        return {status:response.status};
      } catch (error) {
        console.error('Error removing panel:', error);
        return { error: 'An unexpected error occurred.', status: 500 };
      }
    }
};

export default panelService;