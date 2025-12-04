import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from './Register';

// Mock the useAuth hook
// jest.mock('../context/AuthContext', () => ({
//   useAuth: () => ({
//     registerDoctor: jest.fn(),
//     registerPatient: jest.fn(),
//   }),
// }));

// Mock the Link component from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}));

// Mock react-hot-toast
// jest.mock('react-hot-toast', () => ({
//   Toaster: () => <div data-testid="toaster" />,
//   toast: {
//     success: jest.fn(),
//     error: jest.fn(),
//   },
// }));

describe('Register Component', () => {
  test('renders register form elements', () => {
    render(
      // <BrowserRouter>
        <Register />
      // </BrowserRouter>
    );
    
    // expect(screen.getByTitle(/Register/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Patient/i })).toBeInTheDocument();
    // expect(screen.getByRole('button', { name: /Doctor/i })).toBeInTheDocument();
    // expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    // expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    // expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  // test('switches between patient and doctor registration', () => {
  //   render(
  //     <BrowserRouter>
  //       <Register />
  //     </BrowserRouter>
  //   );
    
  //   // Initially should show patient fields
  //   expect(screen.queryByLabelText(/Phone Number/i)).toBeInTheDocument();
  //   expect(screen.queryByLabelText(/Specialization/i)).not.toBeInTheDocument();
    
  //   // Click doctor button
  //   const doctorButton = screen.getByRole('button', { name: /Doctor/i });
  //   fireEvent.click(doctorButton);
    
  //   // Should now show doctor fields
  //   expect(screen.queryByLabelText(/Phone Number/i)).not.toBeInTheDocument();
  //   expect(screen.queryByLabelText(/Specialization/i)).toBeInTheDocument();
  // });

  // test('allows entering form data', () => {
  //   render(
  //     <BrowserRouter>
  //       <Register />
  //     </BrowserRouter>
  //   );
    
  //   const usernameInput = screen.getByLabelText(/Username/i);
  //   const emailInput = screen.getByLabelText(/Email/i);
  //   const passwordInput = screen.getByLabelText(/Password/i);
    
  //   fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  //   fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  //   fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
  //   expect(usernameInput.value).toBe('testuser');
  //   expect(emailInput.value).toBe('test@example.com');
  //   expect(passwordInput.value).toBe('password123');
  // });

  // test('renders login link', () => {
  //   render(
  //     <BrowserRouter>
  //       <Register />
  //     </BrowserRouter>
  //   );
    
  //   expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
  // });
});

test("Register button is present", () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );

  const btn = screen.getByText("Register");

  expect(btn).toBeInTheDocument();
});

 test('renders login link', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    
    expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
  });