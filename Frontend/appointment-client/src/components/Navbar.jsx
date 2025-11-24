import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold hover:scale-105 transition-transform duration-300 flex items-center gap-2">
            <span className="text-3xl">🏥</span>
            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Doctor Appointment</span>
          </Link>

          <div className="flex items-center gap-6">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="hover:text-blue-200 transition-all duration-300 hover:scale-110 font-medium"
                >
                  Dashboard
                </Link>
                {user.role === "patient" && (
                  <Link
                    to="/my-appointments"
                    className="hover:text-blue-200 transition-all duration-300 hover:scale-110 font-medium"
                  >
                    My Appointments
                  </Link>
                )}

                {user.role === "doctor" && (
                  <div className="flex items-center gap-6">
                    <Link
                      to="/slots"
                      className="hover:text-blue-200 transition-all duration-300 hover:scale-110 font-medium"
                    >
                      My Slots
                    </Link>

                    <Link
                      to="/doctor-appointments"
                      className="hover:text-blue-200 transition-all duration-300 hover:scale-110 font-medium"
                    >
                      My Booked Slots
                    </Link>
                  </div>
                )}
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">Welcome, {user.username}</span>
                <button
                  onClick={logout}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-4 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200 transition-all duration-300 hover:scale-110 font-medium">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold border-2 border-white"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
