import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function WorkerHome() {
  const [bookingList,setBookingList]=useState([""])
  const [refresh,setRefresh]=useState(false)
  const dispatch=useDispatch()
  React.useEffect(()=>{
  (
      async function(){
          try{
              const {data}=await axios.get("/worker/bookingdetials")
              console.log(data)
              if(!data.err){
                  console.log(data)
                  setBookingList(data)
                  dispatch({type:"refresh"})
              }
          }
          catch(err){   
              console.log(err)
      }
      }
  )()
},[refresh])

  return (
    <div>

    <div className="container">
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
           
            <td> <Link to={'/worker/viewbooking/'+item._id}>View Detials</Link></td>
            </tr>
        })
    }
  </tbody>
</table>
    </div>
    </div>
    </div>
  )
}

export default WorkerHome