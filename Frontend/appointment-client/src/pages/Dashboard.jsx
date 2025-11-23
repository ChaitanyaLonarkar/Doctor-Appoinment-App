import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Welcome, {user?.username}!
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user?.role === 'doctor' ? (
            <>
              <Link
                to="/slots"
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition cursor-pointer"
              >
                <div className="text-4xl mb-4">🗓️</div>
                <h3 className="text-xl font-semibold mb-2">Manage Slots</h3>
                <p className="text-gray-600">
                  Create and manage your availability slots for appointments
                </p>
              </Link>

              <Link
                to="/my-booked-slots"
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition cursor-pointer"
              >
                <div className="text-4xl mb-4">📋</div>
                <h3 className="text-xl font-semibold mb-2">View Appointments</h3>
                <p className="text-gray-600">
                  See all your scheduled appointments with patients
                </p>
              </Link>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">👤</div>
                <h3 className="text-xl font-semibold mb-2">Profile</h3>
                <p className="text-gray-600">Role: {user?.role}</p>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/doctors"
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition cursor-pointer"
              >
                <div className="text-4xl mb-4">📅</div>
                <h3 className="text-xl font-semibold mb-2">Get Doctor & Book Appointment</h3>
                <p className="text-gray-600">
                  Browse available doctors and book appointments
                </p>
              </Link>

              <Link
                to="/appointments"
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition cursor-pointer"
              >
                <div className="text-4xl mb-4">📋</div>
                <h3 className="text-xl font-semibold mb-2">My Appointments</h3>
                <p className="text-gray-600">
                  View and manage your scheduled appointments
                </p>
              </Link>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">👤</div>
                <h3 className="text-xl font-semibold mb-2">Profile</h3>
                <p className="text-gray-600">Role: {user?.role}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
