import React, { useState, useEffect } from 'react';
import { slotAPI, appointmentAPI } from '../services/api';
import toast from 'react-hot-toast';

const Appointments = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [patientId, setPatientId] = useState('');

  const userinfo=JSON.parse( localStorage.getItem('user') );
  // setPatientId(userinfo.id)

  useEffect(() => {
    fetchAvailableSlots();
  }, []);

  const fetchAvailableSlots = async () => {
    try {
      setLoading(true);
      const response = await slotAPI.getAllSlots();
      // console.log(response.data,"slots data");
      setSlots(response.data);
    } catch (error) {
      toast.error('Failed to fetch slots');
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    try {
      await appointmentAPI.createAppointment({
        slot: selectedSlot.id,
        patient: userinfo.id,
        status: 'Booked',
      });
      toast.success('Appointment booked successfully!');
      setShowBookingForm(false);
      setSelectedSlot(null);
      setPatientId('');
      fetchAvailableSlots();
    } catch (error) {
      console.log(error,"dfgsdfgsdfg");
      toast.error(error.response?.data?.msg || 'Failed to book appointment');
    }
  };

  const openBookingForm = (slot) => {
    setSelectedSlot(slot);
    setShowBookingForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-12">Available Appointments</h1>

        {showBookingForm && selectedSlot && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full mx-4 border-2 border-indigo-200">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Book Appointment</h2>
              <div className="mb-6 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-indigo-200">
                <p className="text-sm text-gray-700 font-medium">
                  <strong>Date:</strong> {selectedSlot.date}
                </p>
                <p className="text-sm text-gray-700 font-medium">
                  <strong>Time:</strong> {selectedSlot.start_time} - {selectedSlot.end_time}
                </p>
              </div>
              <form onSubmit={handleBookAppointment}>
                {/* <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient ID
                  </label>
                  <input
                    type="number"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter your patient ID"
                  />
                </div> */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-bold"
                  >
                    Confirm Booking
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowBookingForm(false);
                      setSelectedSlot(null);
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-400 transition-all duration-300 font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 shadow-lg"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {slots.filter(slot => !slot.is_booked).length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No available slots at the moment</p>
              </div>
            ) : (
              slots
                .filter((slot) => !slot.is_booked)
                .map((slot) => (
                  <div
                    key={slot.id}
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-indigo-100"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          Doctor ID: {slot.doctor}
                        </h3>
                        <p className="text-sm text-indigo-600 font-medium">Available Slot</p>
                      </div>
                      <span className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-full text-xs font-bold shadow-lg">
                        Available
                      </span>
                    </div>
                    <div className="space-y-3 mb-6">
                      <p className="text-gray-700 font-medium">
                        <strong>Date:</strong> {slot.date}
                      </p>
                      <p className="text-gray-700 font-medium">
                        <strong>Time:</strong> {slot.start_time} - {slot.end_time}
                      </p>
                    </div>
                    <button
                      onClick={() => openBookingForm(slot)}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-bold"
                    >
                      Book Appointment
                    </button>
                  </div>
                ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
