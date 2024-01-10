// Manage.js
import React, { useState } from 'react';
import AddSolarPanelForm from '../Components/AddSolarPanelForm';
import UpdateDetailsForm from '../Components/UpdateDetailsForm';
import SolarPanelTable from '../Components/SolarPanelTable';
import '../CSS/Manage.css';


const Manage = () => {

    //test data for sense check - will be from DB later
    const panelsData = [
        { id: '1', longitude: '12.34', latitude: '56.78' },
        { id: '2', longitude: '23.45', latitude: '67.89' },
    ];

    const [showSolarForm, setShowSolarForm] = useState(false);
    const [showUpdateDetailsForm, setShowUpdateDetailsForm] = useState(false);

    const handleAddSolarPanel = () => {
        setShowSolarForm(true);
    }

    const handleUpdateMyDetails = () => {
        setShowUpdateDetailsForm(true);
    }

    const handleFormSubmit = (formData) => {
        console.log(formData); // Handle the form data as required
        setShowSolarForm(false); // Hide the form after submission
      };


    const handleDeleteMyDetails = () => {
      const areYouSure = window.confirm("If you delete your record, all solar panels will be removed\nPress OK to delete or Cancel.");
      if (areYouSure){
        // handle delete registration
        console.log('deleting record');
      } else {
        console.log('user cancelled deletion');
      }
    }

    const handleCloseForm = () => {
        setShowSolarForm(false);
        setShowUpdateDetailsForm(false);
      };

      
    const handleUpdatePanel = (panelId) => {
      // Your update logic here
      console.log(`Updating panel with ID: ${panelId}`);
  }
    


  return (
    <div>
      <h2>Manage</h2>
      <p>First Name + Last name</p>
      <SolarPanelTable panels={panelsData} onUpdatePanel={handleUpdatePanel} />
      

      {showSolarForm && (
        <div className="overlay" onClick={handleCloseForm}>
          <div className="form-container" onClick={(e) => e.stopPropagation()}>
            <AddSolarPanelForm onSubmit={handleFormSubmit} onCancel={handleCloseForm} />
          </div>
        </div>
      )}
      {showUpdateDetailsForm && (
        <div className="overlay" onClick={handleCloseForm}>
          <div className="form-container" onClick={(e) => e.stopPropagation()}>
            <UpdateDetailsForm onSubmit={handleFormSubmit} onCancel={handleCloseForm} />
          </div>
        </div>
      )}
        <button className="btn btn-lg btn-primary btn-block" onClick={handleAddSolarPanel}>
            Add Solar Panel
        </button>
        
        <button className="btn btn-lg btn-primary btn-block" onClick={handleUpdateMyDetails}>
            Update My Details
        </button>
        <button className="btn btn-lg btn-primary btn-block" onClick={handleDeleteMyDetails}>
            Delete My Details
        </button>

    
    </div>
  );
};

export default Manage;