import React, { useEffect, useState } from "react";
import axios from "axios";
import { userAPI } from "../services/api";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch appointments
  const fetchAppointments = async () => {
    try {
      const res = await userAPI.getDoctorAppointmentsWithPatient();
      setAppointments(res.data.appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Open modal
  const openUpdateDialog = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  // Update status → Visited
  const updateAppointmentStatus = async () => {
    try {
    //   await axios.patch(
    //     `/api/appointments/${selectedAppointment.id}/update/`,
    //     { status: "Visited" },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("access")}`,
    //       },
    //     }
    //   );
       const res = await userAPI.updateAppointmentStatus(selectedAppointment.id, { status: "Visited" });
       console.log(res.data,"appointment status updated");

      setShowModal(false);
      fetchAppointments(); // refresh list
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <>
    <div className="container mx-auto p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">

    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Doctor Appointments
      </h1>

      <div className="overflow-x-auto shadow-2xl rounded-2xl border-2 border-indigo-100">
        <table className="w-full table-auto bg-white">
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left font-bold text-sm uppercase tracking-wider">Patient</th>
              <th className="px-6 py-4 text-left font-bold text-sm uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left font-bold text-sm uppercase tracking-wider">Time</th>
              <th className="px-6 py-4 text-left font-bold text-sm uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left font-bold text-sm uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id} className="border-b hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300">
                <td className="px-6 py-4 font-medium">{appt.patient.username}</td>
                <td className="px-6 py-4 font-medium">{appt.slot.date}</td>
                <td className="px-6 py-4 font-medium">
                  {appt.slot.start_time} - {appt.slot.end_time}
                </td>
                <td className="px-6 py-4 font-bold text-indigo-600">{appt.status}</td>

                <td className="px-6 py-4">
                  {appt.status !== "Visited" ? (
                    <button
                      onClick={() => openUpdateDialog(appt)}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-bold"
                    >
                      Update
                    </button>
                  ) : (
                    <span className="text-green-600 font-bold text-lg">
                      Completed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 border-2 border-indigo-200">
            <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Update Appointment Status
            </h2>

            <p className="text-gray-700 mb-6 text-center text-lg">
              Are you sure you want to mark this appointment as{" "}
              <span className="font-semibold">Visited</span>?
            </p>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-3 bg-gray-300 rounded-xl hover:bg-gray-400 transition-all duration-300 font-bold"
              >
                Cancel
              </button>

              <button
                onClick={updateAppointmentStatus}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl font-bold"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
        
    </div>
    </>
  );
};

export default DoctorAppointments;
