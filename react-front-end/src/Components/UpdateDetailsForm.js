import React, { useState } from 'react';

const UpdateDetailsForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
  });

  const handleInputChange = (e) => {
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
        firstName:'',
        lastName:'',
        email:'',
    });
  };

  const handleCancel = () => {
    setFormData({
        firstName:'',
        lastName:'',
        email:'',
    });
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
        <h3>Update Details</h3>
       <div className="form-label-group">
        <input 
          type="text" 
          id="inputFirstName" 
          className="form-control" 
          placeholder="First Name" 
          required autoFocus
          name='firstName'
          value={formData.firstName}
          onChange={handleInputChange} 
          />
        <label htmlFor="inputFirstName">First Name</label>
      </div>
      <div className="form-label-group">
        <input 
          type="text" 
          id="inputLastName" 
          className="form-control" 
          placeholder="Last Name" 
          required 
          name='lastName'
          value={formData.lastName}
          onChange={handleInputChange} 
          />
          
        <label htmlFor="inputLastName">Last Name</label>
      </div>
      <div className="form-label-group">
        <input 
          type="email" 
          id="inputEmail" 
          className="form-control" 
          placeholder="Email address" 
          required 
          name='email'
          value={formData.email}
          onChange={handleInputChange} 
          />    
        <label htmlFor="inputEmail">Email address</label>
      </div>
      <button className="btn btn-primary" type="submit">Update</button>
      <button className="btn btn-danger" type="button" onClick={handleCancel}>Cancel</button>
      </form>
  );
};

export default UpdateDetailsForm;