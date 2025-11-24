import React, { useState, useEffect } from "react";
import { userAPI } from "../services/api";
import { Link } from "react-router-dom";

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // fetch('http://127.0.0.1:8000/api/appointments/doctors/')
    // .then(res => res.json())
    // .then(data => setDoctors(data))
    // .catch(err => console.log(err))
    const fetchDoctors = async () => {
      try {
        const response = await userAPI.getDoctorsList();
        const data = response.data;
        console.log(data, "sdfasdf");

        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <>
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-12">
            Available Doctors
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              // <div
              //   key={doctor.id}
              //   className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
              // >
              //   <div className="text-4xl mb-4">👨‍⚕️</div>
              //   <h3 className="text-xl font-semibold mb-2">{doctor.username}</h3>
              //   <p className="text-gray-600 mb-2">Specialization: {doctor.specialization}</p>
              //   <p className="text-gray-600">Email: {doctor.email}</p>
              //   <Link to={`/book-appointment/${doctor.id}`} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4">View Doctor's Slots</Link>
              // </div>
              <div
                key={doctor.id}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-indigo-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-5xl mb-6">👨‍⚕️</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Doctor ID: {doctor.id}
                      </h3>
                      <p className="text-sm text-indigo-600 font-medium">Available Slot</p>
                    </div>
                  </div>
                  <span className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-full text-xs font-bold shadow-lg">
                    Available
                  </span>
                </div>
                <div className="space-y-3 mb-6">
                  <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {doctor.username}
                  </h3>
                  <p className="text-gray-600 mb-3 font-medium">
                    Specialization: {doctor.specialization}
                  </p>
                  <p className="text-gray-600">Email: {doctor.email}</p>
                </div>
                <Link
                  to={`/book-appointment/${doctor.id}`}
                  className="flex justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-bold"
                >
                  View Doctor's Slots
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorsList;
