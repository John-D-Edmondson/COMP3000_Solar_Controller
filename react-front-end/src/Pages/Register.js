// Register.js page
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isValidPassword, isAtLeastTwoLetter, isValidEmail } from '../helper/regex';

const Register = () => {
  const navigate = useNavigate();

  const [validPassword, setValidPassword] = useState(true);
  const [validMatchPassword, setValidMatchPassword] = useState(true);
  const [validFirstName, setValidFirstName] = useState(true);
  const [validLastname, setValidLastName] = useState(true);
  const [validEmail, setValidEmail] = useState(true);


  
  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    password: '',
    passwordRetype: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevDetails) => ({
      ...prevDetails,
      [name] : value
    }));
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
    if(!isValidPassword(formData.password)){
      setValidPassword(false);
      validForm = false;
    }
    if(formData.password !== formData.passwordRetype){
      setValidMatchPassword(false);
      validForm = false;
    }
    
    if(!validForm) return;


    console.log(`creating new user /n${formData}`);

    navigate('/login', {replace:true});
  }


  return (
    <form className="form-signin">
    <p>REGISTER</p>
  
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
        {!validEmail && <p style={{ color: 'red' }}>Enter valid email</p>}
      </div>
      <div className="form-label-group">
        <input 
          type="password" 
          id="inputPassword" 
          className="form-control" 
          placeholder="Password" 
          required
          name='password'
          value={formData.password}
          onChange={handleInputChange}
          />
        <label htmlFor="inputPassword">Password</label>
        {!validPassword && <p style={{ color: 'red' }}>Must be 8 characters and include capital and number.</p>}
      </div>
      <div className="form-label-group">
        <input 
          type="password" 
          id="inputPasswordRetype" 
          className="form-control" 
          placeholder="Retype Password" 
          required
          name='passwordRetype'
          value={formData.passwordRetype}
          onChange={handleInputChange}
          />
        <label htmlFor="inputPasswordRetype">Retype Password</label>
        {!validMatchPassword && <p style={{ color: 'red' }}>Must be 8 characters and include capital and number.</p>}
      </div>
  <button 
    className="btn btn-lg btn-primary btn-block" 
    onClick={handleSubmit}
    >Register</button>
</form>
  );
};

export default Register;