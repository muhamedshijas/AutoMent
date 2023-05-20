import axios from 'axios';
import './ServiceCenterViewBookingDetials.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
function ServiceCenterViewBookingDtials({id}) {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [bookingDetials ,setBookingDetials]=useState("")
    const [workers,setWorkers]=useState([""])
    const [worker,setWorker]=useState("")
    const [refresh, setRefresh] = useState(false)
    const [status ,setStatus]=useState("")
    
    console.log(status)
    console.log(worker)

    const serviceCenter=useSelector((state)=>{
        console.log(state.serviceCenter)
        return state.serviceCenter.details

      });

    useEffect(()=>{
       (async function(){
        let {data}=await axios.get("/servicecenter/viewbookingdetials/" +id)
        if(!data.err){
          console.log(data)
          setBookingDetials(data.booking)
          setWorkers(data.workers)
      }
       })()
    },[refresh])
const bookingId=bookingDetials._id
        async function handleSubmit(e){
            e.preventDefault();
            let {data}=await axios.post("/servicecenter/updatebooking", {
              bookingId,status,worker
            });
            console.log(data)
      if(!data.error){
          dispatch({type:"refresh"})
          return navigate("/servicecenter/booking")
      }

        }
  return (
    <div>
   <div className="serviceCenter-booking-detials">
        <form action="" onSubmit={handleSubmit} className='serviceCenter-booking-detials-form'>
        <h4 className='text-center'>{serviceCenter.name}</h4>
        <p>( {new Date().toLocaleDateString() })</p>

        <div className="booking-vehicle-detials">
        <p> Vehicle Brand: {bookingDetials.vehicleBrand}</p>
        <p> vehicle Model: {bookingDetials.vehicleModel}</p>
        <p> vehicle Year : {bookingDetials.vehicleYear}</p>
        <p>vehicle RegNo : {bookingDetials.vehicleNo}</p>
        </div>
        
        <div className="booking-owner-detials">
        <p> Owner Name    : {bookingDetials.ownerName}</p>
        <p> Status :{bookingDetials.status}</p>
        <p>Owner Mobile No:{bookingDetials.ownerMobileNo}</p>
        </div>

        <div className="booking-detials-package">
        <p> Package Choosen: {bookingDetials.packageChoosen}</p>
        <p> Date Booked: {bookingDetials.dateBooked}</p>
        <p>Date of Service:{bookingDetials.dateOfService}</p>
        </div>
        
        <div className="booking-updations">
        <div className="choose-worker">
        Choose a worker
        <select name="" onChange={(e)=>setWorker(e.target.value)} id="">
        {
            workers.map((item,index)=>{
                return<option value={item._id}>{item.name}</option>
            })
        }
        </select>
        </div>
        <div className="update-stat">
        Update Status
        <select name="" id=""  onChange={(e)=>setStatus(e.target.value)}>
        <option value="upcoming">upcoming</option>
        <option value="completed">Completed</option>
        <option value="on process">on process</option>
        
        </select>
        </div>
        </div>
        <button type='submit'>Update</button>
        </form>
   </div>
    
    </div>
  )
}

export default ServiceCenterViewBookingDtials