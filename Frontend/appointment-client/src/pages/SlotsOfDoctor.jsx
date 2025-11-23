import React, { useEffect, useState
 } from 'react'
import { userAPI } from '../services/api'
import { useParams, Link } from 'react-router-dom'
import { appointmentAPI } from '../services/api';
import toast from 'react-hot-toast';

function SlotsOfDoctor() {
    const { id } = useParams();
    const userinfo=JSON.parse( localStorage.getItem('user') );

    const [loading, setLoading] = useState(false);
      const [showBookingForm, setShowBookingForm] = useState(false);
      const [selectedSlot, setSelectedSlot] = useState(null);

    // console.log(id,"fdfgdfg");
    const [slots, setSlots] = React.useState([])
    // const [doctorid, setdoctorid] = React.useState('')
    // const userinfo=JSON.parse( localStorage.getItem('user') );
    // const id=userinfo.id
    const fetchSlotsOfDoctor = async () => {
       const response = await userAPI.getDoctorsSlots(id)
       console.log(response.data,"fdgdfgdfg");
        setSlots(response.data)

    }

    useEffect(() => {
        fetchSlotsOfDoctor();
    }, [])



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
    <>
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
                Slots of Doctor Page
            </h1>
            {slots.length === 0 ? (
                <p className="text-gray-600">No slots available for this doctor.</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {slots.map((slot) => (
                    // <div
                    // key={slot.id}
                    // className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
                    // >
                    // <div className="text-4xl mb-4">🗓️</div>
                    // <h3 className="text-xl font-semibold mb-2">Date: {slot.date}</h3>
                    // <p className="text-gray-600 mb-2">Start Time: {slot.start_time}</p>
                    // <p className="text-gray-600">End Time: {slot.end_time}</p>
                    //  <Link  className="bg-blue-500 hover:bg-blue-600 text-white mt-10 py-2 px-4 rounded ">Book Appointment </Link>
                    // </div>

                    <div
                    key={slot.id}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Doctor ID: {slot.doctor}
                        </h3>
                        <p className="text-sm text-gray-600">Available Slot</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                        Available
                      </span>
                    </div>
                    <div className="space-y-2 mb-4">
                      <p className="text-gray-700">
                        <strong>Date:</strong> {slot.date}
                      </p>
                      <p className="text-gray-700">
                        <strong>Time:</strong> {slot.start_time} - {slot.end_time}
                      </p>
                    </div>
                    <button
                      onClick={() => openBookingForm(slot)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Book Appointment
                    </button>
                  </div>
                ))}
                </div>
            )}

            {showBookingForm && selectedSlot && (
          <div className="fixed inset-0 bg-blue-100 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
              <h2 className="text-2xl font-semibold mb-4">Book Appointment</h2>
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Date:</strong> {selectedSlot.date}
                </p>
                <p className="text-sm text-gray-600">
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
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Confirm Booking
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowBookingForm(false);
                      setSelectedSlot(null);
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

            </div>
            
        </div>
    </>
  )
}

export default SlotsOfDoctor