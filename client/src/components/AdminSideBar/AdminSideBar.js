import React from 'react'
import './AdminSideBar.css'
import { Link } from 'react-router-dom'
function AdminSideBar() {
  return (
 <div className="sidebar">

 <b>Dash board</b>
 <Link to='/admin/users'>
 <b>users</b>
 </Link>
 <b>Service Centers</b>
 <b>Requests</b>
 </div>
  )
}

export default AdminSideBar