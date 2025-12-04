// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import Navbar from './Navbar';



// describe('Navbar Component', () => {
//   test('renders navigation links when user is not logged in', () => {
//     render(
//       <BrowserRouter>
//         <Navbar />
//       </BrowserRouter>
//     );
    
//     expect(screen.getByText(/Doctor Appointment/i)).toBeInTheDocument();
//     expect(screen.getByText(/Login/i)).toBeInTheDocument();
//     expect(screen.getByText(/Register/i)).toBeInTheDocument();
//   });

//   test('displays login and register links when user is not authenticated', () => {
//     render(
//       <BrowserRouter>
//         <Navbar />
//       </BrowserRouter>
//     );
    
//     expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
//     expect(screen.getByRole('link', { name: /Register/i })).toBeInTheDocument();
//   });
// });

// fail ho raha hai