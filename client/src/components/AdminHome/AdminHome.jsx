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
import AdminGraphs from '../AdminGraphs/BookingGraphs';
import BookingGraphs from '../AdminGraphs/BookingGraphs';
import ByPackageGraph from '../AdminGraphs/ByPackageGraph';
import WeeklyGraph from '../AdminGraphs/WeeklyGraph';

function AdminHome() {
  const dispatch=useDispatch();
  const [userCount,setUserCount]=useState()
  const [refresh,setRefresh]=useState(false)
  const [serviceCenterCount,setServiceCenterCount]=useState()
  const [workerCount,setWorkerCount]=useState()
  const [booking,setBooking]=useState(0)
  
  const [users,setUsers]=useState([""]);
  const [serviceCenters,setServiceCenters]=useState([""]);
  const [bookings,setBookings]=useState([""])
  const [monthlyBooking,setMonthlyBooking]=useState([])
  const [byCategory,setByCategory]=useState([])
  const [weeklyData,setWeeklyData]=useState([])

  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(4);


  React.useEffect(()=>{
    (
        async function(){
            try{
                const {data}=await axios.get("/admin/dashboard")
                if(!data.err){
                 setUserCount(data.userCount)
                 setServiceCenterCount(data.serviceCenterCount)
                 setWorkerCount(data.workerCount)
                 setBooking(data.totalBooking)
                 setUsers(data.users)
                 setServiceCenters(data.serviceCenters)
                 setBookings(data.booking)
                 setMonthlyBooking(data.monthlyData)
                 setByCategory(data.byPackage)
                 setWeeklyData(data.weeklyData)
                }
            }
            catch(err){   
                console.log(err)
        }
        }
    )()
  },[refresh])    
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = bookings.slice(indexOfFirstAppointment, indexOfLastAppointment);
  const startingNumber=(currentPage-1)*appointmentsPerPage;
  const calculateSiNo=(index)=>startingNumber+index;

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
    <h5> Revenue</h5>
   RS 100
    </div>
    </div>

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
    <div className="user-service-tables">
    <div className="user-table">
    <h4 className='text-center'>Rececnt Users</h4>
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
          <h4 className="text-center">Recent Service centers</h4>
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
                
          <div className="booking-table">
          <h4 className='text-center'>Rececnt Bookings</h4>
          <table class="table striped mt-5" >
          <thead className="thead-dark">
          <tr className="table-head">
          <th scope="col">SI No</th>
          <th scope="col">Owner Name</th>
          <th scope="col">Vehicle</th>
          <th scope="col">Reg No</th>
          <th scope="col">Service Center </th>
          <th scope="col">Package Choosen </th>
          <th scope="col">Status </th>
          
          </tr>
          
          
          </thead>
          <tbody>
          {
                currentAppointments.map((item,index)=>{
                    return <tr>
                    <td>{calculateSiNo(index+1)}</td>
                    <td>{item.ownerName}</td>
                    <td>{item.vehicleBrand}  {item.vehicleModel}</td>
                    <td>{item.vehicleNo}</td>
                    <td>{item.serviceCenterName}</td>
                    <td>{item.packageChoosen}</td>
                    <td className={item.status=="completed"?"complete":""}>{item.status}</td>
                    </tr>
                  })
                }
                </tbody>
                
                </table>
                <div className='pagination'>
                {Array.from(Array(Math.ceil(booking/appointmentsPerPage)).keys()).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePaginationClick(pageNumber + 1)}
                    disabled={currentPage === pageNumber + 1}
                  >
                    {pageNumber + 1}
                  </button>
                ))}
              </div>
                </div>
          </div>
          <div className="weekly-graph">
          <div className="admin-weekly-graph">
          <h5 className='text-center'>Weekly Data</h5>
          <WeeklyGraph weeklyData={weeklyData}/>
          </div>
          </div>
          <div className="admin-graphs">
          <div className="admin-revenue-graph">
          <h5 className='text-center'>Revenue per Month</h5>
          <BookingGraphs monthlyData={monthlyBooking}/>
          </div> 
          <div className="admin-package-graph">
          <h5 className='text-center'>Package Choosen</h5>
          <ByPackageGraph byPackage={byCategory}/>
          </div>
          </div>
    </div>
    </div>
    
    </div>
  ) 
}

export default AdminHome