import React from 'react'
import { useParams } from 'react-router-dom'
import AdminHeader from '../../components/AdminHeader/AdminHeader'
import ServiceCenterRequests from '../../components/AdminserviceCenterRequests/ServiceCenterRequests'

function ServiceCenterRequestPage() {

  return (
    <div>
    <AdminHeader/>
    <ServiceCenterRequests/>
    </div>
  )
}

export default ServiceCenterRequestPage