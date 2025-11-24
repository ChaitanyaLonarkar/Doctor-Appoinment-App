import React, {useEffect, useState} from 'react'
import { userAPI } from '../services/api';

function BookedSlots() {
    const userinfo=JSON.parse( localStorage.getItem('user') );
    const [slots, setSlots] = React.useState([])

    const id=userinfo.id

    const fetchSlotsOfDoctor = async () => {
       const response = await userAPI.getDoctorBookedSlots(id)
       console.log(response.data,"fdgdfgdfg");
        setSlots(response.data)
    }

    useEffect(() => {
        fetchSlotsOfDoctor()
    },[])

  return (
      <>
      <div className="container mx-auto p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
        
      <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-10">Booked Slots</div>
      {
        slots.length === 0 ? (
            <p className="text-gray-600 text-lg">No booked slots.</p>
        ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {slots.map((slot) => (
                <div
                key={slot.id}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-indigo-100"
                >
                <div className="text-5xl mb-6">📅</div>
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Slot ID: {slot.id}</h3>
                <p className="text-gray-600 mb-3 font-medium">Date: {slot.date}</p>
                <p className="text-gray-600 mb-3 font-medium">Start Time: {slot.start_time}</p>
                <p className="text-gray-600 mb-3 font-medium">End Time: {slot.end_time}</p>
                {slot.is_booked && (
                    <p className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-6 rounded-xl w-min font-bold shadow-lg" >Booked</p>)}
                
                </div>
            ))}
            </div>
        )
      }
      </div>

    </>
  )
}

export default BookedSlots