import React, { useState } from 'react';
import { isAtLeastTwoLetter, isValidEmail } from '../helper/regex';


const UpdateDetailsForm = ({ userDetails, onSubmit, onCancel }) => {

  const [validFirstName, setValidFirstName] = useState(true);
  const [validLastname, setValidLastName] = useState(true);
  const [validEmail, setValidEmail] = useState(true);

  const [formData, setFormData] = useState({
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    email: userDetails.email,
    userID: userDetails.userID
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setValidEmail(true);
    setValidFirstName(true);
    setValidLastName(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validForm = true;
    if(!isAtLeastTwoLetter(formData.firstName)){
      setValidFirstName(false);
      validForm = false;
    }
    if(!isAtLeastTwoLetter(formData.lastName)){
      setValidLastName(false);
      validForm = false;
    }
    if(!isValidEmail(formData.email)){
      setValidEmail(false);
      validForm = false;
    }
    if(!validForm) return;

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
        {!validFirstName && <p style={{ color: 'red' }}>Letters only, at least two</p>}
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
        {!validLastname && <p style={{ color: 'red' }}>Letters only, at least two</p>}
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
        {!validEmail && <p style={{ color: 'red' }}>Valid email required</p>}
      </div>
      <button className="btn btn-primary" type="submit">Update</button>
      <button className="btn btn-danger" type="button" onClick={handleCancel}>Cancel</button>
      </form>
  );
};

export default UpdateDetailsForm;