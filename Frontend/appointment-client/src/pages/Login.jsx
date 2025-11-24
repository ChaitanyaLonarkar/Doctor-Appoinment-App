import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form Data:', formData);
    setLoading(true);

    const success = await login(formData.username, formData.password);
    
    setLoading(false);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full border-2 border-indigo-100">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-10">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl transform hover:scale-105"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-bold transition-all duration-300">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
