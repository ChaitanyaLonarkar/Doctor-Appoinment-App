import React from 'react'
import { userAPI } from '../services/api';

function PatientAppointments() {
    const user=JSON.parse( localStorage.getItem('user') );
    const id=user.id
    const [appointments, setAppointments] = React.useState([]);

    const fetchPatientAppointments = async () => {
    
        const response = await userAPI.getPatientAppointments(id)
        console.log(response.data);
        setAppointments(response.data)
    }

    React.useEffect(() => {
        fetchPatientAppointments();
    }, [])


  return (
      <>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-12">
            Your Appointments
        </h1>
        {appointments.length === 0 ? (
            <p className="text-gray-600 text-lg">No appointments scheduled.</p>
        ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appointment) => (
                <div
                key={appointment.id}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-indigo-100"
                >
                <div className="text-5xl mb-6">📅</div>
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Appointment ID: {appointment.id}</h3>
                <p className="text-gray-600 mb-3 font-medium">Doctor ID: {appointment.doctor}</p>
                <p className="text-gray-600 mb-3 font-medium">Slot ID: {appointment.slot}</p>
                <p className="text-gray-600 font-medium">Status: <span className="text-indigo-600 font-bold">{appointment.status}</span></p>
                </div>
            ))}
            </div>
        )}
        </div>
    </div>

    </>
  )
}

export default PatientAppointments