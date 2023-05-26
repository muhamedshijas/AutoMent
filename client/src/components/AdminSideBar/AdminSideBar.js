import React from 'react'
import './AdminSideBar.css'
import { FcBusinessman } from "react-icons/fc";
import { Link } from 'react-router-dom'
function AdminSideBar() {
  return (
 <div className="sidebar">
 <Link to='/admin/'>
 <b>Dash board</b>
 </Link>
 
 <Link to='/admin/users'>
 <FcBusinessman/>
 <b>users</b>
 </Link>

 <Link to='/admin/servicecenter'>
 <b>Service Centers</b>
 </Link>
 <Link to='/admin/requests'>
 <b> Requests</b>
 </Link>
 <Link to='/admin/service'>
 <b> Services</b>
 </Link>
 </div>
  )
}

export default AdminSideBar