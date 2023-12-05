import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from '../Pages/Login';

test('renders Login component', () => {
  render(<Login />);

  // Check if the Email and Password input fields are present
  expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test('updates state when typing in input fields', () => {
  render(<Login />);

  // Type in the Email input field
  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: 'test@example.com' },
  });
  expect(screen.getByLabelText(/email address/i)).toHaveValue('test@example.com');

  // Type in the Password input field
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'password123' },
  });
  expect(screen.getByLabelText(/password/i)).toHaveValue('password123');
});

test('calls handleSubmit when Sign in button is clicked', () => {
  render(<Login />);

  // Spy on the console.log method
  const consoleSpy = jest.spyOn(console, 'log');

  // Click the Sign in button
  fireEvent.click(screen.getByText(/sign in/i));

  // Expect that the handleSubmit function is called
  expect(consoleSpy).toHaveBeenCalledWith({ email: '', password: '' });

  // Clean up the spy
  consoleSpy.mockRestore();
});