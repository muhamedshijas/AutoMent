import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './ServiceCenterBooking.css'
import ServiceCenterSideBar from '../ServiceCenterSideBar/ServiceCenterSideBar';

function ServiceCenterBooking() {
    const [bookingList,setBookingList]=useState([""])
    const [refresh,setRefresh]=useState(false)

    React.useEffect(()=>{
    (
        async function(){
            try{
                const {data}=await axios.get("/servicecenter/bookingdetials")
                console.log(data)
                if(!data.err){
                    console.log(data)
                    setBookingList(data)
                }
            }
            catch(err){   
                console.log(err)
        }
        }
    )()
  },[refresh])
  return (
    <div className="app d-flex">
    <ServiceCenterSideBar/>

    <div className="section container">
    
    <table class="table striped mt-5" >
  <thead className="thead-dark">
    <tr className="table-head">
      <th scope="col">SI No</th>
      <th scope="col">Name</th>
      <th scope="col">Vehicle No</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {
        bookingList.map((item,index)=>{
            return <tr key={index}>
            <td>{index+1}</td>
            <td>{item.ownerName}</td>
            <td>{item.vehicleNo}</td>
            <td> <Link to={'/servicecenter/viewbookingdetials/'+item._id}>View Detials</Link></td>
            </tr>
        })
    }
  </tbody>
</table>
    </div>
    </div>
  )
}

export default ServiceCenterBooking