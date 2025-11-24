import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 shadow-lg"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/notfound" replace />;
  }

  return children;
};

export const AdminProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 shadow-lg"></div>
      </div>
    );
  }
  if (!user || user.role !== "Admin") {
    return <Navigate to="/notfound" replace />;
  }
  return children;
}

export const DoctorProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 shadow-lg"></div>
      </div>
    );
  }
  if (!user || user.role !== "doctor") {
    return <Navigate to="/notfound" replace />;
  }
  return children;}

export const PatientProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 shadow-lg"></div>
      </div>
    );
  }
  if (!user || user.role !== "patient") {
    return <Navigate to="/notfound" replace />;
  }
  return children;
}