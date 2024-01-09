// Manage.js
import React, { useState } from 'react';
import AddSolarPanelForm from '../Components/AddSolarPanelForm';
import UpdateDetailsForm from '../Components/UpdateDetailsForm';
import '../CSS/Manage.css';


const Manage = () => {

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

    }

    const handleCloseForm = () => {
        setShowSolarForm(false);
        setShowUpdateDetailsForm(false);
      };
    


  return (
    <div>
      <h2>Manage</h2>
      <p>First Name + Last name</p>
      <ul>
        <li>Solar panel 1</li><button className="btn btn-secondary">Change location</button>
        <li>Solar panel 2</li><button className="btn btn-secondary">Change location</button>
      </ul>

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