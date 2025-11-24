import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <h1 className="text-8xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-pulse">404</h1>

      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Oops! Page Not Found</h2>

      <p className="text-gray-600 max-w-md mb-8 text-lg">
        The page you're looking for doesn't exist or has been moved.
      </p>

      {/* go back button to previous location */}
      <button
        className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-3 px-8 rounded-xl shadow-2xl hover:shadow-3xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 transform hover:scale-105 font-semibold"
        onClick={() => window.history.back()}
      >
        Go back
      </button>
    </div>
  );
};

export default NotFound;
