import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import PageNotFound from '../../pages/PageNotFound';
import ServiceCenterAddWorkerPage from '../../pages/ServiceCenter/ServiceCenterAddWorkerPage';
import ServiceCenterBookingPage from '../../pages/ServiceCenter/ServiceCenterBookingPage';
import ServiceCenterHomePage from '../../pages/ServiceCenter/ServiceCenterHomePage';
import ServiceCenterLoginPage from '../../pages/ServiceCenter/ServiceCenterLoginPage';
import ServiceCenterSignUpPage from '../../pages/ServiceCenter/ServiceCenterSignUpPage';
import ServiceCenterWorkerPage from '../../pages/ServiceCenter/ServiceCenterWorkerPage';
import ViewServiceCenterBookingPage from '../../pages/ServiceCenter/ViewServiceCenterBookingPage';

function ServiceCenterRouter() {

  const dispatch = useDispatch();
    const { refresh, serviceCenter } = useSelector((state) => {
        return state;
    });
    useEffect(() => {
        (async function () {
            let { data: serviceCenterData } = await axios.get("/serviceCenter/auth/check");
            dispatch({ type: "serviceCenter", payload: { login: serviceCenterData.loggedIn, details: serviceCenterData.serviceCenter } })
        })()
    }, [refresh])
    return (
        <div>
        <Routes>
        {
        serviceCenter.login &&
        <>
        <Route path='/' element={<ServiceCenterHomePage/>}/>
        <Route path='/login' element={<Navigate to='/servicecenter'/>}/>
        <Route path='/signup' element={<Navigate to='/servicecenter'/>}/>
        <Route path='/workers' element={<ServiceCenterWorkerPage/>}/> 
        <Route path='/addworkers' element={<ServiceCenterAddWorkerPage/>}/>
        <Route path='/booking' element={<ServiceCenterBookingPage/>}/>
        <Route path='/viewbookingdetials/:id'element={<ViewServiceCenterBookingPage/>} />
        <Route path='/ *' element={<PageNotFound/>}/>
  
        </>
      }

      {
        serviceCenter.login===false &&
        <>
        <Route path='/login' element={<ServiceCenterLoginPage/>}/>
        <Route path='/signup' element={<ServiceCenterSignUpPage/>}/>
        <Route path='/' element={<Navigate to='/servicecenter/login'/>}/>
        <Route path='/workers' element={<Navigate to='/servicecenter/login'/>}/> 
        <Route path='/addworkers' element={<Navigate to='/servicecenter/login'/>}/>
        <Route path='/booking' element={<Navigate to='/servicecenter/login'/>}/>
        <Route path='/viewbookingdetials/:id'element={<Navigate to='/servicecenter/login'/>} />
        </>
      }

        </Routes>
        </div>
    )
}

export default ServiceCenterRouter