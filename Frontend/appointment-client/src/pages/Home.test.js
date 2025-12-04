// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import Home from './Home';

// describe('Home Component', () => {
//   test('renders welcome message', () => {
//     render(
//       <BrowserRouter>
//         <Home />
//       </BrowserRouter>
//     );
    
//     expect(screen.getByText(/Welcome to Doctor Appointment System/i)).toBeInTheDocument();
//   });

//   test('renders feature cards', () => {
//     render(
//       <BrowserRouter>
//         <Home />
//       </BrowserRouter>
//     );
    
//     expect(screen.getByText(/Expert Doctors/i)).toBeInTheDocument();
//     expect(screen.getByText(/Easy Booking/i)).toBeInTheDocument();
//     expect(screen.getByText(/Flexible Scheduling/i)).toBeInTheDocument();
//   });

//   test('renders get started and login buttons', () => {
//     render(
//       <BrowserRouter>
//         <Home />
//       </BrowserRouter>
//     );
    
//     expect(screen.getByText(/Get Started/i)).toBeInTheDocument();
//     expect(screen.getByText(/Login/i)).toBeInTheDocument();
//   });
// });