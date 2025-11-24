import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await authAPI.login({ username, password });
      console.log('Login Response:', response);

      if (response.status !== 200) {
        throw new Error('Login failed');
      }
      const { access, refresh, msg, user } = response.data;
      
      console.log('Access Token:', user);
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Decode user info from token or fetch user profile
      // const userInfo = { username, role: 'patient' }; // You can decode JWT or fetch profile
      // localStorage.setItem('user', JSON.stringify(userInfo));
      setUser(user);
      
      toast.success(msg || 'Login successful!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Login failed');
      return false;
    }
  };

  const registerDoctor = async (data) => {
    try {
      const response = await authAPI.registerDoctor(data);
      console.log('Register Doctor Response:', response);
      if (response.status !== 201) {
        throw new Error('Registration failed');
      }
      toast.success(response.data.msg || 'Doctor registered successfully!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Registration failed');
      return false;
    }
  };

  const registerPatient = async (data) => {
    try {
      const response = await authAPI.registerPatient(data);
      console.log('Register Patient Response:', response);
      if (response.status !== 201) {
        throw new Error('Registration failed');
      }
      toast.success(response.data.msg || 'Patient registered successfully!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Registration failed');
      return false;
    }
  };

  const logout = () => {
    // const response = authAPI.logout();
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    window.location.href = '/login';
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, registerDoctor, registerPatient, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
