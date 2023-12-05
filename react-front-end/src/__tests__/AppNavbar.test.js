import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppNavbar from '../Components/AppNavbar';
import '@testing-library/jest-dom/extend-expect'; // Import the library

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // Use the actual implementation for everything other than what we override
    useNavigate: () => jest.fn(), // Mock useNavigate to return a jest.fn()
  }));
  

test('renders AppNavbar component', () => {
  render(
    <Router>
      <AppNavbar />
    </Router>
  );

  // Check if the Navbar Brand text is present
  expect(screen.getByText(/Navbar/i)).toBeInTheDocument();

    
});

test('navigates to Home when Home link is clicked', () => {
    // Mock the navigate function
    
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);
  
    render(
      <MemoryRouter>
        <AppNavbar />
      </MemoryRouter>
    );
  
    // Click the Home link
    fireEvent.click(screen.getByText(/Home/i));
    // Expect that the component has navigated to the Home route
    expect(mockNavigate).toHaveBeenCalledWith("/", {"replace": false, "state": undefined});
  });

  test('navigates to Register when Register link is clicked', () => {
    // Mock the navigate function
    
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);
  
    render(
      <MemoryRouter>
        <AppNavbar />
      </MemoryRouter>
    );
  
    // Click the Home link
    fireEvent.click(screen.getByText(/Register/i));
    // Expect that the component has navigated to the Home route
    expect(mockNavigate).toHaveBeenCalledWith("/register", {"replace": false, "state": undefined});
  });

  test('navigates to Login when Login link is clicked', () => {
    // Mock the navigate function
    
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);
  
    render(
      <MemoryRouter>
        <AppNavbar />
      </MemoryRouter>
    );
  
    // Click the Home link
    fireEvent.click(screen.getByText(/Login/i));
    // Expect that the component has navigated to the Home route
    expect(mockNavigate).toHaveBeenCalledWith("/login", {"replace": false, "state": undefined});
  });

  