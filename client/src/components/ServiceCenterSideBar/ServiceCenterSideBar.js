import React from 'react'
import { RxDashboard } from "react-icons/rx";
import { HiOutlineClipboardList } from "react-icons/hi";
import { RiShieldUserLine} from "react-icons/ri";
import { Link } from 'react-router-dom'
function ServiceCenterSideBar() {
  return (
    <div className="sidebar">

    <div className="admin-sidebar-links">
    <RxDashboard className='sidebar-icon'/>
        <Link to='/servicecenter'>
    <b>Dash board</b>
    </Link>
    </div>
 
    <div className="admin-sidebar-links">
    <HiOutlineClipboardList className='sidebar-icon'/>
 <Link to='/servicecenter/booking'>
 <b>Bookings</b>
 </Link>
</div>


<div className="admin-sidebar-links">
<RiShieldUserLine className='sidebar-icon'/>
 <Link to='/servicecenter/workers'>
 <b>Workers</b>
 </Link>
 </div>
 </div>
  )
}

export default ServiceCenterSideBar  