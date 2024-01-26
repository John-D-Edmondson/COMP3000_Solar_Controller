
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppNavbar from './Components/AppNavbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Manage from './Pages/Manage';


function App() {
  return (
    <Router>
      <div>
        <AppNavbar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/manage/" element={<Manage />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
