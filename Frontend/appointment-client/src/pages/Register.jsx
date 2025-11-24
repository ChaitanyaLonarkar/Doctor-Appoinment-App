import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [userType, setUserType] = useState('patient');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    specialization: '',
  });
  const [loading, setLoading] = useState(false);
  const { registerDoctor, registerPatient } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Registration attempt:" , formData);
    // alert("Registration is currently disabled.");
    setLoading(true);

    let success = false;
    if (userType === 'doctor') {
      const doctorData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        specialization: formData.specialization,
      };

      console.log(doctorData,"sdfsdfsd");
      success = await registerDoctor(doctorData);
    } else {
      const patientData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      };
      success = await registerPatient(patientData);
    }

    setLoading(false);
    if (success) {
      setTimeout(() => navigate('/login'), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full border-2 border-indigo-100">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-10">Register</h2>

        <div className="flex gap-4 mb-6">
          <button
            type="button"
            onClick={() => setUserType('patient')}
            className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
              userType === 'patient'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Patient
          </button>
          <button
            type="button"
            onClick={() => setUserType('doctor')}
            className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
              userType === 'doctor'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Doctor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300"
              placeholder="Enter email"
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
              placeholder="Enter password"
            />
          </div>

          {userType === 'patient' ? (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300"
                placeholder="Enter phone number"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Specialization
              </label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300"
                placeholder="e.g., Cardiologist, Dentist"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6 shadow-lg hover:shadow-2xl transform hover:scale-105"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-bold transition-all duration-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
