import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold">
            Doctor Appointment
          </Link>

          <div className="flex items-center gap-6">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="hover:text-blue-200 transition"
                >
                  Dashboard
                </Link>
                {user.role === "patient" && (
                  <Link
                    to="/my-appointments"
                    className="hover:text-blue-200 transition"
                  >
                    My Appointments
                  </Link>
                )}

                {user.role === "doctor" && (
                  <div className="flex items-center gap-6">
                    <Link
                      to="/slots"
                      className="hover:text-blue-200 transition"
                    >
                      My Slots
                    </Link>

                    <Link
                      to="/my-booked-slots"
                      className="hover:text-blue-200 transition"
                    >
                      My Booked Slots
                    </Link>
                  </div>
                )}
                <span className="text-sm">Welcome, {user.username}</span>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200 transition">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition"
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
