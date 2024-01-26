// Manage.js
import React, { useState, useEffect } from 'react';
import AddOrEditSolarPanelForm from '../Components/AddOrEditSolarPanelForm';
import UpdateDetailsForm from '../Components/UpdateDetailsForm';
import SolarPanelTable from '../Components/SolarPanelTable';
import UpdatePasswordForm from '../Components/UpdatePasswordForm';
import '../CSS/Manage.css';
import userService from '../services/userService';
import panelService from '../services/panelService';
import AddSolarPanelForm from '../Components/AddSolarPanelForm';



const Manage = () => {

  // load user uses an http only token aor authorisation. Then loads panel data from user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await userService.userManage();
        // Update the currentUser state with the fetched data
        
        if (userData){
          await setCurrentUser(userData);
          fetchPanelData(userData.panels);
        }
      } catch (error) {
        // Handle errors, e.g., display an error message
        console.error('Error fetching user data:', error.message);
      }
    };

    const fetchPanelData = async (ids) => {
      if (!ids) return;
      if (ids.length === 0) return;
      try {
        // Use Promise.all to concurrently fetch panel data for each ID
        const panelPromises = ids.map(panelId => panelService.panelGet(panelId));
        const panelDataArray = await Promise.all(panelPromises);
        
    
        // Now panelDataArray contains the fetched panel data for each ID
        // Update the userPanels state with the collected data
        await setUserPanels(panelDataArray);
    
      } catch (error) {
        // Handle errors here
        console.error('Error fetching panel data:', error.message);
      }
    }

    // Call the fetchUserData function when the component mounts
     fetchUserData();


  }, []);

    // #region states
    const [showSolarForm, setShowSolarForm] = useState(false);
    const [showUpdateDetailsForm, setShowUpdateDetailsForm] = useState(false);
    const [showUpdateSolarPanelForm, setShowUpdateSolarPanelForm] =useState(false);
    const [showUpdatePasswordForm, setShowUpdatePasswordForm] = useState(false);
    const [currentPanel, setCurrentPanel] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [userPanels, setUserPanels] = useState('');

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

    const handleUpdateSolarPanelButton = async (panel) => {
      console.log(panel);
      await setCurrentPanel(panel);
      console.log(currentPanel);
      setShowUpdateSolarPanelForm(true);
      
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

    const handleUpdatePanelDetails = async (formData) => {
        console.log(`Updating panel with ID: ${formData._id}`);
        try {
          const resultUpdatePanel = await panelService.panelUpdate(formData);
          console.log(resultUpdatePanel);
          setUserPanels((prevPanels) =>
          prevPanels.map((panel) =>
            panel._id === formData._id ? { ...panel, longitude: formData.longitude, latitude: formData.latitude } : panel
          )
        );

        } catch (error) {
          console.log(`error updating panel : ${error}`);
        }
    }
      
    const handleAddSolarPanel = async (panelId) => {
      console.log('adding solar panel');
      try {
        const resultAddPanel = await panelService.panelAdd(currentUser._id, panelId);
        console.log(resultAddPanel);
        if (resultAddPanel.error){
           if(resultAddPanel.status === 404) {
            alert(`panel ${panelId} not found, please check and try again`);
           } else if (resultAddPanel.status === 500){
            alert(`Panel not added, unable to communicate with server`);
           } else if (resultAddPanel.status === 405){
            alert(`panel ${panelId} is already owned`);
           }
        } else {
          setUserPanels((prevPanels) => [...prevPanels, {_id:panelId}]);
        }
      } catch (error){
        console.log(error);
      }


    }

    const handleUpdatePassword = (formData) => {
      console.log(formData);
      console.log(`updating password for ${currentUser.userID}, old password ${formData.inputOldPassword}`)
    }

    const handleDeletePanel = async (panelId) => {
      const areYouSure = window.confirm("Are you sure you wish to delete?\nPress OK to delete or Cancel.");
      if (areYouSure){
        // handle delete registration
        console.log(`Deleting panel ${panelId}`);
        try {
          const resultDeletePanel = await panelService.panelRemove(currentUser._id, panelId);
          console.log(resultDeletePanel);
          if(resultDeletePanel.status === 200){
            setUserPanels(userPanels.filter((panel) => panel._id !== panelId));
          } else if (resultDeletePanel.status === 500) {
            alert("Could not contact server, panel not deleted");
          }

        }catch(error){
          console.log(`error deleting panel: ${error}`);
        }
      } else {
        console.log(`user cancelled deletion of panel ${panelId}`);
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
      {currentUser === null ? (
      <h2>Error getting data</h2>
    ) : (
      <>
      <h2>Manage</h2>
      <p>{currentUser.firstName} {currentUser.lastName}</p>
      <p>{currentUser.email}</p>
      <SolarPanelTable panels={userPanels} onUpdatePanel={handleUpdateSolarPanelButton} onDeletePanel={handleDeletePanel} />
    
      {showSolarForm && (
        <div className="overlay" onClick={handleCloseForm}>
          <div className="form-container" onClick={(e) => e.stopPropagation()}>
            <AddSolarPanelForm onSubmit={handleAddSolarPanel} onCancel={handleCloseForm} />
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
    </>
    )}
    </div>
  );
};

export default Manage;