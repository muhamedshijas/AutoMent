import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import './UserServiceBooking.css'

function UserServiceBooking() {
  const [ownerName,setOwnerName]=useState("")
  const [ownerMobileNo,setOwnerMobileNo]=useState()
  const [vehicleModel,setVehicleModel]=useState("")
  const [vehicleBrand,setVehicleBrand]=useState("")
  const [vehicleNo,setVehicleNo]=useState("")
  const [vehicleYear,setVehicleYear]=useState("")
  const [date,setDate]=useState("")
  const [time,setTime]=useState("")
  const [errMessage,setErrmessage]=useState("")
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const user=useSelector((state)=>{
    return state.user.detials

  });
const location= useLocation()
const {state}= location

const serviceCenterId=state.serviceCenter._id
const packageChoosen=state.package

  const validForm = () => {
    if (ownerName.trim() === "" ||  vehicleModel.trim() === "" || vehicleBrand.trim()==="") {
        return false
    }
    return true
}
  


async   function handleSubmit(e){
    e.preventDefault()
   if(validForm()){
      console.log("success")
   let {data}=await axios.post("/user/bookservice",{
    ownerMobileNo,ownerName,vehicleBrand,vehicleNo,vehicleModel,vehicleYear,serviceCenterId,packageChoosen,time,date
   })
  if(!data.error){
    dispatch({type:"refresh"})
    navigate("/profile")
  }
   }
  }




  return (
    <div className='service-booking'>
    <form action="" onSubmit={handleSubmit} className='booking-form'>
    <div className="form-head">
    <h4 className='text-center'>Booking Form</h4>
    <p className='text-secondary text-center'>
    ( {new Date().toLocaleDateString() })
    </p>
    </div>
    <div className="vehicle">
    <label htmlFor=""> vehicle model Name</label>
    <input type="text" value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} />
    <label htmlFor=""> vehicle brand </label>
    <input type="text" value={vehicleBrand} onChange={(e) => setVehicleBrand(e.target.value)} />
    <label htmlFor=""> vehicle model year</label>
    <input type="text" maxlength="4"  pattern="\d{4}" value={vehicleYear} onChange={(e) => setVehicleYear(e.target.value)} />
    </div>

    <div className="owner">
    <label htmlFor=""> vehicle No</label>
    <input type="text" value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)} pattern='[A-Z]{2}\s[0-9]{2}\s[A-Z]{2}\s[0-9]{4}' required/>
    <label htmlFor="" >Owner Name</label>
    <input type="text"  onChange={(e) => setOwnerName(e.target.value)} value={ownerName} />
    <label htmlFor="">Owner Mobile No</label>
    <input type="text" v  value={ownerMobileNo} onChange={(e) => setOwnerMobileNo(e.target.value)}/>
    </div>

    <div className="booking-detials">
    <input type="text" value={state.serviceCenter._id}  style={{visibility:'hidden',width:'0px'}}/>
    <label htmlFor="">Service Station </label>
    <input type="text" value={state.serviceCenter.name}  disabled />
    <label htmlFor="">Package detials </label>
    <input type="text" value={state.package} disabled  />
    <label htmlFor="">District</label>
    <input type="text"  value={state.serviceCenter.district} disabled/>
    </div>
    
    <div className="time-date">
    <label htmlFor="">Time </label>
    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
    <label htmlFor="">Date</label>
    <input type="date" value={date}  onChange={(e) => setDate(e.target.value)} />
    </div>
    <button type='submit'>Submit </button>
    </form>
    
    
    
    </div>
  )
}

export default UserServiceBooking