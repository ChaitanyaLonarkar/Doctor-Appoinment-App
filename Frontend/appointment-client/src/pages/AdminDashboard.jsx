import React, { useState, useEffect } from "react";
import Appointments from "./Appointments";
import { AdminAPI, userAPI } from "../services/api";
import DoctorsList from "./DoctorsList";

function AdminDashboard() {
  // const [doctors, setDoctors] = useState([]);
  // const [slots, setSlots] = useState([]);
  const [appointments, setAppointments] = useState([]);
  // const [bookedSlots, setBookedSlots] = useState([]);
  // const [loading, setLoading] = useState(false);

  const getAppointments = async () => {
    try {
      const res = await AdminAPI.getAppointments();
      console.log(res.data, "dfgsdfgsdfg");
      setAppointments(res.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <>
      <Appointments />
      {/* doctors list component */}
      <DoctorsList />

      <div className="flex justify-center items-center py-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div>

        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Admin Appointment Overview</h1>

        <div className="overflow-x-auto rounded-2xl shadow-2xl border-2 border-indigo-100">
          <table className="min-w-full bg-white border-2 border-indigo-200">
            <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <tr>
                <th className="px-6 py-4 border-b-2 border-indigo-300 text-left font-bold text-sm uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 border-b-2 border-indigo-300 text-left font-bold text-sm uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-4 border-b-2 border-indigo-300 text-left font-bold text-sm uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-4 border-b-2 border-indigo-300 text-left font-bold text-sm uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 border-b-2 border-indigo-300 text-left font-bold text-sm uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-4 border-b-2 border-indigo-300 text-left font-bold text-sm uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td className="text-center py-4 text-gray-500" colSpan={6}>
                    No appointments found.
                  </td>
                </tr>
              ) : (
                appointments.map((app) => (
                  <tr key={app.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300">
                    <td className="px-6 py-4 border-b font-medium">{app.id}</td>
                    <td className="px-6 py-4 border-b font-medium">{app.patient_name}</td>
                    <td className="px-6 py-4 border-b font-medium">{app.doctor_name}</td>
                    <td className="px-6 py-4 border-b font-medium">
                      {app.appointment_date}
                    </td>
                    <td className="px-6 py-4 border-b font-medium">
                      {app.start_time} - {app.end_time}
                    </td>
                    <td className="px-6 py-4 border-b font-medium">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                          app.status === "Visited"
                            ? "bg-gradient-to-r from-green-400 to-green-500 text-white"
                            : "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        </div>

      </div>
    </>
  );
}

export default AdminDashboard;
