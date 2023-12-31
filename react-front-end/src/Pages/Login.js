// Home.js
import React, { useState } from 'react';
import '../styles/LoginCSS.css'


const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email:'',
    password: ''
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
        <p>LOGIN</p>
      <div className="form-label-group">
        <input 
          type="email" 
          id="inputEmail" 
          className="form-control" 
          placeholder="Email address" 
          required autoFocus
          name='email'
          value={userDetails.email}
          onChange={handleInputChange} />
          
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
          onChange={handleInputChange} />
        <label htmlFor="inputPassword">Password</label>
      </div>
      <button 
        className="btn btn-lg btn-primary btn-block" 
        onClick={handleSubmit}
        >Sign in</button>
    </form>

  );
};

export default Login;