import React, { useState } from 'react';
import {isValidPassword} from '../helper/regex.js'

const UpdatePasswordForm = ({onSubmit, onCancel }) => {
    const [validPassword, setValidPassword] = useState(true);
    const [validMatchPassword, setValidMatchPassword] = useState(true);


  const [formData, setFormData] = useState({
    oldPassword: '',
    password: '',
    passwordRetype: ''
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
    if(!isValidPassword(formData.password)){
        setValidPassword(false);
        
    }
    if(formData.inputNewPassword !== formData.passwordRetype) {
        setValidMatchPassword(false);

    }

    if(!isValidPassword(formData.password) || formData.password !== formData.passwordRetype){
        setFormData({
            oldPassword: '',
            password: '',
            passwordRetype: ''
        });
        return;
    }

    
    onSubmit(formData);
    onCancel();
 
  };

  const handleCancel = () => {
    setFormData({
        oldPassword: '',
        password: '',
        passwordRetype: ''
    });
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
        <h3>Update Password</h3>
        <div className="form-label-group">
        <input 
          type="password" 
          id="oldPassword" 
          className="form-control" 
          placeholder="Old Password" 
          required autoFocus
          name='oldPassword'
          value={formData.oldPassword}
          onChange={handleInputChange}
          />
        <label htmlFor="oldPassword">Old Password</label>
      </div>
      <div className="form-label-group">
        <input 
          type="password" 
          id="password" 
          className="form-control" 
          placeholder="New Password" 
          required
          name='password'
          value={formData.password}
          onChange={handleInputChange}
          />
        <label htmlFor="password">New Password</label>
        {!validPassword && <p style={{ color: 'red' }}>Must be 8 characters and include capital and number.</p>}
      </div>
      <div className="form-label-group">
        <input 
          type="password" 
          id="passwordRetype" 
          className="form-control" 
          placeholder="Retype New Password" 
          required
          name='passwordRetype'
          value={formData.passwordRetype}
          onChange={handleInputChange}
          />
        <label htmlFor="passwordRetype">Retype New Password</label>
        {!validMatchPassword && <p style={{ color: 'red' }}>Passwords must match</p>}
      </div>
      <button className="btn btn-primary" type="submit">Update</button>
      <button className="btn btn-danger" type="button" onClick={handleCancel}>Cancel</button>
      </form>
  );
};

export default UpdatePasswordForm;