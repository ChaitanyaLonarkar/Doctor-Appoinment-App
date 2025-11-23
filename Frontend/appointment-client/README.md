# Doctor Appointment Frontend Application

A modern, user-friendly React frontend for the Doctor Appointment Booking System built with React, Vite, Tailwind CSS, and React Router.

## Features

- **User Authentication**: Login and registration for both doctors and patients
- **Role-Based Access**: Different dashboards and features for doctors vs patients
- **Appointment Booking**: Patients can view and book available time slots
- **Slot Management**: Doctors can create and manage their availability slots
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Real-time Notifications**: Toast notifications for user feedback
- **Protected Routes**: Secure routes requiring authentication

## Tech Stack

- **React 19.2.0** - UI library
- **Vite 7.2.4** - Build tool and dev server
- **React Router DOM 7.9.6** - Client-side routing
- **Axios 1.13.2** - HTTP client for API calls
- **React Hot Toast** - Toast notifications
- **Tailwind CSS** - Utility-first CSS framework

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx           # Navigation component
│   └── ProtectedRoute.jsx   # Route protection wrapper
├── context/
│   └── AuthContext.jsx      # Authentication context provider
├── pages/
│   ├── Home.jsx             # Landing page
│   ├── Login.jsx            # Login page
│   ├── Register.jsx         # Registration page
│   ├── Dashboard.jsx        # User dashboard
│   ├── Appointments.jsx     # Appointment booking page
│   └── Slots.jsx            # Doctor slot management
├── services/
│   └── api.js               # API service layer
├── App.jsx                  # Main app component with routes
├── main.jsx                 # Application entry point
└── index.css                # Global styles with Tailwind
```

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   The `.env` file is already configured:
   ```
   VITE_API_BASE_URL=http://localhost:8000/api
   ```
   Update this if your backend runs on a different URL.

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (or another port if 5173 is busy)

4. **Build for Production**
   ```bash
   npm run build
   ```

5. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Backend Integration

The frontend connects to these backend endpoints:

### Authentication
- `POST /api/auth/register/doctor/` - Register as doctor
- `POST /api/auth/register/patient/` - Register as patient
- `POST /api/auth/login/` - Login

### Slots
- `GET /api/appointments/slots/` - Get all slots
- `POST /api/appointments/slot/create/` - Create new slot
- `PUT /api/appointments/slot/update/:id/` - Update slot
- `DELETE /api/appointments/slot/delete/:id/` - Delete slot

### Appointments
- `POST /api/appointments/appointment/create/` - Book appointment
- `DELETE /api/appointments/appointment/delete/:id/` - Cancel appointment

## User Flows

### For Patients
1. Register as a patient
2. Login with credentials
3. View available appointment slots
4. Book an appointment
5. View booked appointments

### For Doctors
1. Register as a doctor (with specialization)
2. Login with credentials
3. Create availability slots
4. Manage existing slots
5. View appointments

## Key Features Explained

### Authentication Context
The `AuthContext` manages user authentication state globally:
- Stores user info and tokens in localStorage
- Provides login, logout, register functions
- Persists authentication across page refreshes

### Protected Routes
Routes requiring authentication are wrapped with `ProtectedRoute`:
- Checks if user is authenticated
- Redirects to login if not authenticated
- Shows loading state during auth check

### API Service
Centralized API configuration with:
- Axios interceptors for token attachment
- Automatic error handling
- Base URL configuration from environment

## Styling

The application uses Tailwind CSS with a clean, modern design:
- Blue color scheme for primary actions
- Responsive grid layouts
- Smooth transitions and hover effects
- Accessible form controls

## Development Notes

- All API calls include error handling with toast notifications
- Forms validate required fields
- Loading states provide user feedback
- JWT tokens are stored in localStorage
- Axios automatically adds tokens to requests

## Future Enhancements

Potential improvements:
- Add user profile editing
- Implement appointment history
- Add search/filter for doctors
- Include doctor ratings and reviews
- Add email/SMS notifications
- Implement real-time chat
- Add calendar view for appointments
