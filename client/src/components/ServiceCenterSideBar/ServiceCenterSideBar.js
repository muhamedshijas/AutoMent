import React from 'react'
import { Link } from 'react-router-dom'
function ServiceCenterSideBar() {
  return (
    <div className="sidebar">
 <Link to='/servicecenter'>
 <b>Dash board</b>
 </Link>
 
 <Link to='/servicecenter'>
 <b>Bookings</b>
 </Link>

 <Link to='/servicecenter/workers'>
 <b>Workers</b>
 </Link>
 </div>
  )
}

export default ServiceCenterSideBar