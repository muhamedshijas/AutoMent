import React from 'react'
import ServiceCenterViewBookingDtials from '../../components/ServiceCenterViewBookingDetials/ServiceCenterViewBookingDtials'
import ServiceCenterHeader from '../../components/ServiceCenterHeader/ServiceCenterHeader'
import { useParams } from 'react-router-dom'

function ViewServiceCenterBookingPage(props) {
    const {id}=useParams()
  return (
    <div>
    <ServiceCenterHeader/>
    <ServiceCenterViewBookingDtials id={id}/>
    
    </div>
  )
}

export default ViewServiceCenterBookingPage