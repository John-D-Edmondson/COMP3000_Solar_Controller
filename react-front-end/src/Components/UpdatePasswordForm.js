import React, { useState } from 'react';
import {isValidPassword} from '../helper/regex.js'

const UpdatePasswordForm = ({onSubmit, onCancel }) => {
    const [validPassword, setValidPassword] = useState(true);
    const [validMatchPassword, setValidMatchPassword] = useState(true);


  const [formData, setFormData] = useState({
    inputOldPassword: '',
    inputNewPassword: '',
    inputNewPasswordRetype: ''
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
    if(!isValidPassword(formData.inputNewPassword)){
        setValidPassword(false);
        
    }
    if(formData.inputNewPassword !== formData.inputNewPasswordRetype) {
        setValidMatchPassword(false);

    }

    if(!isValidPassword(formData.inputNewPassword) || formData.inputNewPassword !== formData.inputNewPasswordRetype){
        setFormData({
            inputOldPassword: '',
            inputNewPassword: '',
            inputNewPasswordRetype: ''
        });
        return;
    }

    
    onSubmit(formData);
    onCancel();
 
  };

  const handleCancel = () => {
    setFormData({
        inputOldPassword: '',
        inputNewPassword: '',
        inputNewPasswordRetype: ''
    });
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
        <h3>Update Password</h3>
        <div className="form-label-group">
        <input 
          type="password" 
          id="inputOldPassword" 
          className="form-control" 
          placeholder="Old Password" 
          required autoFocus
          name='inputOldPassword'
          value={formData.inputOldPassword}
          onChange={handleInputChange}
          />
        <label htmlFor="inputOldPassword">Old Password</label>
      </div>
      <div className="form-label-group">
        <input 
          type="password" 
          id="inputNewPassword" 
          className="form-control" 
          placeholder="New Password" 
          required
          name='inputNewPassword'
          value={formData.inputNewPassword}
          onChange={handleInputChange}
          />
        <label htmlFor="inputNewPassword">New Password</label>
        {!validPassword && <p style={{ color: 'red' }}>Must be 8 characters and include capital and number.</p>}
      </div>
      <div className="form-label-group">
        <input 
          type="password" 
          id="inputNewPasswordRetype" 
          className="form-control" 
          placeholder="Retype New Password" 
          required
          name='inputNewPasswordRetype'
          value={formData.inputNewPasswordRetype}
          onChange={handleInputChange}
          />
        <label htmlFor="inputNewPasswordRetype">Retype New Password</label>
        {!validMatchPassword && <p style={{ color: 'red' }}>Passwords must match</p>}
      </div>
      <button className="btn btn-primary" type="submit">Update</button>
      <button className="btn btn-danger" type="button" onClick={handleCancel}>Cancel</button>
      </form>
  );
};

export default UpdatePasswordForm;