// Home.js
import React, { useState } from 'react';
import '../styles/LoginCSS.css'
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService';

const Login = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    email:'',
    password: ''
  });
  const [successfulLogin, setSuccessfulLogin] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userDetails);

    try {
      const resultLogin = await userService.userLogin(userDetails);
      console.log(resultLogin);
      if(resultLogin.success) {
        navigate(`/manage/`);
      } else {
        setSuccessfulLogin(false);
      }

      

    } catch (error) {
        console.log(`error logging in: ${error}`);
    }
    
  }

  const handleRegisterHere = () =>{
    navigate('/register', {replace:true});
  }

  return (
    <>
  
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
      <button 
        className="btn btn-lg btn-primary btn-block" 
        onClick={handleRegisterHere}
        >Register Here</button>
        {!successfulLogin && <p style={{ color: 'red' }}>Unsuccessful, please try again</p>}
    </form>
    
 </>
    

  );
};

export default Login;