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

      <div className=" flex justify-center items-center py-12 ">
        <div>

        <h1 className="text-2xl font-bold mb-4">Admin Appointment Overview</h1>

        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 border-b text-left font-semibold">
                  ID
                </th>
                <th className="px-4 py-3 border-b text-left font-semibold">
                  Patient
                </th>
                <th className="px-4 py-3 border-b text-left font-semibold">
                  Doctor
                </th>
                <th className="px-4 py-3 border-b text-left font-semibold">
                  Date
                </th>
                <th className="px-4 py-3 border-b text-left font-semibold">
                  Time
                </th>
                <th className="px-4 py-3 border-b text-left font-semibold">
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
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border-b">{app.id}</td>
                    <td className="px-4 py-3 border-b">{app.patient_name}</td>
                    <td className="px-4 py-3 border-b">{app.doctor_name}</td>
                    <td className="px-4 py-3 border-b">
                      {app.appointment_date}
                    </td>
                    <td className="px-4 py-3 border-b">
                      {app.start_time} - {app.end_time}
                    </td>
                    <td className="px-4 py-3 border-b">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          app.status === "Visited"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
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
