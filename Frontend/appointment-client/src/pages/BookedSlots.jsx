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
      <div className="container mx-auto p-6 " >
        
      <div className="text-4xl font-bold text-gray-900 mb-6">BookedSlots</div>
      {
        slots.length === 0 ? (
            <p className="text-gray-600">No booked slots.</p>
        ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {slots.map((slot) => (
                <div
                key={slot.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
                >
                <div className="text-4xl mb-4">📅</div>
                <h3 className="text-xl font-semibold mb-2">Slot ID: {slot.id}</h3>
                <p className="text-gray-600 mb-2">Date: {slot.date}</p>
                <p className="text-gray-600 mb-2">Start Time: {slot.start_time}</p>
                <p className="text-gray-600 mb-2">End Time: {slot.end_time}</p>
                {slot.is_booked && (
                    <p className="bg-green-600 text-white py-2 px-4 rounded w-min" >Booked</p>)}
                
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