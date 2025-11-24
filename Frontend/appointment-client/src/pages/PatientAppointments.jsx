import React, { useEffect, useState } from "react";
import axios from "axios";
import { appointmentAPI, userAPI } from "../services/api";

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch patient's appointments
  const fetchAppointments = async () => {
    try {
      const res = await userAPI.getPatientAppointments();
      console.log(res.data.appointments, "patient appointments");
      setAppointments(res.data.appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Delete (cancel) an appointment
  const deleteAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      await appointmentAPI.deleteAppointment(id);

      // Refresh appointment list
      fetchAppointments();
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  if (loading) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen"> 
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        My Appointments
      </h1>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full table-auto bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Doctor Name</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Time</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  Dr. {appt.slot.doctor.username}
                </td>
                <td className="px-4 py-3">{appt.slot.date}</td>
                <td className="px-4 py-3">
                  {appt.slot.start_time} – {appt.slot.end_time}
                </td>
                <td className="px-4 py-3 font-semibold">
                  {appt.status === "Booked" ? (
                    <span className="text-blue-600">Booked</span>
                  ) : (
                    <span className="text-green-600">Visited</span>
                  )}
                </td>

                <td className="px-4 py-3">
                  <button
                    onClick={() => deleteAppointment(appt.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default PatientAppointments;
