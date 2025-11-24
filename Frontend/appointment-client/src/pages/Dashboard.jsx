import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-12">
          Welcome, {user?.username}!
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user?.role === 'doctor' ? (
            <>
              <Link
                to="/slots"
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-2 border-indigo-100 group"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🗓️</div>
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Manage Slots</h3>
                <p className="text-gray-600 leading-relaxed">
                  Create and manage your availability slots for appointments
                </p>
              </Link>

              <Link
                to="/doctor-appointments"
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-2 border-indigo-100 group"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">📋</div>
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">View Appointments</h3>
                <p className="text-gray-600 leading-relaxed">
                  See all your scheduled appointments with patients
                </p>
              </Link>

              <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-indigo-100">
                <div className="text-5xl mb-6">👤</div>
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Profile</h3>
                <p className="text-gray-600 font-medium">Role: <span className="text-indigo-600 font-bold">{user?.role}</span></p>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/doctors"
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-2 border-indigo-100 group"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">📅</div>
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Get Doctor & Book Appointment</h3>
                <p className="text-gray-600 leading-relaxed">
                  Browse available doctors and book appointments
                </p>
              </Link>

              <Link
                to="/appointments"
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-2 border-indigo-100 group"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">📋</div>
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">My Appointments</h3>
                <p className="text-gray-600 leading-relaxed">
                  View and manage your scheduled appointments
                </p>
              </Link>

              <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-indigo-100">
                <div className="text-5xl mb-6">👤</div>
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Profile</h3>
                <p className="text-gray-600 font-medium">Role: <span className="text-indigo-600 font-bold">{user?.role}</span></p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
