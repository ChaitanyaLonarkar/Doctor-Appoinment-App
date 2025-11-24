import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8 animate-fade-in">
            Welcome to Doctor Appointment System
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-16 max-w-3xl mx-auto leading-relaxed">
            Book appointments with your favorite doctors easily and manage your healthcare schedule efficiently.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-indigo-100">
              <div className="text-5xl mb-6">👨‍⚕️</div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Expert Doctors</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with experienced and qualified doctors across various specializations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-indigo-100">
              <div className="text-5xl mb-6">📅</div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Easy Booking</h3>
              <p className="text-gray-600 leading-relaxed">
                Book appointments at your convenience with our simple and intuitive interface.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-indigo-100">
              <div className="text-5xl mb-6">⏰</div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Flexible Scheduling</h3>
              <p className="text-gray-600 leading-relaxed">
                Choose from available time slots that fit your schedule perfectly.
              </p>
            </div>
          </div>

          <div className="mt-20 flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/register"
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-10 py-4 rounded-xl text-lg font-bold hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-white text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-4 rounded-xl text-lg font-bold border-3 border-indigo-500 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
