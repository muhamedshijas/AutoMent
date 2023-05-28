import React from 'react'
import './AdminSideBar.css'
import { FcBusinessman } from "react-icons/fc";
import { Link } from 'react-router-dom'
import { FaUsers} from "react-icons/fa";
import { GiMechanicGarage } from "react-icons/gi";
import { AiOutlineSchedule} from "react-icons/ai";
import { RiShieldUserLine} from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { MdDashboard,MdOutlineMiscellaneousServices} from "react-icons/md";
import { GrServices } from "react-icons/gr";


function AdminSideBar() {
  return (
 <div className="sidebar">

 <div className="admin-sidebar-links">
 <MdDashboard className='sidebar-icon'/>
 <Link to='/admin/'>
 <b>Dashboard</b>
 </Link>
 </div>

 <div className="admin-sidebar-links">
 <FaUsers class='sidebar-icon'/>
 <Link to='/admin/users'>
 <b>users</b>
 </Link>
 </div>

 <div className="admin-sidebar-links">
 <GiMechanicGarage className='sidebar-icon'/>
 <Link to='/admin/servicecenter'>
 <b className='sidebar-services'>Service Centers</b>
 </Link>
 </div>

 <div className="admin-sidebar-links">
 <BiEdit className='sidebar-icon'/>
 <Link to='/admin/requests'>
 <b> Requests</b>
 </Link>
 </div>

 <div className="admin-sidebar-links">
 <MdOutlineMiscellaneousServices className='sidebar-icon'/>
 <Link to='/admin/service'>
 <b> Services</b>
 </Link>
 </div>


 </div>
  )
}

export default AdminSideBar