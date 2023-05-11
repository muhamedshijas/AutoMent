import React from 'react'
import { Link } from 'react-router-dom'
function ServiceCenterSideBar() {
  return (
    <div className="sidebar">
 <Link to='/admin/'>
 <b>Dash board</b>
 </Link>
 
 <Link to='/admin/users'>
 <b>Bookings</b>
 </Link>

 <Link to='/servicecenter/workers'>
 <b>Workers</b>
 </Link>
 </div>
  )
}

export default ServiceCenterSideBar