import React, { useState, useEffect } from 'react';
import { userAPI, slotAPI } from '../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Slots = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const {user}=useAuth();

  const userinfo=JSON.parse( localStorage.getItem('user') );
  const [formData, setFormData] = useState({
    doctor: userinfo.id || '',
    date: '',
    start_time: '',
    end_time: '',
  });

  useEffect(() => {
    fetchSlots();
    // console.log(userinfo.id,"fdfdfsdfd");
  }, []);



  const fetchSlots = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getDoctorsSlots(userinfo.id);
      setSlots(response.data);
    } catch (error) {
      toast.error('Failed to fetch slots');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await slotAPI.createSlot(formData);
      toast.success('Slot created successfully!');
      setShowForm(false);
      setFormData({ doctor: '', date: '', start_time: '', end_time: '' });
      fetchSlots();
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed to create slot');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this slot?')) {
      try {
        await slotAPI.deleteSlot(id);
        toast.success('Slot deleted successfully!');
        fetchSlots();
      } catch (error) {
        toast.error('Failed to delete slot');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Manage Slots</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-bold"
          >
            {showForm ? 'Cancel' : 'Create New Slot'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-8 rounded-2xl shadow-xl mb-8 border-2 border-indigo-100">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Create New Slot</h2>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              {/* <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Doctor ID
                </label>
                <input
                  type="number"
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300"
                  placeholder="Enter doctor ID"
                />
              </div> */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  name="end_time"
                  value={formData.end_time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300"
                />
              </div>

              <button
                type="submit"
                className="md:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-bold"
              >
                Create Slot
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 shadow-lg"></div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-indigo-100">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Start Time
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    End Time
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {slots.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No slots available
                    </td>
                  </tr>
                ) : (
                  slots.map((slot) => (
                    <tr key={slot.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{slot.doctor}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{slot.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{slot.start_time}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{slot.end_time}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-2 rounded-full text-xs font-bold shadow-md ${
                            slot.is_booked
                              ? 'bg-gradient-to-r from-red-400 to-red-500 text-white'
                              : 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                          }`}
                        >
                          {slot.is_booked ? 'Booked' : 'Available'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleDelete(slot.id)}
                          className="text-red-600 hover:text-red-900 font-semibold hover:underline transition-all duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Slots;
