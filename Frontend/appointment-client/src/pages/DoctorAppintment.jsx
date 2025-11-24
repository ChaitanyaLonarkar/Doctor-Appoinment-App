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
    <div className="container mx-auto p-6">

    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        Doctor Appointments
      </h1>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full table-auto bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Patient</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Time</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{appt.patient.username}</td>
                <td className="px-4 py-3">{appt.slot.date}</td>
                <td className="px-4 py-3">
                  {appt.slot.start_time} - {appt.slot.end_time}
                </td>
                <td className="px-4 py-3 font-medium">{appt.status}</td>

                <td className="px-4 py-3">
                  {appt.status !== "Visited" ? (
                    <button
                      onClick={() => openUpdateDialog(appt)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Update
                    </button>
                  ) : (
                    <span className="text-green-600 font-semibold">
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
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Update Appointment Status
            </h2>

            <p className="text-gray-700 mb-4">
              Are you sure you want to mark this appointment as{" "}
              <span className="font-semibold">Visited</span>?
            </p>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={updateAppointmentStatus}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
