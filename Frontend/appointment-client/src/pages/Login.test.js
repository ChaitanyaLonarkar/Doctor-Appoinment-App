// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import Login from './Login';

// // Mock the useAuth hook
// jest.mock('../context/AuthContext', () => ({
//   useAuth: () => ({
//     login: jest.fn(),
//   }),
// }));

// // Mock the Link component from react-router-dom
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   Link: ({ children, to }) => <a href={to}>{children}</a>,
// }));

// // Mock react-hot-toast
// jest.mock('react-hot-toast', () => ({
//   Toaster: () => <div data-testid="toaster" />,
//   toast: {
//     success: jest.fn(),
//     error: jest.fn(),
//   },
// }));

// describe('Login Component', () => {
//   test('renders login form elements', () => {
//     render(
//       <BrowserRouter>
//         <Login />
//       </BrowserRouter>
//     );
    
//     expect(screen.getByText(/Login/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
//   });

//   test('allows entering username and password', () => {
//     render(
//       <BrowserRouter>
//         <Login />
//       </BrowserRouter>
//     );
    
//     const usernameInput = screen.getByLabelText(/Username/i);
//     const passwordInput = screen.getByLabelText(/Password/i);
    
//     fireEvent.change(usernameInput, { target: { value: 'testuser' } });
//     fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
//     expect(usernameInput.value).toBe('testuser');
//     expect(passwordInput.value).toBe('password123');
//   });

//   test('renders register link', () => {
//     render(
//       <BrowserRouter>
//         <Login />
//       </BrowserRouter>
//     );
    
//     expect(screen.getByRole('link', { name: /Register/i })).toBeInTheDocument();
//   });
// });