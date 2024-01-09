import React, { useState } from 'react';

const AddSolarPanelForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    longitude: '',
    latitude: '',
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
    onSubmit(formData);
    setFormData({
      id: '',
      longitude: '',
      latitude: '',
    });
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
          required 
        />
      </div>
      <div>
        <label>Longitude:</label>
        <input 
          placeholder='Enter Longitude'
          className='form-control'
          type="text" 
          name="longitude" 
          value={formData.longitude}
          onChange={handleChange}
          required 
        />
      </div>
      <div>
        <label>Latitude:</label>
        <input 
          placeholder='Enter Latitude'
          className='form-control'
          type="text" 
          name="latitude" 
          value={formData.latitude}
          onChange={handleChange}
          required 
        />
      </div>
      <button class="btn btn-primary" type="submit">Add</button>
      <button class="btn btn-danger" type="button" onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default AddSolarPanelForm;