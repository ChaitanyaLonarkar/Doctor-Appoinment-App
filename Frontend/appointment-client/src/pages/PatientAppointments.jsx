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
    <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Your Appointments
        </h1>
        {appointments.length === 0 ? (
            <p className="text-gray-600">No appointments scheduled.</p>
        ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appointment) => (
                <div
                key={appointment.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
                >
                <div className="text-4xl mb-4">📅</div>
                <h3 className="text-xl font-semibold mb-2">Appointment ID: {appointment.id}</h3>
                <p className="text-gray-600 mb-2">Doctor ID: {appointment.doctor}</p>
                <p className="text-gray-600 mb-2">Slot ID: {appointment.slot}</p>
                <p className="text-gray-600">Status: {appointment.status}</p>
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