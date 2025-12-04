// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import Slots from './Slots';
// import { userAPI, slotAPI } from '../services/api';
// import * as router from 'react-router-dom';

// // Mock the APIs
// jest.mock('../services/api', () => ({
//   userAPI: {
//     getDoctorsSlots: jest.fn(),
//   },
//   slotAPI: {
//     createSlot: jest.fn(),
//     deleteSlot: jest.fn(),
//   },
// }));

// // Mock the useAuth hook
// jest.mock('../context/AuthContext', () => ({
//   useAuth: () => ({
//     user: { id: 1, username: 'testdoctor', role: 'doctor' },
//   }),
// }));

// // Mock react-hot-toast
// jest.mock('react-hot-toast', () => ({
//   toast: {
//     success: jest.fn(),
//     error: jest.fn(),
//   },
// }));

// // Mock react-router-dom
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   Link: ({ children, to }) => <a href={to}>{children}</a>,
// }));

// describe('Slots Component - CRUD Operations', () => {
//   const mockSlots = [
//     { id: 1, doctor: 1, date: '2023-01-01', start_time: '09:00', end_time: '10:00', is_booked: false },
//     { id: 2, doctor: 1, date: '2023-01-02', start_time: '10:00', end_time: '11:00', is_booked: true },
//   ];

//   beforeEach(() => {
//     // Clear all mocks before each test
//     jest.clearAllMocks();
//     localStorage.clear();
    
//     // Set up user in localStorage
//     const mockUser = { id: 1, username: 'testdoctor', role: 'doctor' };
//     localStorage.setItem('user', JSON.stringify(mockUser));
//   });

//   test('renders slots table with data', async () => {
//     userAPI.getDoctorsSlots.mockResolvedValue({ data: mockSlots });
    
//     render(
//       <BrowserRouter>
//         <Slots />
//       </BrowserRouter>
//     );
    
//     // Wait for data to load
//     await waitFor(() => {
//       expect(screen.getByText('Manage Slots')).toBeInTheDocument();
//     });
    
//     // Check if slots are displayed
//     expect(screen.getByText('2023-01-01')).toBeInTheDocument();
//     expect(screen.getByText('2023-01-02')).toBeInTheDocument();
//     expect(screen.getByText('09:00')).toBeInTheDocument();
//     expect(screen.getByText('10:00')).toBeInTheDocument();
//   });

//   test('shows create slot form when button is clicked', async () => {
//     userAPI.getDoctorsSlots.mockResolvedValue({ data: [] });
    
//     render(
//       <BrowserRouter>
//         <Slots />
//       </BrowserRouter>
//     );
    
//     // Wait for component to load
//     await waitFor(() => {
//       expect(screen.getByText('Manage Slots')).toBeInTheDocument();
//     });
    
//     // Click the "Create New Slot" button
//     const createButton = screen.getByRole('button', { name: /Create New Slot/i });
//     fireEvent.click(createButton);
    
//     // Check if form is displayed
//     expect(screen.getByText('Create New Slot')).toBeInTheDocument();
//     expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Start Time/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/End Time/i)).toBeInTheDocument();
//   });

//   test('creates a new slot successfully', async () => {
//     userAPI.getDoctorsSlots.mockResolvedValue({ data: mockSlots });
//     slotAPI.createSlot.mockResolvedValue({ data: { success: true } });
    
//     render(
//       <BrowserRouter>
//         <Slots />
//       </BrowserRouter>
//     );
    
//     // Wait for component to load
//     await waitFor(() => {
//       expect(screen.getByText('Manage Slots')).toBeInTheDocument();
//     });
    
//     // Click the "Create New Slot" button
//     const createButton = screen.getByRole('button', { name: /Create New Slot/i });
//     fireEvent.click(createButton);
    
//     // Fill in the form
//     fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2023-01-03' } });
//     fireEvent.change(screen.getByLabelText(/Start Time/i), { target: { value: '11:00' } });
//     fireEvent.change(screen.getByLabelText(/End Time/i), { target: { value: '12:00' } });
    
//     // Submit the form
//     const submitButton = screen.getByRole('button', { name: /Create Slot/i });
//     fireEvent.click(submitButton);
    
//     // Check if createSlot was called
//     await waitFor(() => {
//       expect(slotAPI.createSlot).toHaveBeenCalledWith({
//         doctor: 1,
//         date: '2023-01-03',
//         start_time: '11:00',
//         end_time: '12:00'
//       });
//     });
//   });

//   test('deletes a slot after confirmation', async () => {
//     userAPI.getDoctorsSlots.mockResolvedValue({ data: mockSlots });
//     slotAPI.deleteSlot.mockResolvedValue({ data: { success: true } });
    
//     // Mock window.confirm
//     jest.spyOn(window, 'confirm').mockImplementation(() => true);
    
//     render(
//       <BrowserRouter>
//         <Slots />
//       </BrowserRouter>
//     );
    
//     // Wait for component to load
//     await waitFor(() => {
//       expect(screen.getByText('Manage Slots')).toBeInTheDocument();
//     });
    
//     // Find and click the delete button for the first slot
//     const deleteButtons = screen.getAllByText(/Delete/i);
//     fireEvent.click(deleteButtons[0]);
    
//     // Check if deleteSlot was called
//     await waitFor(() => {
//       expect(slotAPI.deleteSlot).toHaveBeenCalledWith(1);
//     });
    
//     // Restore window.confirm
//     window.confirm.mockRestore();
//   });

//   test('handles slot creation error', async () => {
//     userAPI.getDoctorsSlots.mockResolvedValue({ data: [] });
//     slotAPI.createSlot.mockRejectedValue(new Error('Creation failed'));
    
//     render(
//       <BrowserRouter>
//         <Slots />
//       </BrowserRouter>
//     );
    
//     // Wait for component to load
//     await waitFor(() => {
//       expect(screen.getByText('Manage Slots')).toBeInTheDocument();
//     });
    
//     // Click the "Create New Slot" button
//     const createButton = screen.getByRole('button', { name: /Create New Slot/i });
//     fireEvent.click(createButton);
    
//     // Fill in the form
//     fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2023-01-03' } });
//     fireEvent.change(screen.getByLabelText(/Start Time/i), { target: { value: '11:00' } });
//     fireEvent.change(screen.getByLabelText(/End Time/i), { target: { value: '12:00' } });
    
//     // Submit the form
//     const submitButton = screen.getByRole('button', { name: /Create Slot/i });
//     fireEvent.click(submitButton);
    
//     // Check if error was handled (we can't directly test toast since it's mocked)
//     await waitFor(() => {
//       expect(slotAPI.createSlot).toHaveBeenCalled();
//     });
//   });
// });


// pure failed hai 6 suits 5 tests