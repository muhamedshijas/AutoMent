import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
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
  const userId=user._id;
const location= useLocation()
const {state}= location
 
const serviceCenterId=state.serviceCenter._id
const packageChoosen=state.package
const serviceCenterName=state.serviceCenter.name

  const validForm = () => {
    if (ownerName.trim() === "" ||  vehicleModel.trim() === "" || vehicleBrand.trim()===""|| date.trim()==="" 
    ||  ownerMobileNo.trim()==="") {
        return false
    }
    return true
}
  


async   function handleSubmit(e){
    e.preventDefault()
   if(validForm()){
    const {data}=await axios.post("user/bookservice",{bookingAmount:500})
    console.log("sfsdjfhsdjkfhsjdkfhsjkd")
    if(!data.error){
      console.log(data.order)
      handleRazorPay(data.order);
    }
   }
  }

  
  const handleRazorPay = (order) => {
    
    const options = {
        key: "rzp_test_XwdQoSEsOiDbSW",
        amount: order.amount,
        currency: order.currency,
        name: "AutoMent",
        description: "Booking Fee",
        order_id: order.id,
        handler: async (response) => {
          
            const { data } = await axios.post("/user/payment/verify", { response,ownerMobileNo,ownerName,vehicleNo,vehicleBrand,vehicleYear
              ,vehicleModel,serviceCenterId,packageChoosen,date,serviceCenterName,userId});
            if(data.err){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.message,
                })
            }else{
                Swal.fire(
                    'Success!',
                    'Successfully Booked',
                    'success'
                  )
                  navigate("/profile")
            }
           
        }
    }
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    rzp1.on('payment.failed', (response) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.error.description,
        })
       

    })

}




  return (
    <div className='service-booking'>
    <form action="" onSubmit={handleSubmit} className='booking-form'>
    <div className="form-head">
    <h2 className ='text-center'>{serviceCenterName}</h2>
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
    </div>
    
    <div className="vehicle-2">
    <label htmlFor=""> vehicle model year</label>
    <input type="text" maxlength="4"  pattern="\d{4}" placeholder='eg:-2014' value={vehicleYear} onChange={(e) => setVehicleYear(e.target.value)} />
    <label htmlFor=""> vehicle No</label>
    <input type="text" value={vehicleNo} placeholder='eg-KL XX AB XXXX' onChange={(e) => setVehicleNo(e.target.value)} pattern='[A-Z]{2}\s[0-9]{1,2}\s[A-Z]{1,2}\s[0-9]{4}' required/>
    </div>

    <div className="owner">
   <label htmlFor="" >Owner Name</label>
    <input type="text"  onChange={(e) => setOwnerName(e.target.value)} value={ownerName} />
    <label htmlFor="">Owner Mobile No</label>
    <input type="text" v  value={ownerMobileNo} onChange={(e) => setOwnerMobileNo(e.target.value)}/>
    </div>

    
    
    <div className="time-date">
    <label htmlFor="">Package Detials </label>
    <input type="text" value={packageChoosen} disabled />
    <label htmlFor="">Date</label>
    <input type="date" value={date}  onChange={(e) => setDate(e.target.value)} />
    </div>
    <button type='submit'  disabled={!validForm()}>Submit </button>
    </form>
    
    
    
    </div>
  )
}

export default UserServiceBooking