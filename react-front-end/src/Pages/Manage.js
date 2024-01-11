// Manage.js
import React, { useState } from 'react';
import AddOrEditSolarPanelForm from '../Components/AddOrEditSolarPanelForm';
import UpdateDetailsForm from '../Components/UpdateDetailsForm';
import SolarPanelTable from '../Components/SolarPanelTable';
import UpdatePasswordForm from '../Components/UpdatePasswordForm';
import '../CSS/Manage.css';


const Manage = () => {

    const testUser = {
      firstName: 'Jeff',
      lastName: 'Stelling',
      email: 'jeff@stelling.com',
      userID: '12345'
    }

    //test data for sense check - will be from DB later
    const panelsData = [
        { id: '1', longitude: '12.34', latitude: '56.78' },
        { id: '2', longitude: '23.45', latitude: '67.89' },
    ];
    // #region states
    const [showSolarForm, setShowSolarForm] = useState(false);
    const [showUpdateDetailsForm, setShowUpdateDetailsForm] = useState(false);
    const [showUpdateSolarPanelForm, setShowUpdateSolarPanelForm] =useState(false);
    const [showUpdatePasswordForm, setShowUpdatePasswordForm] = useState(false);
    const [currentPanel, setCurrentPanel] = useState('');
    const [currentUser, setCurrentUser] = useState(testUser);
    // #endregion
   
    // #region button handlers
    const handleAddSolarPanelButton = () => {
        setShowSolarForm(true);
    }

    const handleUpdateMyDetailsButton = () => {
        setShowUpdateDetailsForm(true);
    }
    
    const handleDeleteMyDetailsButton = () => {
      const areYouSure = window.confirm("If you delete your record, all solar panels will be removed\nPress OK to delete or Cancel.");
      if (areYouSure){
        // handle delete registration
        console.log('deleting record');
      } else {
        console.log('user cancelled deletion');
      }
    }

    const handleUpdateSolarPanelButton = (panel) => {
      setShowUpdateSolarPanelForm(true);
      setCurrentPanel(panel);
    }

    const handleUpdatePasswordButton = () => {
      setShowUpdatePasswordForm(true);
    }
    // #endregion

    // #region updating/adding data
    const handleUpdateUserDetails = (formData) => {
        console.log(`updating user ${formData.userID}`); // Handle the form data as required
        setCurrentUser(formData);
        setShowUpdateDetailsForm(false); // Hide the form after submission
      };

    const handleUpdatePanelDetails = (formData) => {
        console.log(`Updating panel with ID: ${formData.id}`);
    }
      
    const handleAddSolarPanel = (formData) => {
      console.log(formData);
      console.log('adding solar panel');
    }

    const handleUpdatePassword = (formData) => {
      console.log(formData);
      console.log(`updating password for ${currentUser.userID}, old password ${formData.inputOldPassword}`)
    }

    const handleDeletePanel = (formData) => {
      const areYouSure = window.confirm("Are you sure you wish to delete?\nPress OK to delete or Cancel.");
      if (areYouSure){
        // handle delete registration
        console.log(`Deleting panel ${formData.id}`);
      } else {
        console.log(`user cancelled deletion of panel ${formData.id}`);
      }
      
    }
    // #endregion

    const handleCloseForm = () => {
        setShowSolarForm(false);
        setShowUpdateDetailsForm(false);
        setShowUpdateSolarPanelForm(false);
        setShowUpdatePasswordForm(false);
      };

  return (
    <div>
      <h2>Manage</h2>
      <p>{currentUser.firstName} {currentUser.lastName}</p>
      <p>{currentUser.email}</p>
      <SolarPanelTable panels={panelsData} onUpdatePanel={handleUpdateSolarPanelButton} onDeletePanel={handleDeletePanel} />
    
      {showSolarForm && (
        <div className="overlay" onClick={handleCloseForm}>
          <div className="form-container" onClick={(e) => e.stopPropagation()}>
            <AddOrEditSolarPanelForm onSubmit={handleAddSolarPanel} onCancel={handleCloseForm} />
          </div>
        </div>
      )}
      {showUpdateDetailsForm && (
        <div className="overlay" onClick={handleCloseForm}>
          <div className="form-container" onClick={(e) => e.stopPropagation()}>
            <UpdateDetailsForm userDetails={currentUser} onSubmit={handleUpdateUserDetails} onCancel={handleCloseForm} />
          </div>
        </div>
      )}
      {showUpdateSolarPanelForm && (
        <div className="overlay" onClick={handleCloseForm}>
          <div className="form-container" onClick={(e) => e.stopPropagation()}>
            <AddOrEditSolarPanelForm  existingPanel= {currentPanel} onSubmit={handleUpdatePanelDetails} onCancel={handleCloseForm} />
          </div>
        </div>
      )}
      {showUpdatePasswordForm && (
        <div className="overlay" onClick={handleCloseForm}>
          <div className="form-container" onClick={(e) => e.stopPropagation()}>
            <UpdatePasswordForm  userDetails= {currentUser} onSubmit={handleUpdatePassword} onCancel={handleCloseForm} />
          </div>
        </div>
      )}





        <button className="btn btn-lg btn-primary btn-block" onClick={handleAddSolarPanelButton}>
            Add Solar Panel
        </button>
        
        <button className="btn btn-lg btn-primary btn-block" onClick={handleUpdateMyDetailsButton}>
            Update My Details
        </button>
        <button className="btn btn-lg btn-primary btn-block" onClick={handleUpdatePasswordButton}>
            Update My Password
        </button>
        <button className="btn btn-lg btn-danger btn-block" onClick={handleDeleteMyDetailsButton}>
            Delete My Details
        </button>

    
    </div>
  );
};

export default Manage;