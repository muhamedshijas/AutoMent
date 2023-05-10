import React from 'react'
import './AdminSideBar.css'
import { Link } from 'react-router-dom'
function AdminSideBar() {
  return (
 <div className="sidebar">
 <Link to='/admin/'>
 <b>Dash board</b>
 </Link>
 
 <Link to='/admin/users'>
 <b>users</b>
 </Link>

 <Link to='/admin/servicecenter'>
 <b>Service Centers</b>
 </Link>
 <Link to='/admin/requests'>
 <b> Requests</b>
 </Link>
 </div>
  )
}

export default AdminSideBar