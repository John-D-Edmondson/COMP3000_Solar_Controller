import React, { useState } from 'react';
import { isValidLatitude, isValidLongitude } from '../helper/regex';

const AddOrEditSolarPanelForm = ({ existingPanel= {}, onSubmit, onCancel }) => {

  const isEditMode = !!existingPanel.id;
  const [validLatitude, setValidLatitude] = useState(true);
  const [validLongitude, setvalidLongitude] = useState(true);


  const [formData, setFormData] = useState({
    id: isEditMode ? existingPanel.id : '',
    longitude: isEditMode ? existingPanel.longitude : '',
    latitude: isEditMode ? existingPanel.latitude : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!isValidLongitude(formData.longitude)){
      setvalidLongitude(false);
      setFormData((prevData) => ({
        ...prevData,
        longitude: '',
      }));
    } else {
      setvalidLongitude(true);
    }

    if(!isValidLatitude(formData.latitude)){
      setValidLatitude(false);
      setFormData((prevData) => ({
        ...prevData,
        latitude: '',
      }));
    } else {
      setValidLatitude(true);
    }

    if(!isValidLongitude(formData.longitude) || !isValidLatitude(formData.latitude)){
      return;
    }
    onSubmit(formData);
    onCancel();
  };

  const handleCancel = () => {
    setFormData({
      id: '',
      longitude: '',
      latitude: '',
    });
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
        <h3>Add Solar Panel</h3>
      <div>
      <label htmlFor='inputId'>ID Number:</label>
        <input
          placeholder='Solar Panel ID'
          id='inputId'
          className='form-control'
          type="text" 
          name="id" 
          value={formData.id}
          onChange={handleChange}
          disabled={isEditMode} // Disable if in edit mode
          required 
        />
      </div>
      <div>
        <label htmlFor="enterLongitude">Longitude as XX.XX:</label>
        <input 
          id="enterLongitude"
          className='form-control'
          type="text" 
          name="longitude" 
          placeholder="Longitude"
          value={formData.longitude}
          onChange={handleChange}
          required 
        />
         {!validLongitude && <p style={{ color: 'red' }}>Must be in format of XX.XX between -180 to 180</p>}
      </div>
     
      <div>
        <label htmlFor='enterLatitude'>Latitude as XX.XX:</label>
        <input 
          className='form-control'
          id='enterLatitude'
          type="text" 
          name="latitude" 
          placeholder='Latitude'
          value={formData.latitude}
          onChange={handleChange}
          required 
        />
         {!validLatitude && <p style={{ color: 'red' }}>Must be in format of XX.XX between -90 to 90</p>}
      </div>
      <button className="btn btn-primary" type="submit">{isEditMode ? 'Update' : 'Add' }</button>
      <button className="btn btn-danger" type="button" onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default AddOrEditSolarPanelForm;