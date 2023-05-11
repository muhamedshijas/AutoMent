import React from 'react'
import './ServiceCenterWorkers.css'
import ServiceCenterSideBar from '../ServiceCenterSideBar/ServiceCenterSideBar'
import { Link } from 'react-router-dom'

function ServiceCenterWorkers() {
  return (
    <div className="app d-flex">
    <ServiceCenterSideBar/>
    <div className="container">
    <table class="table striped mt-5" >
  <thead className="thead-dark">
    <tr className="table-head">
      <th scope="col">SI No</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Action</th>
    </tr>
  </thead>

</table>

<div className="addWorkers d-flex justify-content-center align-items-center">
<Link to ='/serviceCenter/addWorkers'>
<button> Add Workers</button>
</Link>
</div>
    </div>
    </div>
  )
}

export default ServiceCenterWorkers