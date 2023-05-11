import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ServiceCenterHeader from '../ServiceCenterHeader/ServiceCenterHeader';
import ServiceCenterSideBar from '../ServiceCenterSideBar/ServiceCenterSideBar';

function ServiceCenterHome() {
  const dispatch=useDispatch()
  const serviceCenter=useSelector((state)=>{
    return state.serviceCenter
  });
  console.log(serviceCenter.details)

  

  return (
    <div className="app">
    <section className="row">
    
    <ServiceCenterSideBar/>
    h1
    </section>
    </div>
  )
}

export default ServiceCenterHome