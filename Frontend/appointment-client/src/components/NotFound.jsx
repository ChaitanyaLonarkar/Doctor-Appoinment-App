import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6">
      <h1 className="text-7xl font-extrabold text-blue-600 mb-4">404</h1>

      <h2 className="text-2xl font-semibold mb-2">Oops! Page Not Found</h2>

      <p className="text-gray-600 max-w-md mb-6">
        The page you're looking for doesn’t exist or has been moved.
      </p>

      {/* go back button to previous location */}
      <button
        className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={() => window.history.back()}
      >
        Go back
      </button>
    </div>
  );
};

export default NotFound;
