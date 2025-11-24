import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import {ProtectedRoute }from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import Slots from './pages/Slots';
import DoctorsList from './pages/DoctorsList';
import SlotsOfDoctor from './pages/SlotsOfDoctor';
import PatientAppointments from './pages/PatientAppointments';
import BookedSlots from './pages/BookedSlots';
import ChatbotWidget from './components/ChatbotWidget';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './components/NotFound';
import {useAuth} from './context/AuthContext';
import DoctorAppointments from './pages/DoctorAppintment';

function App() {
const { user } = useAuth();
// console.log(user?.role,"sdfasdfdsafasdfdasfasdf");
  
  return (
    <Router>
      
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Toaster position="top-right" />
          <Routes>
            {!user && <Route path="/" element={<Home />} />}
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/doctors' element={<DoctorsList/>} />
            <Route path='/book-appointment/:id' element={<SlotsOfDoctor/>} />
            <Route path='/my-appointments' element={<PatientAppointments/>} />
            <Route path='/my-booked-slots' element={<BookedSlots/>} />
            <Route path='/admin' element={<AdminDashboard/>}/>
            <Route path='/notfound' element={<NotFound/>}/>
            <Route path="*" element={<NotFound/>}/>
            <Route path='/doctor-appointments' element={<DoctorAppointments/>}/>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  {user?.role === 'Admin' ? <AdminDashboard /> : <Dashboard />}
                  {/* <Dashboard /> */}
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/slots"
              element={
                <ProtectedRoute>
                  <Slots />
                  {/* <SlotsOfDoctor/> */}
                </ProtectedRoute>
              }
            />
          </Routes>
          <ChatbotWidget/>
        </div>
      </Router>
  );
}

export default App;
