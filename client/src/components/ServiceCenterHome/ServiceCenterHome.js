import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ServiceCenterHeader from '../ServiceCenterHeader/ServiceCenterHeader';
import ServiceCenterSideBar from '../ServiceCenterSideBar/ServiceCenterSideBar';
import './ServiceCenterHome.css'

function ServiceCenterHome() {
  const dispatch=useDispatch()
  const serviceCenter=useSelector((state)=>{
    return state.serviceCenter
  });
  console.log(serviceCenter.details)

  

  return (
    <div className="app">
    <div className="service-center-home">
    
    <ServiceCenterSideBar/>
    h1
    </div>
    </div>
  )
}

export default ServiceCenterHome