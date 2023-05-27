import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import AdminSideBar from '../AdminSideBar/AdminSideBar';
import { FaUsers} from "react-icons/fa";
import { GiMechanicGarage } from "react-icons/gi";
import { GrUserWorker} from "react-icons/gr";
import { AiOutlineSchedule} from "react-icons/ai";
import { RiShieldUserLine} from "react-icons/ri";
import './AdminHome.css'

function AdminHome() {
  const dispatch=useDispatch();
  const [userCount,setUserCount]=useState()
  const [refresh,setRefresh]=useState(false)
  const [serviceCenterCount,setServiceCenterCount]=useState()
  const [workerCount,setWorkerCount]=useState()
  const [booking,setBooking]=useState()

  const [users,setUsers]=useState([""]);
  const [serviceCenters,setServiceCenters]=useState([""]);


  React.useEffect(()=>{
    (
        async function(){
            try{
                const {data}=await axios.get("/admin/dashboard")
                console.log(data)
                if(!data.err){
                 setUserCount(data.userCount)
                 setServiceCenterCount(data.serviceCenterCount)
                 setWorkerCount(data.workerCount)
                 setBooking(data.totalBooking)
                 setUsers(data.users)
                 setServiceCenters(data.serviceCenters)
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
    <div className="admin-home">
    <AdminSideBar/>
    <div className="admin-body">
    <div className="counts">
    <div className="user-card">
    <div className="user-card-icon">
    <FaUsers className='icons'/>
    </div>
    <div className="user-card-counts">
    <h5> Users</h5>
    {userCount}
    </div>
    </div>
    <div className="user-card">
    <div className="user-card-icon">
    <GiMechanicGarage className='icons'/>
    </div>
    <div className="user-card-counts">
    <h5> Service centers</h5>
    {serviceCenterCount}
    </div>
    </div>
    <div className="user-card">
    <div className="user-card-icon">
    <RiShieldUserLine className='icons'/>
    </div>
    <div className="user-card-counts">
    <h5> workers</h5>
    {workerCount}
    </div>
    </div>
    <div className="user-card">
    <div className="user-card-icon">
    <AiOutlineSchedule className='icons'/>
    </div>
    <div className="user-card-counts">
    <h5> Bookings</h5>
    {booking}
    </div>
    </div>
    </div>

    <div className="tables">
    <div className="user-table">
    <table class="table striped mt-5" >
    <thead className="thead-dark">
    <tr className="table-head">
    <th scope="col">SI No</th>
    <th scope="col">Service Name</th>
    <th scope="col">Action</th>
    </tr>
    
    
    </thead>
    <tbody>
    {
          users.map((item,index)=>{
              return <tr>
              <td>{index+1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              </tr>
            })
          }
          </tbody>
          
          </table>
          </div>

          <div className="servicecenter-table">
          <table class="table striped mt-5" >
          <thead className="thead-dark">
          <tr className="table-head">
          <th scope="col">SI No</th>
          <th scope="col">Service Name</th>
          <th scope="col">Action</th>
          </tr>
          
          
          </thead>
          <tbody>
          {
                serviceCenters.map((item,index)=>{
                    return <tr>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    </tr>
                  })
                }
                </tbody>
                
                </table>
          </div>
          </div>
    </div>
    </div>
    
    </div>
  ) 
}

export default AdminHome