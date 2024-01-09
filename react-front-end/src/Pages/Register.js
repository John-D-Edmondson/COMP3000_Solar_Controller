// Register.js page
import React, { useState } from 'react';

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    firstName:'',
    lastName:'',
    email:'',
    password: '',
    passwordRetype: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userDetails);

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
          value={userDetails.firstName}
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
          value={userDetails.lastName}
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
          value={userDetails.email}
          onChange={handleInputChange} 
          />    
        <label htmlFor="inputEmail">Email address</label>
      </div>
      <div className="form-label-group">
        <input 
          type="password" 
          id="inputPassword" 
          className="form-control" 
          placeholder="Password" 
          required
          name='password'
          value={userDetails.password}
          onChange={handleInputChange}
          />
        <label htmlFor="inputPassword">Password</label>
      </div>
      <div className="form-label-group">
        <input 
          type="password" 
          id="inputPasswordRetype" 
          className="form-control" 
          placeholder="Retype Password" 
          required
          name='passwordRetype'
          value={userDetails.passwordRetype}
          onChange={handleInputChange}
          />
        <label htmlFor="inputPasswordRetype">Retype Password</label>
      </div>
  <button 
    className="btn btn-lg btn-primary btn-block" 
    onClick={handleSubmit}
    >Register</button>
</form>
  );
};

export default Register;