import axios from "axios";
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
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
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
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-4xl mb-4">👨‍⚕️</div>
                    <div>

                    <h3 className="text-lg font-semibold text-gray-900">
                      Doctor ID: {doctor.id}
                    </h3>
                    <p className="text-sm text-gray-600">Available Slot</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                    Available
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <h3 className="text-xl font-semibold mb-2">
                    {doctor.username}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Specialization: {doctor.specialization}
                  </p>
                  <p className="text-gray-600">Email: {doctor.email}</p>
                </div>
                <Link
                  to={`/book-appointment/${doctor.id}`}
                  className="flex justify-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
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
