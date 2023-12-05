import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Register from '../Pages/Register';

test('renders Register component', () => {
  render(<Register />);

  // Check if the input fields are present
  expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();

  const passwordInputs = screen.getAllByLabelText(/password/i);
  expect(passwordInputs[0]).toBeInTheDocument();
  expect(passwordInputs[1]).toBeInTheDocument();
});

test('updates state when typing in input fields', () => {
  render(<Register />);
      // Type in the Email input field
  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: 'test@example.com' },
  });
  expect(screen.getByLabelText(/email address/i)).toHaveValue('test@example.com');

  // Type in the First Name input field
  fireEvent.change(screen.getByLabelText(/first name/i), {
    target: { value: 'John' },
  });
  expect(screen.getByLabelText(/first name/i)).toHaveValue('John');

  // Type in the Last Name input field
  fireEvent.change(screen.getByLabelText(/last name/i), {
    target: { value: 'Doe' },
  });
  expect(screen.getByLabelText(/last name/i)).toHaveValue('Doe');

  // Type in the Email input field
  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: 'john.doe@example.com' },
  });
  expect(screen.getByLabelText(/email address/i)).toHaveValue('john.doe@example.com');


  const passwordInputs = screen.getAllByLabelText(/password/i);
  // Type in the Password input field
  fireEvent.change(passwordInputs[0], {
    target: { value: 'password123' },
  });
  expect(passwordInputs[0]).toHaveValue('password123');

  // Type in the Retype Password input field
  fireEvent.change(passwordInputs[1], {
    target: { value: 'password123' },
  });
  expect(passwordInputs[1]).toHaveValue('password123');
});

test('calls handleSubmit when Sign in button is clicked', () => {
  render(<Register />);

  // Spy on the console.log method
  const consoleSpy = jest.spyOn(console, 'log');

  // Click the Sign in button
  fireEvent.click(screen.getByText(/sign in/i));

  // Expect that the handleSubmit function is called
  expect(consoleSpy).toHaveBeenCalledWith({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordRetype: '',
  });

  // Clean up the spy
  consoleSpy.mockRestore();
});

test('calls handleSubmit when Sign in button is clicked', () => {
  render(<Register />);

  // Spy on the console.log method
  const consoleSpy = jest.spyOn(console, 'log');

  // Click the Sign in button
  fireEvent.click(screen.getByText(/sign in/i));

  // Expect that the handleSubmit function is called
  expect(consoleSpy).toHaveBeenCalledWith({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordRetype: '',
  });

  // Clean up the spy
  consoleSpy.mockRestore();
});