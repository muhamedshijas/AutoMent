import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './WorkerViewBookingDetials.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function WorkerViewBookingDetials({id}) {
    const [bookingDetials,setBookingDetials]=useState("")
    const [status,setStatus]=useState("")
    const [refresh,setRefresh]=useState(false)
    const [vehicleCondition,setVehicleCondition]=useState("")
    const navigate=useNavigate()
    const dispatch=useDispatch()
    useEffect(()=>{
        (async function(){
            console.log(id)
         let {data}=await axios.get("/worker/viewbookingdetials/" +id)
         if(!data.err){
           console.log(data)
           setBookingDetials(data)
        
       }
        })()
     },[refresh])
     const bookingId=bookingDetials._id
     console.log(bookingId)
    const worker=useSelector((state)=>{
        return state.worker.detials
      });

      async function handleSubmit(e){
        e.preventDefault();
        let {data}=await axios.post("/worker/updatebooking", {
          bookingId,status,vehicleCondition
        });
        console.log(data)
  if(!data.error){
      dispatch({type:"refresh"})
      return navigate("/worker/")
  }

    }

  return (
    <div className='worker-bookings'>
    
    <form className="worker-booking-detials" onSubmit={handleSubmit}>
    <div className="headers">
    <h3>Booking Detials</h3>
    <h4>{worker.serviceCenter}</h4>
    ( {new Date().toLocaleDateString() })
    </div>

    <div className="worker-service-detials">
    <div className="worker-owner">
    <p>Owner Name {bookingDetials.ownerName}</p>
    <p>Owner Mobile Number: {bookingDetials.ownerMobileNo}</p>
    </div>
    <div className="worker-vehicle">
    <p>Vehicle RegNo:{bookingDetials.vehicleNo}</p>
    <p>Vehicle Brand: {bookingDetials.vehicleBrand}</p>
    <p>Vehicle Model: {bookingDetials.vehicleModel}</p>
    <p>Vehicle Year : {bookingDetials.vehicleYear}</p>
    </div>

    <div className="worker-package-detials">
    <div className="worker-package">
    <p>Package Choosen:{bookingDetials.packageChoosen}</p>
    {bookingDetials.packageChoosen=="Custom Package" ? <span>view Detials</span>:""}
    </div>
    <p>Status:{bookingDetials.status}</p>
    </div>

    <div className="updations">
    <p>Update Status: <select name="" id="" onChange={(e)=>setStatus(e.target.value)}>
    <option value="">Update status</option>
    <option value="completed">Completed</option>
    <option value="ongoing">Ongoing</option>
    </select></p>
    
    <p>Update Vehicle Condition: <select name="" id="" onChange={(e)=>setVehicleCondition(e.target.value)}>
    <option value=""> Choose One</option>
    <option value="Well-maintained">Well-maintained</option>
    <option value="Satisfactory">Satisfactory</option>
    <option value="Need More Improvements">Need More Improvements</option>
    </select></p>
    </div>
    <button type='submit'>Update</button>
    </div>
    </form>
    
    </div>
  )
}

export default WorkerViewBookingDetials