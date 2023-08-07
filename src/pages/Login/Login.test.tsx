import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Login } from './Login';

jest.mock('../../assets/Icons/Visibilityicons.svg', () => 'VisibilityIcon');
jest.mock('../../assets/Icons/Blindicons.svg', () => 'BlindIcon');

describe('Login', () => {
  it('should render the login form', () => {
    render(
      <Router>
        <Login setIsLoggedIn={() => {}} />
      </Router>
    );
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByText('Login');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should display an error message if email is not valid', async () => {
    render(
      <Router>
        <Login setIsLoggedIn={() => {}} />
      </Router>
    );
    const emailInput = screen.getByTestId('email');
    const submitButton = screen.getByText('Login');

    // Fill in the email field with an invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid_email' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Assert that the error message is displayed
    const errorMessage = await screen.findByText('Email inválido');
    expect(errorMessage).toBeInTheDocument();
  });

  it('should display an error message if password is too short', async () => {
    render(
      <Router>
        <Login setIsLoggedIn={() => {}} />
      </Router>
    );
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByText('Login');

    fireEvent.change(passwordInput, { target: { value: '12345' } });

    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText(
      'A senha deve ter pelo menos 6 caracteres.'
    );
    expect(errorMessage).toBeInTheDocument();
  });
});