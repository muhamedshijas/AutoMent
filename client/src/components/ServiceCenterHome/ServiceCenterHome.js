import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ServiceCenterHeader from '../ServiceCenterHeader/ServiceCenterHeader';
import ServiceCenterSideBar from '../ServiceCenterSideBar/ServiceCenterSideBar';
import { FaUsers} from "react-icons/fa";
import { GiMechanicGarage } from "react-icons/gi";
import { GrUserWorker} from "react-icons/gr";
import { AiOutlineSchedule} from "react-icons/ai";
import { RiShieldUserLine} from "react-icons/ri";
import './ServiceCenterHome.css'

function ServiceCenterHome() {
  const dispatch=useDispatch()
  const serviceCenter=useSelector((state)=>{
    return state.serviceCenter.details
  });
  const id=serviceCenter._id;
  const [refresh,serRefresh]=useState(false)
  const [upcoming,setUpcoming]=useState(0)
  const [completed,setCompleted]=useState(0)
  const [totalBooking,setTotalBooking]=useState(0)
  const [worker,setWorker]=useState(0)
  const [bookings,setBookings]=useState([])
  const [workers,setWorkers]=useState([""])

  React.useEffect(()=>{
    (
        async function(){
            try{
                const {data}=await axios.get("/servicecenter/dashboard/"+id)
                console.log(data)
                if(!data.err){
                setWorkers(data.workers)
                setBookings(data.bookings)
                setCompleted(data.completed)
                setUpcoming(data.upcoming)
                setTotalBooking(data.totalBooking)
                setWorker(data.worker)
                }
            }
            catch(err){   
                console.log(err)
        }
        }
    )()
  },[refresh])


  return (
    <div className="app">
    <div className="service-center-home">
    <ServiceCenterSideBar/>
    <div className="service-center-body">
    <div className="counts">
    <div className="service-card">
    <div className="service-card-icon">
    <FaUsers className='icons'/>
    </div>
    <div className="service-card-counts">
    <h5> Revenue</h5>
   RS 100
    </div>
    </div>

    <div className="service-card">
    <div className="service-card-icon">
    <FaUsers className='icons'/>
    </div>
    <div className="service-card-counts">
    <h5>Total Booking</h5>
    {totalBooking}
    </div>
    </div>
    <div className="service-card">
    <div className="service-card-icon">
    <GiMechanicGarage className='icons'/>
    </div>
    <div className="service-card-counts">
    <h5> Upcoming</h5>
   {upcoming}
    </div>
    </div>
    
    <div className="service-card">
    <div className="service-card-icon">
    <AiOutlineSchedule className='icons'/>
    </div>
    <div className="service-card-counts">
    <h5>Completed</h5>
    {completed}
    </div>
    </div>

    <div className="service-card">
    <div className="service-card-icon">
    <RiShieldUserLine className='icons'/>
    </div>
    <div className="service-card-counts">
    <h5> workers</h5>
    {worker}
    </div>
    </div>
    </div>

    <div className="booking-table">
          <h4 className='text-center'>Rececnt Bookings</h4>
          <table class="table striped mt-5" >
          <thead className="thead-dark">
          <tr className="table-head">
          <th scope="col">SI No</th>
          <th scope="col">Owner Name</th>
          <th scope="col">Vehicle</th>
          <th scope="col">Reg No</th>
          <th scope="col">Worker</th>
          <th scope="col">Package Choosen </th>
          <th scope="col">Status </th>
          
          </tr>
          
          
          </thead>
          <tbody>
          {
                bookings.map((item,index)=>{
                    return <tr>
                    <td>{index+1}</td>
                    <td>{item.ownerName}</td>
                    <td>{item.vehicleBrand}  {item.vehicleModel}</td>
                    <td>{item.vehicleNo}</td>
                    <td>{item.worker.name}</td>
                    <td>{item.packageChoosen}</td>
                    <td className={item.status=="completed"?"complete":""}>{item.status}</td>
                    </tr>
                  })
                }
                </tbody>
                </table>
                </div>
    </div>

    </div>
    </div>
  )
}

export default ServiceCenterHome